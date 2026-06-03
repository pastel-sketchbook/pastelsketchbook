import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'
import { execFileSync } from 'child_process'
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

interface TranscriptFetchResult {
  transcript: string | null
  error: string | null
}

interface FailedTranscriptEntry {
  id: string
  title: string
  category: string
  error: string
}

const WIKI_ROOT = resolve('..', 'wiki')
const TRANSCRIPTS_DIR = resolve(WIKI_ROOT, 'raw', 'transcripts')
const PUBLIC_TRANSCRIPTS_DIR = resolve('public', 'transcripts')
const FAILED_REPORT_PATH = resolve(TRANSCRIPTS_DIR, '_failed.json')
const METADATA_PATH = resolve('public', 'videos-metadata.json')
const YT_TRANSCRIPT_BIN = resolve('..', 'tools', 'yt-transcript', 'zig-out', 'bin', 'yt-transcript')

const DEFAULT_MAX_TRANSCRIPT_CHARS = 120_000
const TRANSCRIPT_RETRIES = 3
const TRANSCRIPT_RETRY_DELAY = 2000

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

function parseArgs(): {
  top: number
  all: boolean
  category?: string
  id?: string
  force: boolean
  maxChars: number
} {
  const args = process.argv.slice(2)
  const result = {
    top: 10,
    all: false,
    force: false,
    maxChars: DEFAULT_MAX_TRANSCRIPT_CHARS,
  } as ReturnType<typeof parseArgs>

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
    } else if (args[i] === '--max-chars' && args[i + 1]) {
      result.maxChars = Number.parseInt(args[i + 1], 10)
      i++
    }
  }

  return result
}

async function getTranscript(videoId: string, maxChars: number): Promise<TranscriptFetchResult> {
  let lastError: string | null = null

  for (let attempt = 1; attempt <= TRANSCRIPT_RETRIES; attempt++) {
    try {
      // Use `--` separator so IDs starting with `-` are not parsed as flags.
      const result = execFileSync(
        YT_TRANSCRIPT_BIN,
        ['--max-chars', String(maxChars), '--', videoId],
        { encoding: 'utf-8', timeout: 30_000, stdio: ['pipe', 'pipe', 'pipe'] },
      )
      return { transcript: result.trim(), error: null }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      lastError = msg
      if (attempt < TRANSCRIPT_RETRIES) {
        console.warn(`    [warn] Transcript attempt ${attempt}/${TRANSCRIPT_RETRIES} failed: ${msg}`)
        await sleep(TRANSCRIPT_RETRY_DELAY * attempt)
      } else {
        console.warn(`    [warn] Transcript unavailable after ${TRANSCRIPT_RETRIES} attempts: ${msg}`)
      }
    }
  }
  return { transcript: null, error: lastError }
}

function writeFailedReport(
  failed: FailedTranscriptEntry[],
  runLabel: string,
  attempted: number,
  written: number,
  skipped: number,
): void {
  const payload = {
    generatedAt: new Date().toISOString(),
    runLabel,
    attempted,
    written,
    skipped,
    failedCount: failed.length,
    failed,
  }
  writeFileSync(FAILED_REPORT_PATH, `${JSON.stringify(payload, null, 2)}\n`)
}

function generateTranscriptPage(video: VideoMetadata, category: string, transcript: string): string {
  const now = new Date().toISOString()
  const lines: string[] = [
    '---',
    'type: source',
    `videoId: ${video.id}`,
    `category: ${category}`,
    `title: ${JSON.stringify(video.title)}`,
    `views: ${video.views}`,
    `date: ${video.date}`,
    `captured: ${now}`,
    '---',
    '',
    `# ${video.title}`,
    '',
    `> Category: [${category}](../../videos/${category}.md) · ${fmtViews(video.views)} views · ${fmtDate(video.date)}`,
    `> [Watch on YouTube](https://youtu.be/${video.id})`,
    '',
    '## Transcript',
    '',
    transcript,
    '',
    '---',
    `*Captured on ${fmtDate(now)}.*`,
  ]
  return lines.join('\n')
}

