/**
 * Generate wiki pages from video metadata
 *
 * Reads public/videos-metadata.json and src/config/videos.ts,
 * then generates per-category markdown pages + indexes into wiki/.
 *
 * Produces pages following the wiki schema (wiki/AGENTS.md):
 * - YAML frontmatter on every page
 * - Topic clusters derived from titles and tags
 * - Cross-references between related categories
 * - Top-level wiki index and per-videos index
 * - Append-only log
 *
 * Usage: bun scripts/generate-wiki.ts
 *
 * Runs automatically after sync-videos.ts via prebuild.
 */

import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'fs'
import { resolve } from 'path'
import { VIDEO_CONFIG } from '../src/config/videos'

interface VideoMetadata {
  id: string
  title: string
  views: number
  date: string
  tags?: string[]
}

interface MetadataFile {
  videos: VideoMetadata[]
  generatedAt: string
  count: number
}

interface TopicCluster {
  name: string
  videos: VideoMetadata[]
  tags: string[]
}

interface VideoDetail {
  summary: string
  takeaways: string[]
  topics: string[]
}

/**
 * Parse auto-generated detail markdown files from wiki/videos/details/.
 * Returns a map of videoId -> { summary, takeaways, topics }.
 */
function loadVideoDetails(): Map<string, VideoDetail> {
  const details = new Map<string, VideoDetail>()
  if (!existsSync(WIKI_DETAILS)) return details

  for (const file of readdirSync(WIKI_DETAILS)) {
    if (!file.endsWith('.md')) continue
    const id = file.replace(/\.md$/, '')
    const content = readFileSync(resolve(WIKI_DETAILS, file), 'utf-8')

    const summary = extractSection(content, 'Summary')
    const takeawaysRaw = extractSection(content, 'Key Takeaways')
    const topicsRaw = extractSection(content, 'Topics Covered')

    // Only include if at least a summary exists
    if (!summary) continue

    const takeaways = takeawaysRaw
      ? takeawaysRaw
          .split('\n')
          .map((line) => line.replace(/^-\s*/, '').trim())
          .filter(Boolean)
      : []

    const topics = topicsRaw
      ? topicsRaw
          .split('·')
          .map((t) => t.replace(/`/g, '').trim())
          .filter(Boolean)
      : []

    details.set(id, { summary, takeaways, topics })
  }
  return details
}

/** Extract text between ## heading and the next ## or end of file. */
function extractSection(md: string, heading: string): string | null {
  const regex = new RegExp(
    `^## ${heading}\\s*\\n([\\s\\S]*?)(?=^## |^---\\s*$|$)`,
    'm',
  )
  const match = regex.exec(md)
  return match ? match[1].trim() : null
}

const WIKI_ROOT = resolve('..', 'wiki')
const WIKI_VIDEOS = resolve(WIKI_ROOT, 'videos')
const WIKI_TAGS = resolve(WIKI_ROOT, 'videos', 'tags')
const WIKI_DETAILS = resolve(WIKI_ROOT, 'videos', 'details')
const METADATA_PATH = resolve('public', 'videos-metadata.json')

const CATEGORY_META: Record<
  string,
  { description: string; related: string[] }
> = {
  korea: {
    description:
      'Korean travel vlogs narrated in Spanish, plus Spanish language learning guides.',
    related: ['finance'],
  },
  finance: {
    description: 'Videos covering personal finance, investing, and economics.',
    related: ['korea', 'development'],
  },
  kubernetes: {
    description:
      'Videos on Kubernetes, container orchestration, and cloud-native infrastructure.',
    related: ['security', 'development'],
  },
  development: {
    description:
      'Videos about software development, tools, workflows, and engineering practices.',
    related: ['kubernetes', 'programming', 'security'],
  },
  security: {
    description:
      'Videos on cybersecurity, application security, and security engineering.',
    related: ['kubernetes', 'development'],
  },
  programming: {
    description:
      'Videos about programming languages, paradigms, and computer science concepts.',
    related: ['development'],
  },
}

// -- Helpers --

function loadMetadata(): MetadataFile | null {
  if (!existsSync(METADATA_PATH)) {
    console.warn(`${METADATA_PATH} not found. Run sync:videos first.`)
    return null
  }
  return JSON.parse(readFileSync(METADATA_PATH, 'utf-8'))
}

function buildLookup(videos: VideoMetadata[]): Map<string, VideoMetadata> {
  const m = new Map<string, VideoMetadata>()
  for (const v of videos) m.set(v.id, v)
  return m
}

function isoDate(iso: string): string {
  return iso.split('T')[0]
}

function fmtDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

function fmtViews(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
  return n.toString()
}

function label(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

// -- Topic Clustering --

const CLUSTER_KEYWORDS: Record<string, string[]> = {
  'AKS & Networking': ['aks', 'networking', 'cni', 'ingress', 'load balancer'],
  'Service Mesh': ['istio', 'service mesh', 'mtls', 'envoy', 'linkerd'],
  'AI & ML': ['ai', 'ml', 'gemini', 'genai', 'llm', 'copilot', 'generative'],
  'Identity & Auth': [
    'identity',
    'oauth',
    'authentication',
    'azure ad',
    'entra',
    'zero trust',
  ],
  'CI/CD & DevOps': [
    'ci/cd',
    'pipeline',
    'deployment',
    'blue-green',
    'gitops',
    'helm',
  ],
  'Data & Databases': [
    'database',
    'duckdb',
    'scylladb',
    'badgerdb',
    'dragonfly',
    'motherduck',
    'meilisearch',
    'fabric',
  ],
  'Rust': ['rust', 'fearless concurrency', 'zero-copy'],
  'Go': ['go', 'golang'],
  'Architecture': [
    'architecture',
    'microservices',
    'event-driven',
    'platform',
  ],
  'Security': [
    'security',
    'spicedb',
    'authorization',
    'secure',
    'zero trust',
  ],
  'Messaging': ['rabbitmq', 'nats', 'event hubs', 'messaging', 'kafka'],
  'CUE': ['cue'],
  'Containers & Docker': ['docker', 'traefik', 'container'],
}

function clusterVideos(videos: VideoMetadata[]): TopicCluster[] {
  const clusters = new Map<string, TopicCluster>()

  for (const v of videos) {
    const haystack = [
      v.title.toLowerCase(),
      ...(v.tags || []).map((t) => t.toLowerCase()),
    ].join(' ')

    for (const [clusterName, keywords] of Object.entries(CLUSTER_KEYWORDS)) {
      if (keywords.some((kw) => haystack.includes(kw))) {
        if (!clusters.has(clusterName)) {
          clusters.set(clusterName, { name: clusterName, videos: [], tags: [] })
        }
        const c = clusters.get(clusterName)!
        if (!c.videos.some((cv) => cv.id === v.id)) {
          c.videos.push(v)
        }
        for (const tag of v.tags || []) {
          if (!c.tags.includes(tag)) c.tags.push(tag)
        }
      }
    }
  }

  return [...clusters.values()]
    .filter((c) => c.videos.length >= 2)
    .sort((a, b) => b.videos.length - a.videos.length)
}

// -- Cross-category tag overlap --

function findSharedTags(
  allCategoryTags: Record<string, Map<string, number>>,
): { tag: string; categories: string[] }[] {
  const tagToCats = new Map<string, string[]>()
  for (const [cat, tags] of Object.entries(allCategoryTags)) {
    for (const tag of tags.keys()) {
      if (!tagToCats.has(tag)) tagToCats.set(tag, [])
      tagToCats.get(tag)!.push(cat)
    }
  }
  return [...tagToCats.entries()]
    .filter(([, cats]) => cats.length >= 2)
    .map(([tag, categories]) => ({ tag, categories }))
    .sort((a, b) => b.categories.length - a.categories.length)
}

// -- Page Generators --

function generateCategoryPage(
  category: string,
  videoIds: readonly string[],
  lookup: Map<string, VideoMetadata>,
  generatedAt: string,
  allCategoryTags: Record<string, Map<string, number>>,
): string {
  const meta = CATEGORY_META[category] || {
    description: `Videos in the ${category} category.`,
    related: [],
  }
  const videos = videoIds
    .map((id) => lookup.get(id))
    .filter((v): v is VideoMetadata => v !== undefined)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const totalViews = videos.reduce((sum, v) => sum + v.views, 0)
  const topTags = collectTags(videos)
  const clusters = clusterVideos(videos)

  const lines: string[] = [
    '---',
    'type: category',
    `category: ${category}`,
    `tags: [${topTags
      .slice(0, 10)
      .map(([t]) => t)
      .join(', ')}]`,
    `sources: ${videos.length}`,
    `updated: ${isoDate(generatedAt)}`,
    '---',
    '',
    `# ${label(category)}`,
    '',
    `> ${meta.description}`,
    '',
    '## Summary',
    '',
    '| Metric | Value |',
    '|--------|-------|',
    `| Videos | ${videos.length} |`,
    `| Total Views | ${fmtViews(totalViews)} |`,
    `| Most Recent | ${videos.length > 0 ? fmtDate(videos[0].date) : 'N/A'} |`,
    `| Oldest | ${videos.length > 0 ? fmtDate(videos[videos.length - 1].date) : 'N/A'} |`,
  ]

  // Topic clusters
  if (clusters.length > 0) {
    lines.push('', '## Topic Clusters', '')
    for (const c of clusters) {
      lines.push(
        `### ${c.name} (${c.videos.length} videos)`,
        '',
      )
      for (const v of c.videos) {
        lines.push(
          `- [${v.title}](https://youtu.be/${v.id}) -- ${fmtViews(v.views)} views, ${fmtDate(v.date)}`,
        )
      }
      lines.push('')
    }
  }

  // Full video table
  lines.push(
    '## All Videos',
    '',
    '| # | Title | Views | Published | Link |',
    '|---|-------|-------|-----------|------|',
  )
  for (let i = 0; i < videos.length; i++) {
    const v = videos[i]
    lines.push(
      `| ${i + 1} | ${v.title} | ${fmtViews(v.views)} | ${fmtDate(v.date)} | [Watch](https://youtu.be/${v.id}) |`,
    )
  }

  // Top tags
  if (topTags.length > 0) {
    lines.push(
      '',
      '## Top Tags',
      '',
      topTags
        .slice(0, 20)
        .map(([tag, count]) => `\`${tag}\` (${count})`)
        .join(' . '),
    )
  }

  // Cross-references
  const sharedTags = findSharedTags(allCategoryTags).filter((st) =>
    st.categories.includes(category),
  )
  const relatedCats = new Set([
    ...meta.related,
    ...sharedTags.flatMap((st) =>
      st.categories.filter((c) => c !== category),
    ),
  ])

  if (relatedCats.size > 0) {
    lines.push('', '## See Also', '')
    for (const rel of relatedCats) {
      const shared = sharedTags
        .filter(
          (st) => st.categories.includes(rel) && st.categories.includes(category),
        )
        .map((st) => `\`${st.tag}\``)
      const suffix =
        shared.length > 0 ? ` -- shared tags: ${shared.join(', ')}` : ''
      lines.push(`- [${label(rel)}](${rel}.md)${suffix}`)
    }
  }

  lines.push(
    '',
    '---',
    `*Auto-generated on ${fmtDate(generatedAt)}. Back to [index](index.md).*`,
  )

  return lines.join('\n')
}

function collectTags(videos: VideoMetadata[]): [string, number][] {
  const counts = new Map<string, number>()
  for (const v of videos) {
    for (const tag of v.tags || []) {
      counts.set(tag, (counts.get(tag) || 0) + 1)
    }
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1])
}

function generateVideosIndex(
  stats: { name: string; count: number; totalViews: number; description: string }[],
  generatedAt: string,
  totalVideos: number,
  sharedTags: { tag: string; categories: string[] }[],
): string {
  const totalViews = stats.reduce((s, c) => s + c.totalViews, 0)

  const lines: string[] = [
    '---',
    'type: index',
    `sources: ${totalVideos}`,
    `updated: ${isoDate(generatedAt)}`,
    '---',
    '',
    '# Video Wiki Index',
    '',
    'Classified catalog of all Pastel Sketchbook videos, organized by category.',
    'The LLM reads this index first to locate relevant pages when answering queries.',
    '',
    '## Overview',
    '',
    '| Metric | Value |',
    '|--------|-------|',
    `| Total Videos | ${totalVideos} |`,
    `| Total Views | ${fmtViews(totalViews)} |`,
    `| Categories | ${stats.length} |`,
    `| Last Updated | ${fmtDate(generatedAt)} |`,
    '',
    '## Categories',
    '',
  ]

  for (const cat of stats) {
    lines.push(
      `### [${label(cat.name)}](${cat.name}.md)`,
      '',
      `${cat.description} ${cat.count} videos, ${fmtViews(cat.totalViews)} total views.`,
      '',
    )
  }

  // Cross-category tags
  if (sharedTags.length > 0) {
    lines.push('## Cross-Category Tags', '')
    lines.push(
      'Tags appearing in multiple categories (potential synthesis targets):',
      '',
    )
    lines.push('| Tag | Categories |')
    lines.push('|-----|------------|')
    for (const st of sharedTags.slice(0, 15)) {
      lines.push(
        `| \`${st.tag}\` | ${st.categories.map((c) => `[${label(c)}](${c}.md)`).join(', ')} |`,
      )
    }
  }

  lines.push(
    '',
    '---',
    `*Auto-generated on ${fmtDate(generatedAt)}. See [wiki index](../index.md).*`,
  )

  return lines.join('\n')
}

function generateTopLevelIndex(
  generatedAt: string,
  totalVideos: number,
  categoryCount: number,
): string {
  const lines: string[] = [
    '---',
    'type: index',
    `updated: ${isoDate(generatedAt)}`,
    '---',
    '',
    '# Pastel Sketchbook Wiki',
    '',
    'LLM-maintained knowledge base for the Pastel Sketchbook project.',
    'Built following the [LLM Wiki pattern](llm-wiki.md).',
    '',
    '## Sections',
    '',
    `- [Videos](videos/index.md) -- ${totalVideos} videos across ${categoryCount} categories.`,
    '',
    '## How to Use',
    '',
    '**Query**: Ask a question. The LLM reads this index, drills into relevant',
    'pages, and synthesizes an answer with citations.',
    '',
    '**Ingest**: Add new sources. The LLM updates affected pages, cross-references,',
    'and the log.',
    '',
    '**Lint**: Ask the LLM to health-check for stale data, missing cross-references,',
    'or orphan pages.',
    '',
    'See [AGENTS.md](AGENTS.md) for the full schema and operating instructions.',
    '',
    '---',
    `*Last updated: ${fmtDate(generatedAt)}.*`,
  ]

  return lines.join('\n')
}

function appendLog(
  generatedAt: string,
  totalVideos: number,
  categoryCounts: Record<string, number>,
): void {
  const logPath = resolve(WIKI_ROOT, 'log.md')
  const date = isoDate(generatedAt)
  const breakdown = Object.entries(categoryCounts)
    .map(([cat, count]) => `${cat}=${count}`)
    .join(', ')

  const entry = `## [${date}] ingest | Video Metadata Sync\n\nSynced ${totalVideos} videos across ${Object.keys(categoryCounts).length} categories (${breakdown}).\n`

  if (existsSync(logPath)) {
    const existing = readFileSync(logPath, 'utf-8')
    // Avoid duplicate entries for the same date+operation
    if (existing.includes(`## [${date}] ingest | Video Metadata Sync`)) {
      return
    }
    writeFileSync(logPath, `${existing}\n${entry}`)
  } else {
    writeFileSync(
      logPath,
      `---\ntype: log\n---\n\n# Wiki Log\n\nAppend-only chronological record of wiki operations.\n\n${entry}`,
    )
  }
}

// -- Main --

function main() {
  const metadata = loadMetadata()
  if (!metadata) {
    console.log('Skipping wiki generation (no metadata).')
    return
  }

  mkdirSync(WIKI_VIDEOS, { recursive: true })

  const lookup = buildLookup(metadata.videos)

  // Collect per-category tag maps for cross-referencing
  const allCategoryTags: Record<string, Map<string, number>> = {}
  const categoryStats: {
    name: string
    count: number
    totalViews: number
    description: string
  }[] = []
  const categoryCounts: Record<string, number> = {}

  // First pass: gather stats and tags
  for (const [category, videoIds] of Object.entries(VIDEO_CONFIG)) {
    const videos = videoIds
      .map((id) => lookup.get(id))
      .filter((v): v is VideoMetadata => v !== undefined)

    const totalViews = videos.reduce((sum, v) => sum + v.views, 0)
    const tagMap = new Map<string, number>()
    for (const v of videos) {
      for (const tag of v.tags || []) {
        tagMap.set(tag, (tagMap.get(tag) || 0) + 1)
      }
    }

    allCategoryTags[category] = tagMap
    categoryStats.push({
      name: category,
      count: videos.length,
      totalViews,
      description:
        CATEGORY_META[category]?.description ||
        `Videos in the ${category} category.`,
    })
    categoryCounts[category] = videos.length
  }

  const sharedTags = findSharedTags(allCategoryTags)

  // Second pass: generate pages with cross-references
  for (const [category, videoIds] of Object.entries(VIDEO_CONFIG)) {
    const page = generateCategoryPage(
      category,
      videoIds,
      lookup,
      metadata.generatedAt,
      allCategoryTags,
    )
    writeFileSync(resolve(WIKI_VIDEOS, `${category}.md`), page)
    console.log(`  ${category}.md (${categoryCounts[category]} videos)`)
  }

  // Videos index
  const videosIndex = generateVideosIndex(
    categoryStats,
    metadata.generatedAt,
    metadata.count,
    sharedTags,
  )
  writeFileSync(resolve(WIKI_VIDEOS, 'index.md'), videosIndex)
  console.log('  videos/index.md')

  // Top-level wiki index
  const topIndex = generateTopLevelIndex(
    metadata.generatedAt,
    metadata.count,
    categoryStats.length,
  )
  writeFileSync(resolve(WIKI_ROOT, 'index.md'), topIndex)
  console.log('  index.md')

  // Append-only log
  appendLog(metadata.generatedAt, metadata.count, categoryCounts)
  console.log('  log.md')

  // Generate JSON bundle for the web app
  const videoDetails = loadVideoDetails()
  console.log(`  loaded ${videoDetails.size} video detail pages`)

  const enrichVideo = (v: VideoMetadata, category: string) => {
    const base: Record<string, unknown> = {
      id: v.id,
      title: v.title,
      views: v.views,
      date: v.date,
      category,
    }
    if (v.tags && v.tags.length > 0) base.tags = v.tags
    const detail = videoDetails.get(v.id)
    if (detail) base.detail = detail
    return base
  }

  const wikiBundle = {
    generatedAt: metadata.generatedAt,
    totalVideos: metadata.count,
    categories: Object.entries(VIDEO_CONFIG).map(([category, videoIds]) => {
      const videos = videoIds
        .map((id) => lookup.get(id))
        .filter((v): v is VideoMetadata => v !== undefined)
        .sort(
          (a, b) =>
            new Date(b.date).getTime() - new Date(a.date).getTime(),
        )
      const totalViews = videos.reduce((sum, v) => sum + v.views, 0)
      const clusters = clusterVideos(videos)
      const tags = collectTags(videos)
      const catMeta = CATEGORY_META[category] || {
        description: `Videos in the ${category} category.`,
        related: [],
      }

      return {
        name: category,
        description: catMeta.description,
        related: catMeta.related,
        videoCount: videos.length,
        totalViews,
        topTags: tags.slice(0, 20).map(([tag, count]) => ({ tag, count })),
        clusters: clusters.map((c) => ({
          name: c.name,
          videos: c.videos.map((v) => enrichVideo(v, category)),
        })),
        videos: videos.map((v) => enrichVideo(v, category)),
      }
    }),
    crossCategoryTags: sharedTags.slice(0, 15).map((st) => ({
      tag: st.tag,
      categories: st.categories,
    })),
  }

  const bundlePath = resolve('public', 'wiki-bundle.json')
  writeFileSync(bundlePath, JSON.stringify(wikiBundle, null, 2))
  console.log('  public/wiki-bundle.json')

  console.log(
    `\nWiki generated: ${categoryStats.length} categories, ${metadata.count} videos, ${sharedTags.length} cross-category tags`,
  )
}

main()
