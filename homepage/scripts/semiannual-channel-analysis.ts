import { existsSync, readFileSync, writeFileSync } from 'fs'
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

const WIKI_ROOT = resolve('..', 'wiki')
const WIKI_VIDEOS = resolve(WIKI_ROOT, 'videos')
const METADATA_PATH = resolve('public', 'videos-metadata.json')
const LOG_PATH = resolve(WIKI_ROOT, 'log.md')
const LATEST_PATH = resolve(WIKI_ROOT, 'channel-analysis.md')

function padMonth(month: number): string {
  return String(month).padStart(2, '0')
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

function loadMetadata(): MetadataFile {
  if (!existsSync(METADATA_PATH)) {
    throw new Error(`Missing metadata at ${METADATA_PATH}. Run sync first.`)
  }
  return JSON.parse(readFileSync(METADATA_PATH, 'utf-8')) as MetadataFile
}

function categoryLabel(category: string): string {
  return category.charAt(0).toUpperCase() + category.slice(1)
}

function currentWindow(now: Date): { year: number; month: 4 | 10 } {
  const y = now.getFullYear()
  const m = now.getMonth() + 1
  if (m >= 10) return { year: y, month: 10 }
  if (m >= 4) return { year: y, month: 4 }
  return { year: y - 1, month: 10 }
}

function parseArgs(): { ifDue: boolean; force: boolean } {
  const args = process.argv.slice(2)
  return {
    ifDue: args.includes('--if-due'),
    force: args.includes('--force'),
  }
}

function isRunMonth(now: Date): boolean {
  const month = now.getMonth() + 1
  return month === 4 || month === 10
}

function appendLog(dateIso: string, period: string, count: number): void {
  const heading = `## [${dateIso}] enrich | Semiannual Channel Analysis (${period})`
  const body = `${heading}\n\nGenerated channel analysis for ${period} from \`videos-metadata.json\` and category pages. Wrote \`wiki/channel-analysis-${period}.md\` and refreshed \`wiki/channel-analysis.md\` (${count} videos).\n`

  if (!existsSync(LOG_PATH)) {
    const seed = `---\ntype: log\n---\n\n# Wiki Log\n\nAppend-only chronological record of wiki operations.\n\n`
    writeFileSync(LOG_PATH, `${seed}${body}`)
    return
  }

  const existing = readFileSync(LOG_PATH, 'utf-8')
  if (existing.includes(heading)) return
  writeFileSync(LOG_PATH, `${existing}\n${body}`)
}

function buildMarkdown(
  metadata: MetadataFile,
  period: string,
  categoryCounts: Record<string, number>,
): string {
  const videos = [...metadata.videos]
  const totalViews = videos.reduce((sum, v) => sum + v.views, 0)
  const topVideos = [...videos].sort((a, b) => b.views - a.views).slice(0, 12)

  const categoryViews: Record<string, number> = {}
  for (const [category, ids] of Object.entries(VIDEO_CONFIG)) {
    const idSet = new Set(ids)
    categoryViews[category] = videos
      .filter((v) => idSet.has(v.id))
      .reduce((sum, v) => sum + v.views, 0)
  }

  const tagCounts = new Map<string, number>()
  for (const v of videos) {
    for (const tag of v.tags || []) {
      tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1)
    }
  }
  const topTags = [...tagCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12)

  const categoryRows = Object.keys(VIDEO_CONFIG)
    .map((category) => {
      const count = categoryCounts[category] || 0
      const views = categoryViews[category] || 0
      return `| [${categoryLabel(category)}](videos/${category}.md) | ${count} | ${fmtViews(views)} |`
    })
    .join('\n')

  const topVideoRows = topVideos
    .map((video, i) => {
      return `| ${i + 1} | ${video.title} | ${fmtViews(video.views)} | [Watch](https://youtu.be/${video.id}) |`
    })
    .join('\n')

  const topTagLine = topTags
    .map(([tag, count]) => `\`${tag}\` (${count})`)
    .join(' . ')

  return [
    '---',
    'type: synthesis',
    'tags: [channel, analysis, semiannual, llm-wiki]',
    `sources: ${metadata.count}`,
    `updated: ${isoDate(metadata.generatedAt)}`,
    '---',
    '',
    '# Pastel Sketchbook Semiannual Channel Analysis',
    '',
    `Analysis window: **${period}** (scheduled cadence: Apr + Oct).`,
    '',
    '## Snapshot',
    '',
    '| Metric | Value |',
    '|--------|-------|',
    `| Total Videos | ${metadata.count} |`,
    `| Total Views | ${fmtViews(totalViews)} |`,
    `| Metadata Generated | ${fmtDate(metadata.generatedAt)} |`,
    '',
    '## Category Distribution',
    '',
    '| Category | Videos | Views |',
    '|----------|--------|-------|',
    categoryRows,
    '',
    '## Top Videos (By Views)',
    '',
    '| # | Video | Views | Link |',
    '|---|-------|-------|------|',
    topVideoRows,
    '',
    '## Top Tags',
    '',
    topTagLine || '_No tags available._',
    '',
    '## Cross-References',
    '',
    '- [Video Wiki Index](videos/index.md)',
    '- [Development](videos/development.md)',
    '- [Kubernetes](videos/kubernetes.md)',
    '- [Security](videos/security.md)',
    '- [Programming](videos/programming.md)',
    '- [Finance](videos/finance.md)',
    '- [Korea](videos/korea.md)',
  ].join('\n')
}

function main() {
  const { ifDue, force } = parseArgs()
  const now = new Date()
  const window = currentWindow(now)
  const period = `${window.year}-${padMonth(window.month)}`
  const scheduledDate = new Date(window.year, window.month - 1, 1)

  if (ifDue && !isRunMonth(now)) {
    console.log('[wiki:analysis] Skip: only runs in Apr/Oct with --if-due.')
    return
  }

  if (ifDue && now < scheduledDate) {
    console.log(`[wiki:analysis] Not due yet for ${period}.`)
    return
  }

  const periodPath = resolve(WIKI_ROOT, `channel-analysis-${period}.md`)
  if (!force && existsSync(periodPath)) {
    console.log(`[wiki:analysis] Already generated for ${period}. Skipping.`)
    return
  }

  const metadata = loadMetadata()

  const categoryCounts: Record<string, number> = {}
  for (const [category, ids] of Object.entries(VIDEO_CONFIG)) {
    categoryCounts[category] = ids.length
  }

  const markdown = buildMarkdown(metadata, period, categoryCounts)
  writeFileSync(periodPath, markdown)
  writeFileSync(LATEST_PATH, markdown)

  appendLog(isoDate(metadata.generatedAt), period, metadata.count)

  console.log(`[wiki:analysis] Wrote ${periodPath}`)
  console.log(`[wiki:analysis] Updated ${LATEST_PATH}`)
  if (existsSync(WIKI_VIDEOS)) {
    console.log('[wiki:analysis] Linked against existing wiki category pages.')
  }
}

main()