function appendLog(count: number, label: string) {
  const logPath = resolve(WIKI_ROOT, 'log.md')
  const date = isoDate(new Date().toISOString())
  const heading = `## [${date}] ingest | Video Transcripts`
  const entry = `${heading}\n\nExported ${count} transcript files (${label}) to \`wiki/raw/transcripts\`.\n`

  if (existsSync(logPath)) {
    const existing = readFileSync(logPath, 'utf-8')
    if (existing.includes(heading)) return
    writeFileSync(logPath, `${existing}\n${entry}`)
    return
  }

  writeFileSync(
    logPath,
    `---\ntype: log\n---\n\n# Wiki Log\n\nAppend-only chronological record of wiki operations.\n\n${entry}`,
  )
}

async function main() {
  if (!existsSync(METADATA_PATH)) {
    console.error('[error] videos-metadata.json not found. Run sync:videos first.')
    process.exit(1)
  }

  if (!existsSync(YT_TRANSCRIPT_BIN)) {
    console.error(`[error] yt-transcript binary not found at ${YT_TRANSCRIPT_BIN}. Run task tools:yt-transcript first.`)
    process.exit(1)
  }

  const metadata: MetadataFile = JSON.parse(readFileSync(METADATA_PATH, 'utf-8'))
  const args = parseArgs()

  let selected: VideoMetadata[]
  let runLabel: string

  if (args.id) {
    selected = metadata.videos.filter((v) => v.id === args.id)
    runLabel = `single: ${args.id}`
  } else if (args.category) {
    const catIds = new Set<string>(VIDEO_CONFIG[args.category as keyof typeof VIDEO_CONFIG] || [])
    selected = metadata.videos.filter((v) => catIds.has(v.id)).sort((a, b) => b.views - a.views)
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

  if (!Number.isFinite(args.maxChars) || args.maxChars <= 0) {
    console.error('[error] --max-chars must be a positive integer.')
    process.exit(1)
  }

  mkdirSync(TRANSCRIPTS_DIR, { recursive: true })

  let written = 0
  let skipped = 0
  const failed: FailedTranscriptEntry[] = []

  console.log(`\nExporting transcripts (${runLabel})\n`)

  for (let i = 0; i < selected.length; i++) {
    const video = selected[i]
    const outPath = resolve(TRANSCRIPTS_DIR, `${video.id}.md`)

    if (existsSync(outPath) && !args.force) {
      console.log(`  [${i + 1}/${selected.length}] Skipping: ${video.title} (exists)`)
      skipped++
      continue
    }

    console.log(`  [${i + 1}/${selected.length}] Fetching: ${video.title}`)
    const { transcript, error } = await getTranscript(video.id, args.maxChars)
    await sleep(500)

    if (!transcript) {
      console.log('    [skip] Transcript unavailable')
      failed.push({
        id: video.id,
        title: video.title,
        category: resolveCategory(video.id),
        error: error || 'unknown error',
      })
      continue
    }

    const page = generateTranscriptPage(video, resolveCategory(video.id), transcript)
    writeFileSync(outPath, page)
    written++
    console.log(`    Written: raw/transcripts/${video.id}.md`)
  }

  if (written > 0) {
    appendLog(written, runLabel)
  }

  writeFailedReport(failed, runLabel, selected.length, written, skipped)

  const synced = syncPublicTranscripts()

  console.log(`\nDone. Exported ${written}, skipped ${skipped} existing.`)
  console.log(`Synced ${synced} transcripts to public/transcripts/.`)
  console.log(`Failed transcript report: ${FAILED_REPORT_PATH} (${failed.length} failures)`)
}

/**
 * Mirror raw transcript .md files to homepage/public/transcripts/ so they ship
 * with the static build and are reachable via `/transcripts/<videoId>.md`.
 * Skips internal artifacts like `_failed.json`. Idempotent: rewrites every file
 * so newly enriched or corrected raw transcripts always reach the build.
 */
function syncPublicTranscripts(): number {
  mkdirSync(PUBLIC_TRANSCRIPTS_DIR, { recursive: true })
  let count = 0
  for (const name of readdirSync(TRANSCRIPTS_DIR)) {
    if (!name.endsWith('.md')) continue
    const src = resolve(TRANSCRIPTS_DIR, name)
    const dst = resolve(PUBLIC_TRANSCRIPTS_DIR, name)
    writeFileSync(dst, readFileSync(src))
    count++
  }
  return count
}

main().catch((err) => {
  console.error('Fatal error:', err instanceof Error ? err.message : String(err))
  process.exit(1)
})
