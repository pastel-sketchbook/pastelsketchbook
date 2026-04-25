/**
 * Generate per-video wiki detail pages from raw YouTube transcripts
 *
 * Fetches transcript for each video and writes individual markdown
 * pages to wiki/videos/details/{id}.md (no API calls made).
 *
 * Usage:
 *   bun scripts/generate-video-details.ts              # top 10 by views
 *   bun scripts/generate-video-details.ts --top 20     # top 20
 *   bun scripts/generate-video-details.ts --all        # all videos
 *   bun scripts/generate-video-details.ts --id VIDEO_ID
 *   bun scripts/generate-video-details.ts --category rust
 *   bun scripts/generate-video-details.ts --force      # regenerate existing
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'
import { execSync } from 'child_process'
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

interface FailedDetailEntry {
  id: string
  title: string
  category: string
  reason: string
}

const WIKI_ROOT = resolve('..', 'wiki')
const WIKI_DETAILS = resolve(WIKI_ROOT, 'videos', 'details')
const RAW_TRANSCRIPTS_DIR = resolve(WIKI_ROOT, 'raw', 'transcripts')
const FAILED_REPORT_PATH = resolve(WIKI_DETAILS, '_failed.json')
const METADATA_PATH = resolve('public', 'videos-metadata.json')

const MAX_TRANSCRIPT_CHARS = 30_000

const TRANSCRIPT_RETRIES = 3
const TRANSCRIPT_RETRY_DELAY = 2000

// -- Env --

function loadEnv() {
  const envPath = resolve('.env.local')
  try {
    const content = readFileSync(envPath, 'utf-8')
    for (const line of content.split('\n')) {
      const [key, ...valueParts] = line.split('=')
      if (key && !key.startsWith('#')) {
        const value = valueParts.join('=').trim()
        if (value) process.env[key.trim()] = value
      }
    }
  } catch {
    // .env.local not found — expected in CI or when env is set externally
  }
}

// -- Helpers --

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

function resolveCategory(videoId: string): string {
  for (const [category, ids] of Object.entries(VIDEO_CONFIG)) {
    if ((ids as readonly string[]).includes(videoId)) return category
  }
  return 'uncategorized'
}

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms))
}

function writeFailedReport(
  failed: FailedDetailEntry[],
  runLabel: string,
  totalSelected: number,
  generated: number,
  skipped: number,
): void {
  const payload = {
    generatedAt: new Date().toISOString(),
    runLabel,
    selected: totalSelected,
    generated,
    skipped,
    failedCount: failed.length,
    failed,
  }
  writeFileSync(FAILED_REPORT_PATH, `${JSON.stringify(payload, null, 2)}\n`)
}

function loadTranscriptFromRaw(videoId: string): string | null {
  const rawPath = resolve(RAW_TRANSCRIPTS_DIR, `${videoId}.md`)
  if (!existsSync(rawPath)) return null

  const content = readFileSync(rawPath, 'utf-8')
  const match = content.match(/\n## Transcript\n\n([\s\S]*?)\n---\n\*Captured on/m)
  if (!match) return null

  const transcript = match[1].trim()
  return transcript.length > 0 ? transcript : null
}

function hasFullDetailContent(detailPath: string): boolean {
  if (!existsSync(detailPath)) return false

  const content = readFileSync(detailPath, 'utf-8')

  const hasSummary = /\n## Summary\n\n[\s\S]+?(?=\n## |\n---\n\*)/m.test(content)
  const hasTranscript = /\n## Transcript\n\n```[\s\S]*?```/m.test(content)
  const transcriptUnavailable = content.includes('*Transcript unavailable for this video.*')

  // Extract videoId from frontmatter to check raw transcript exists
  const videoIdMatch = content.match(/^videoId:\s*(.+)$/m)
  const hasRawTranscript = videoIdMatch
    ? existsSync(resolve(RAW_TRANSCRIPTS_DIR, `${videoIdMatch[1].trim()}.md`))
    : true // if we can't parse the id, don't block on this check

  // In transcript-only mode, "complete" means:
  // - we either have a transcript embedded, or we explicitly recorded it's unavailable.
  // - the corresponding raw transcript file exists (if transcript was available).
  return hasSummary && (hasTranscript || transcriptUnavailable) && (hasRawTranscript || transcriptUnavailable)
}

function parseArgs(): {
  top: number
  all: boolean
  category?: string
  id?: string
  force: boolean
} {
  const args = process.argv.slice(2)
  const result = { top: 10, all: false, force: false } as ReturnType<typeof parseArgs>

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--top' && args[i + 1]) {
      result.top = Number.parseInt(args[i + 1], 10)
      i++
    } else if (args[i] === '--all') {
      result.all = true
    } else if (args[i] === '--category' && args[i + 1]) {
      result.category = args[i + 1]
      i++
    } else if (args[i] === '--id' && args[i + 1]) {
      result.id = args[i + 1]
      i++
    } else if (args[i] === '--force') {
      result.force = true
    }
  }

  return result
}

// -- Transcript --

const YT_TRANSCRIPT_BIN = resolve('..', 'tools', 'yt-transcript', 'zig-out', 'bin', 'yt-transcript')

async function getTranscript(videoId: string): Promise<string | null> {
  for (let attempt = 1; attempt <= TRANSCRIPT_RETRIES; attempt++) {
    try {
      const result = execSync(
        `${YT_TRANSCRIPT_BIN} ${videoId} --max-chars ${MAX_TRANSCRIPT_CHARS}`,
        { encoding: 'utf-8', timeout: 30_000, stdio: ['pipe', 'pipe', 'pipe'] },
      )
      return result.trim()
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      if (attempt < TRANSCRIPT_RETRIES) {
        console.warn(`    [warn] Transcript attempt ${attempt}/${TRANSCRIPT_RETRIES} failed: ${msg}`)
        await sleep(TRANSCRIPT_RETRY_DELAY * attempt)
      } else {
        console.warn(`    [warn] Transcript unavailable after ${TRANSCRIPT_RETRIES} attempts: ${msg}`)
      }
    }
  }
  return null
}

// -- Page Generation --

function generateDetailPage(
  video: VideoMetadata,
  category: string,
  transcriptAvailable: boolean,
  transcript: string | null,
): string {
  const now = new Date().toISOString()
  const tags = video.tags || []

  const lines: string[] = [
    '---',
    'type: video',
    `videoId: ${video.id}`,
    `category: ${category}`,
    `tags: [${tags.join(', ')}]`,
    `views: ${video.views}`,
    `date: ${video.date}`,
    `summarized: ${now}`,
    '---',
    '',
    `# ${video.title}`,
    '',
    `> [${category}](../${category}.md) · ${fmtViews(video.views)} views · ${fmtDate(video.date)}`,
    `> [Watch on YouTube](https://youtu.be/${video.id})`,
    '',
  ] // end lines array initial

  if (!transcriptAvailable) {
    lines.push('## Summary', '', '*Transcript unavailable for this video.*', '')
  } else if (transcript) {
    lines.push(
      '## Summary',
      '',
      '*Summary could not be generated (no Gemini API).*',
      '*Transcript available below.*',
      '',
      '## Transcript',
      '',
      '```',
      transcript.substring(0, 5000),
      '```',
      '',
    )
    if (transcript.length > 5000) {
      lines.push(`*Transcript truncated (${transcript.length} chars). Full transcript in [raw wiki](../raw/transcripts/${video.id}.md).*`, '')
    }
  } else {
    lines.push(
      '## Summary',
      '',
      '*Summary could not be generated (no Gemini API).*',
      '',
      '*Transcript available below.*',
      '',
    )
  }

  lines.push('')

  if (tags.length > 0) {
    lines.push(
      '## Tags',
      '',
      tags.map((t) => `[${t}](../tags/${t}.md)`).join(' · '),
      '',
    )
  }

  lines.push(
    '---',
    `*Auto-generated on ${fmtDate(now)}. Back to [${category}](../${category}.md) · [index](../index.md).*`,
  )

  return lines.join('\n')
}

// -- Log --

function appendLog(count: number, label: string) {
  const logPath = resolve(WIKI_ROOT, 'log.md')
  const date = isoDate(new Date().toISOString())
  const entry = `## [${date}] ingest | Video Details\n\nGenerated ${count} video detail pages (${label}).\n`

  if (existsSync(logPath)) {
    const existing = readFileSync(logPath, 'utf-8')
    if (existing.includes(`## [${date}] ingest | Video Details`)) return
    writeFileSync(logPath, `${existing}\n${entry}`)
  }
}

// -- Main --

async function main() {
  loadEnv()

  if (!existsSync(METADATA_PATH)) {
    console.error('[error] videos-metadata.json not found. Run sync:videos first.')
    process.exit(1)
  }

  const metadata: MetadataFile = JSON.parse(readFileSync(METADATA_PATH, 'utf-8'))
  const args = parseArgs()

  // Select videos to process
  let selected: VideoMetadata[]
  let runLabel: string

  if (args.id) {
    selected = metadata.videos.filter((v) => v.id === args.id)
    runLabel = `single: ${args.id}`
  } else if (args.category) {
    const catIds = new Set<string>(VIDEO_CONFIG[args.category as keyof typeof VIDEO_CONFIG] || [])
    selected = metadata.videos
      .filter((v) => catIds.has(v.id))
      .sort((a, b) => b.views - a.views)
    runLabel = `category: ${args.category}`
  } else if (args.all) {
    selected = [...metadata.videos].sort((a, b) => b.views - a.views)
    runLabel = 'all videos'
  } else {
    selected = [...metadata.videos].sort((a, b) => b.views - a.views).slice(0, args.top)
    runLabel = `top ${args.top} by views`
  }

  if (selected.length === 0) {
    console.log('No videos matched the criteria.')
    return
  }

  mkdirSync(WIKI_DETAILS, { recursive: true })

  let generated = 0
  let skipped = 0
  let loadedFromRaw = 0
  let fetchedFromYoutube = 0
  let missingTranscript = 0
  let skippedComplete = 0
  const failed: FailedDetailEntry[] = []

  console.log(`\nGenerating video details (${runLabel})\n`)

  for (let i = 0; i < selected.length; i++) {
    const video = selected[i]
    const outPath = resolve(WIKI_DETAILS, `${video.id}.md`)

    const rawTranscriptExists = existsSync(resolve(RAW_TRANSCRIPTS_DIR, `${video.id}.md`))
    const detailExists = existsSync(outPath)
    const transcriptKnownUnavailable = detailExists
      && readFileSync(outPath, 'utf-8').includes('*Transcript unavailable for this video.*')
    if (detailExists && !args.force && (rawTranscriptExists || transcriptKnownUnavailable)) {
      console.log(`  [${i + 1}/${selected.length}] Skipping: ${video.title} (exists)`)
      skipped++
      continue
    }
    if (detailExists && !args.force && !rawTranscriptExists) {
      console.log(`  [${i + 1}/${selected.length}] Regenerating: ${video.title} (missing raw transcript)`)
    }

    if (args.force && hasFullDetailContent(outPath)) {
      console.log(`  [${i + 1}/${selected.length}] Skipping: ${video.title} (already complete)`)
      skipped++
      skippedComplete++
      continue
    }

    console.log(`  [${i + 1}/${selected.length}] Processing: ${video.title} (${fmtViews(video.views)} views)`)

    const category = resolveCategory(video.id)

    let transcript = loadTranscriptFromRaw(video.id)
    if (transcript) {
      loadedFromRaw++
    } else {
      transcript = await getTranscript(video.id)
      await sleep(500)
      if (transcript) fetchedFromYoutube++
    }

    if (!transcript) {
      missingTranscript++
    }

    // Write page
    const page = generateDetailPage(video, category, transcript !== null, transcript || null)
    writeFileSync(outPath, page)
    generated++
    console.log(`    Written: details/${video.id}.md`)
  }

  if (generated > 0) {
    appendLog(generated, runLabel)
  }

  writeFailedReport(failed, runLabel, selected.length, generated, skipped)

  console.log(`\nDone. Generated ${generated}, skipped ${skipped} existing.`)
  if (args.force) {
    console.log(`Force-mode complete skips: ${skippedComplete}`)
  }
  console.log(`Transcript source: raw=${loadedFromRaw}, youtube=${fetchedFromYoutube}, missing=${missingTranscript}`)
  console.log(`Failed detail report: ${FAILED_REPORT_PATH} (${failed.length} failures)`)

  // Re-run wiki generation so category pages and wiki-bundle.json
  // pick up the newly created detail pages immediately.
  if (generated > 0) {
    console.log('\nRegenerating wiki pages to link new detail pages...')
    try {
      execSync('bun scripts/generate-wiki.ts', {
        cwd: resolve(import.meta.dir, '..'),
        stdio: 'inherit',
      })
    } catch (err) {
      console.warn(
        `[warn] Wiki regeneration failed: ${err instanceof Error ? err.message : String(err)}`,
      )
    }
  }
}

main().catch((err) => {
  console.error('Fatal error:', err instanceof Error ? err.message : String(err))
  process.exit(1)
})
