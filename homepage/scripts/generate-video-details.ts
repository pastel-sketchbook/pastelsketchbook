/**
 * Generate per-video wiki detail pages from YouTube transcripts + Gemini summaries
 *
 * Fetches transcript for each video, summarizes via Gemini, and writes
 * individual markdown pages to wiki/videos/details/{id}.md
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
import { fetchTranscript } from 'youtube-transcript'
import { GoogleGenAI } from '@google/genai'
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

interface GeminiResult {
  summary: string
  takeaways: string[]
  topics: string[]
}

const WIKI_ROOT = resolve('..', 'wiki')
const WIKI_DETAILS = resolve(WIKI_ROOT, 'videos', 'details')
const METADATA_PATH = resolve('public', 'videos-metadata.json')

// Truncate transcript to stay within Gemini context limits
const MAX_TRANSCRIPT_CHARS = 30_000

const TRANSCRIPT_RETRIES = 3
const TRANSCRIPT_RETRY_DELAY = 2000

const SYSTEM_PROMPT = `You are a technical content analyst specializing in software engineering, programming languages, and systems design. Given a video transcript, produce a structured analysis.

Guidelines:
- Identify the specific technologies, languages, frameworks, or tools discussed (e.g., Zig, Rust, Go, Kubernetes).
- Capture architectural decisions, trade-offs, and design philosophy — not just surface features.
- For programming language videos, highlight what makes the language distinct (e.g., comptime in Zig, borrow checker in Rust).
- Use precise technical terminology; avoid vague generalities.

Respond in JSON with these fields:
- "summary": A concise 2-3 sentence summary of what the video covers and its main thesis. Name the specific technology.
- "takeaways": An array of 3-5 key takeaways, each a single clear sentence with concrete details.
- "topics": An array of 3-8 key topics or concepts discussed (short phrases, lowercase, e.g. "zig comptime", "manual memory management").`

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

async function getTranscript(videoId: string): Promise<string | null> {
  for (let attempt = 1; attempt <= TRANSCRIPT_RETRIES; attempt++) {
    try {
      const segments = await fetchTranscript(videoId)
      const full = segments.map((s) => s.text).join(' ')
      return full.slice(0, MAX_TRANSCRIPT_CHARS)
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

// -- Gemini --

async function summarize(
  ai: GoogleGenAI,
  model: string,
  transcript: string,
): Promise<GeminiResult> {
  const response = await ai.models.generateContent({
    model,
    contents: `Analyze this video transcript:\n\n${transcript}`,
    config: {
      systemInstruction: SYSTEM_PROMPT,
      responseMimeType: 'application/json',
    },
  })

  try {
    const text = response.text ?? ''
    return JSON.parse(text) as GeminiResult
  } catch (parseError) {
    console.warn(`    [warn] Failed to parse Gemini JSON response: ${parseError instanceof Error ? parseError.message : String(parseError)}`)
    return {
      summary: 'Summary could not be generated.',
      takeaways: ['Analysis pending.'],
      topics: [],
    }
  }
}

// -- Page Generation --

function generateDetailPage(
  video: VideoMetadata,
  category: string,
  result: GeminiResult | null,
  transcriptAvailable: boolean,
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
  ]

  if (!transcriptAvailable) {
    lines.push('## Summary', '', '*Transcript unavailable for this video.*', '')
  } else if (result) {
    lines.push('## Summary', '', result.summary, '')

    if (result.takeaways.length > 0) {
      lines.push('## Key Takeaways', '')
      for (const t of result.takeaways) {
        lines.push(`- ${t}`)
      }
      lines.push('')
    }

    if (result.topics.length > 0) {
      lines.push(
        '## Topics Covered',
        '',
        result.topics.map((t) => `\`${t}\``).join(' · '),
        '',
      )
    }
  }

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

  const apiKey = process.env.VITE_GEMINI_API_KEY
  const modelName = process.env.VITE_GEMINI_API_MODEL || 'gemini-3-flash-preview'

  if (!apiKey) {
    console.error('[error] VITE_GEMINI_API_KEY not set. Required for Gemini summarization.')
    process.exit(1)
  }

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

  const ai = new GoogleGenAI({ apiKey })
  let generated = 0
  let skipped = 0

  console.log(`\nGenerating video details (${runLabel})\n`)

  for (let i = 0; i < selected.length; i++) {
    const video = selected[i]
    const outPath = resolve(WIKI_DETAILS, `${video.id}.md`)

    if (existsSync(outPath) && !args.force) {
      console.log(`  [${i + 1}/${selected.length}] Skipping: ${video.title} (exists)`)
      skipped++
      continue
    }

    console.log(`  [${i + 1}/${selected.length}] Processing: ${video.title} (${fmtViews(video.views)} views)`)

    const category = resolveCategory(video.id)

    // Fetch transcript
    const transcript = await getTranscript(video.id)
    await sleep(500)

    // Summarize via Gemini
    let result: GeminiResult | null = null
    if (transcript) {
      try {
        result = await summarize(ai, modelName, transcript)
      } catch (err) {
        console.warn(`    [warn] Gemini error: ${err instanceof Error ? err.message : err}`)
      }
      await sleep(1000)
    }

    // Write page
    const page = generateDetailPage(video, category, result, transcript !== null)
    writeFileSync(outPath, page)
    generated++
    console.log(`    Written: details/${video.id}.md`)
  }

  if (generated > 0) {
    appendLog(generated, runLabel)
  }

  console.log(`\nDone. Generated ${generated}, skipped ${skipped} existing.`)

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
