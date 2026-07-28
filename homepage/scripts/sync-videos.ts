/**
 * Sync videos from YouTube playlists and update all metadata
 *
 * This script:
 * 1. Fetches all videos from configured playlists
 * 2. Updates src/config/videos.ts with any new video IDs
 * 3. Generates fresh metadata and saves to public/videos-metadata.json
 *
 * Usage: bun scripts/sync-videos.ts
 *
 * Environment Variables:
 * - VITE_YOUTUBE_API_KEY: YouTube Data API key (required)
 */

import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'
import { allVideoIds, videoCategories } from '../src/config/videos'
import { isYouTubeShort, parseIso8601Duration } from '../src/lib/youtube-shorts'

// Load env variables from .env.local
function loadEnv() {
  const envPath = resolve('.env.local')
  try {
    const envContent = readFileSync(envPath, 'utf-8')
    envContent.split('\n').forEach((line) => {
      const [key, ...valueParts] = line.split('=')
      if (key && !key.startsWith('#')) {
        const value = valueParts.join('=').trim()
        if (value) {
          process.env[key.trim()] = value
        }
      }
    })
  } catch {
    // .env.local not found — expected in CI or when env is set externally
  }
}

interface PlaylistConfig {
  id: string
  name: string
}

interface PlaylistVideo {
  id: string
  title: string
}

interface VideoMetadata {
  id: string
  title: string
  views: number
  date: string
  tags?: string[]
  /** Duration in seconds from YouTube contentDetails (Shorts detection). */
  durationSec?: number
  /** True when classified as a YouTube Short. */
  isShort?: boolean
}

const PLAYLISTS: PlaylistConfig[] = [
  { id: 'PLOZ1_i7WA_ED7Bdhz48-YqxpeZ4qszwvK', name: 'korea' },
  { id: 'PLOZ1_i7WA_ECACxs7BkfGh_ZxTSwQ_s7y', name: 'finance' },
  { id: 'PLOZ1_i7WA_EAeKcYgHWr9MjHlK8JCDJKr', name: 'kubernetes' },
  { id: 'PLOZ1_i7WA_EC7ePuZp2f1TPtjdyIdKwtc', name: 'development' },
  { id: 'PLOZ1_i7WA_EC5yyJi_oSJ44bA2Ek7JcD0', name: 'security' },
  { id: 'PLOZ1_i7WA_EDVKibanO4XgyJJxa1ryWbE', name: 'programming' }
]

async function fetchPlaylistVideos(
  playlistId: string,
  apiKey: string
): Promise<PlaylistVideo[]> {
  const videos: PlaylistVideo[] = []
  let pageToken = ''

  try {
    while (true) {
      const url = new URL(
        'https://www.googleapis.com/youtube/v3/playlistItems'
      )
      url.searchParams.set('playlistId', playlistId)
      url.searchParams.set('part', 'snippet')
      url.searchParams.set('maxResults', '50')
      url.searchParams.set('key', apiKey)
      if (pageToken) url.searchParams.set('pageToken', pageToken)

      const response = await fetch(url.toString())
      if (!response.ok) {
        throw new Error(
          `API error: ${response.status} ${response.statusText}`
        )
      }

      const data = await response.json()

      if (data.error) {
        throw new Error(`API error: ${data.error.message}`)
      }

      const items = data.items || []
      for (const item of items) {
        const videoId = item.snippet?.resourceId?.videoId
        const title = item.snippet?.title
        if (videoId && title) {
          videos.push({ id: videoId, title })
        }
      }

      pageToken = data.nextPageToken
      if (!pageToken) break
    }
  } catch (error) {
    console.error(
      `Failed to fetch playlist ${playlistId}:`,
      error instanceof Error ? error.message : error
    )
  }

  return videos
}

interface FetchResult {
  metadata: VideoMetadata[]
  /** Private/deleted/missing IDs — always hidden. */
  hiddenIds: string[]
  /** YouTube Shorts detected via duration < 2 min — always hidden from wiki pipeline. */
  shortIds: string[]
}

async function fetchVideoMetadata(
  videoIds: string[],
  apiKey: string
): Promise<FetchResult> {
  if (videoIds.length === 0) return { metadata: [], hiddenIds: [], shortIds: [] }

  const allMetadata: VideoMetadata[] = []
  const returnedIds = new Set<string>()
  const nonPublicIds: string[] = []
  const shortIds: string[] = []
  const BATCH_SIZE = 50 // YouTube API max is 50 per request

  try {
    for (let i = 0; i < videoIds.length; i += BATCH_SIZE) {
      const batch = videoIds.slice(i, i + BATCH_SIZE)
      const ids = batch.join(',')
      // contentDetails.duration is the authoritative Shorts signal (title tags are optional)
      const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,status,contentDetails&id=${ids}&key=${apiKey}`

      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(
          `YouTube API error: ${response.status} ${response.statusText}`
        )
      }

      const data = await response.json()

      if (data.error) {
        throw new Error(`YouTube API error: ${data.error.message}`)
      }

      for (const item of data.items || []) {
        returnedIds.add(item.id)
        const privacy = item.status?.privacyStatus

        if (privacy && privacy !== 'public') {
          nonPublicIds.push(item.id)
          console.log(`    ⊘ Skipping non-public video ${item.id} (${privacy})`)
          continue
        }

        const durationIso = item.contentDetails?.duration as string | undefined
        const durationSec = parseIso8601Duration(durationIso) ?? undefined
        const title = item.snippet.title || ''
        const short = isYouTubeShort({ durationSec, durationIso, title })

        if (short) {
          shortIds.push(item.id)
          console.log(
            `    🩳 Short detected ${item.id} (${durationSec ?? '?'}s) — ${title.slice(0, 50)}`
          )
        }

        allMetadata.push({
          id: item.id,
          title,
          views: Number(item.statistics.viewCount) || 0,
          date: item.snippet.publishedAt || new Date().toISOString(),
          tags: (item.snippet.tags || []).map((tag: string) => tag.toLowerCase()),
          ...(durationSec != null ? { durationSec } : {}),
          isShort: short
        })
      }
    }

    // Videos requested but not returned by YouTube are deleted/private
    const missingIds = videoIds.filter((id) => !returnedIds.has(id))
    if (missingIds.length > 0) {
      console.log(`    ⊘ ${missingIds.length} videos not returned by YouTube (deleted/private)`)
    }

    const hiddenIds = [...nonPublicIds, ...missingIds]
    return { metadata: allMetadata, hiddenIds, shortIds }
  } catch (error) {
    console.error(
      'Failed to fetch video metadata:',
      error instanceof Error ? error.message : error
    )
    return { metadata: [], hiddenIds: [], shortIds: [] }
  }
}

async function syncVideos() {
  loadEnv()
  const apiKey = process.env.VITE_YOUTUBE_API_KEY

  if (!apiKey) {
    console.warn(
      '⚠️  VITE_YOUTUBE_API_KEY not set.\n' +
      '   Falling back to offline metadata sync from existing JSON + raw transcripts.\n' +
      '   To refresh from YouTube, set VITE_YOUTUBE_API_KEY in .env.local (dev) or Vercel project settings (prod).',
    )

    const outputPath = resolve('public/videos-metadata.json')
    const wikiRawDir = resolve('..', 'wiki', 'raw', 'transcripts')

    let existing: { videos: VideoMetadata[] } | null = null
    try {
      existing = JSON.parse(readFileSync(outputPath, 'utf-8')) as { videos: VideoMetadata[] }
    } catch {
      existing = { videos: [] }
    }

    const byId = new Map(existing.videos.map((v) => [v.id, v]))

    for (const id of allVideoIds) {
      if (byId.has(id)) continue

      const rawPath = resolve(wikiRawDir, `${id}.md`)
      try {
        const raw = readFileSync(rawPath, 'utf-8')
        const title = raw.match(/\n#\s+(.+)\n/)?.[1]?.trim() || id
        const views = Number(raw.match(/\nviews:\s*(\d+)\n/)?.[1] || 0)
        const date = raw.match(/\ndate:\s*([^\n]+)\n/)?.[1]?.trim() || new Date().toISOString()

        byId.set(id, {
          id,
          title,
          views,
          date,
          tags: [],
        })
      } catch {
        byId.set(id, {
          id,
          title: id,
          views: 0,
          date: new Date().toISOString(),
          tags: [],
        })
      }
    }

    const videos = [...byId.values()].map((v) => ({
      ...v,
      // Ensure stable lowercase tags if they exist
      tags: (v.tags || []).map((t) => t.toLowerCase()),
    }))

    // Keep the output deterministic: group by category ordering, then views desc.
    videos.sort((a, b) => {
      const ca = videoCategories[a.id] || 'zzzz'
      const cb = videoCategories[b.id] || 'zzzz'
      if (ca !== cb) return ca.localeCompare(cb)
      return b.views - a.views
    })

    writeFileSync(
      outputPath,
      JSON.stringify(
        { videos, generatedAt: new Date().toISOString(), count: videos.length },
        null,
        2,
      ),
    )
    console.log(`  ✓ Offline metadata sync complete (${videos.length} videos)`)
    return
  }

  console.log('📡 Fetching playlists...\n')

  const playlistData: Record<string, string[]> = {}
  const newVideosFound: Record<string, string[]> = {}

  // Read current config
  const configPath = resolve('src/config/videos.ts')
  const currentConfig = readFileSync(configPath, 'utf-8')

  // Extract current video IDs
  const currentIds: Record<string, Set<string>> = {}
  for (const playlist of PLAYLISTS) {
    const regex = new RegExp(
      `${playlist.name}:\\s*\\[([^\\]]+)\\]`,
      's'
    )
    const match = currentConfig.match(regex)
    if (match) {
      const ids = match[1]
        .split(',')
        .map((id) => id.trim().replace(/['"]/g, ''))
        .filter(Boolean)
      currentIds[playlist.name] = new Set(ids)
    }
  }

  // Fetch all playlists
  for (const playlist of PLAYLISTS) {
    console.log(`  Fetching ${playlist.name} playlist...`)
    const videos = await fetchPlaylistVideos(playlist.id, apiKey)
    const videoIds = videos.map((v) => v.id)
    playlistData[playlist.name] = videoIds

    const current = currentIds[playlist.name] || new Set()
    const newIds = videoIds.filter((id) => !current.has(id))

    if (newIds.length > 0) {
      newVideosFound[playlist.name] = newIds
      console.log(
        `    ✓ Found ${videos.length} videos (${newIds.length} new)`
      )
    } else {
      console.log(`    ✓ Found ${videos.length} videos (no new)`)
    }
  }

  const totalNewVideos = Object.values(newVideosFound).reduce(
    (sum, arr) => sum + arr.length,
    0
  )

  // Preserve videos from committed config that aren't in any playlist (manual additions)
  const manualIds: Record<string, string[]> = {}
  for (const pl of PLAYLISTS) {
    const current = currentIds[pl.name] || new Set()
    const playlistIds = playlistData[pl.name] || []
    const notInPlaylist = [...current].filter((id) => !playlistIds.includes(id))
    if (notInPlaylist.length > 0) {
      manualIds[pl.name] = notInPlaylist
      playlistData[pl.name] = [...playlistIds, ...notInPlaylist]
      console.log(`    ⊕ Preserved ${notInPlaylist.length} manual videos not in playlist`)
    }
  }

  const allManualIds = Object.values(manualIds).flat()

  // Fetch metadata for all videos (do this before config write to detect hidden IDs + Shorts)
  console.log('\n🎥 Fetching video metadata (incl. contentDetails.duration for Shorts)...')
  const allPlaylistVideoIds = Object.values(playlistData).flat()
  const { metadata: videos, hiddenIds, shortIds } = await fetchVideoMetadata(
    allPlaylistVideoIds,
    apiKey
  )

  if (videos.length === 0) {
    console.warn('⚠️  No video metadata fetched')
    return
  }

  if (hiddenIds.length > 0) {
    console.log(`\n🔒 ${hiddenIds.length} non-public/missing videos:`)
    hiddenIds.forEach((id) => console.log(`    - ${id}`))
  }

  if (shortIds.length > 0) {
    console.log(`\n🩳 ${shortIds.length} YouTube Shorts (duration < 2 min) — auto-hidden:`)
    shortIds.forEach((id) => {
      const v = videos.find((x) => x.id === id)
      console.log(`    - ${id} (${v?.durationSec ?? '?'}s) ${v?.title?.slice(0, 50) ?? ''}`)
    })
  }

  // Preserve manual HIDDEN entries (staged full videos not yet released), plus private + Shorts
  const manualHiddenRegex = /HIDDEN_VIDEO_IDS[^[]*\[([^\]]*)\]/s
  const manualMatch = currentConfig.match(manualHiddenRegex)
  // Extract only quoted string literals (real video IDs) from the HIDDEN block.
  // Splitting on commas is unsafe because comment lines (e.g. the "Released full
  // videos" tracking comment) contain commas and unquoted IDs — those would be
  // treated as hidden IDs, re-hiding released videos and corrupting the rewritten
  // file with comment-text "IDs" that break syntax.
  const existingHiddenIds = manualMatch
    ? (manualMatch[1].match(/'[^']+'/g) ?? []).map((s) => s.slice(1, -1))
    : []
  const allHiddenIds = [...new Set([...hiddenIds, ...shortIds, ...existingHiddenIds])]

  // Public metadata excludes Shorts and non-public (they stay in HIDDEN_VIDEO_IDS only)
  const publicVideos = videos.filter((v) => !shortIds.includes(v.id) && !hiddenIds.includes(v.id))

  // Update config if there are new videos or hidden IDs changed
  const prevHiddenSorted = [...existingHiddenIds].sort().join(',')
  const nextHiddenSorted = [...allHiddenIds].sort().join(',')
  const configNeedsUpdate =
    totalNewVideos > 0 || prevHiddenSorted !== nextHiddenSorted
  if (configNeedsUpdate) {
    const reason = [
      totalNewVideos > 0 ? `${totalNewVideos} new videos` : null,
      shortIds.length > 0 ? `${shortIds.length} shorts` : null,
      hiddenIds.length > 0 ? `${hiddenIds.length} non-public` : null,
    ]
      .filter(Boolean)
      .join(', ')
    console.log(`\n📝 Updating video config (${reason || 'hidden set changed'})...`)

    const newConfig = `/**
 * Centralized video configuration
 * Single source of truth for all video IDs across the app
 */

import { z } from 'zod'

// Schema for validating video metadata responses
export const VideoMetadataSchema = z.object({
  id: z.string(),
  title: z.string(),
  views: z.number().nonnegative(),
  date: z.string().datetime(),
  tags: z.array(z.string()).optional(),
  /** Duration in seconds from YouTube contentDetails (authoritative Shorts signal). */
  durationSec: z.number().nonnegative().optional(),
  /** True when classified as a YouTube Short (duration < 2 min). */
  isShort: z.boolean().optional()
})

export const VideoMetadataResponseSchema = z.object({
  videos: z.array(VideoMetadataSchema),
  source: z.enum(['api', 'fallback', 'placeholder']).optional(),
  timestamp: z.string().datetime().optional()
})

export type VideoMetadata = z.infer<typeof VideoMetadataSchema>
export type VideoMetadataResponse = z.infer<typeof VideoMetadataResponseSchema>

export const VIDEO_CONFIG = {
  korea: [
    ${playlistData.korea.map((id) => `'${id}'`).join(',\n    ')}
  ],
  finance: [
    ${playlistData.finance.map((id) => `'${id}'`).join(',\n    ')}
  ],
  kubernetes: [${playlistData.kubernetes.map((id) => `'${id}'`).join(', ')}],
  development: [
    ${playlistData.development.map((id) => `'${id}'`).join(',\n    ')}
  ],
  security: [
    ${playlistData.security.map((id) => `'${id}'`).join(',\n    ')}
  ],
  programming: [
    ${playlistData.programming.map((id) => `'${id}'`).join(',\n    ')}
  ]
} as const

/**
 * Videos to hide from the showcase regardless of YouTube privacy status.
 * Auto-synced by sync-videos.ts:
 *   - private/deleted videos
 *   - YouTube Shorts (duration < 2 min via contentDetails — title tags are NOT reliable)
 * Manual IDs may also be added for staged full videos not yet released to the wiki.
 */
export const HIDDEN_VIDEO_IDS: ReadonlySet<string> = new Set([
${allHiddenIds.map((id) => `  '${id}',`).join('\n')}
])

export const allVideoIds = [
  ...VIDEO_CONFIG.korea,
  ...VIDEO_CONFIG.finance,
  ...VIDEO_CONFIG.kubernetes,
  ...VIDEO_CONFIG.development,
  ...VIDEO_CONFIG.security,
  ...VIDEO_CONFIG.programming
].filter((id) => !HIDDEN_VIDEO_IDS.has(id))

export const videoCategories: Record<string, keyof typeof VIDEO_CONFIG> = {}

Object.entries(VIDEO_CONFIG).forEach(([category, ids]) => {
  ids.forEach((id) => {
    videoCategories[id] = category as keyof typeof VIDEO_CONFIG
  })
})
`

    writeFileSync(configPath, newConfig)
    console.log('  ✓ Updated src/config/videos.ts')
  } else {
    console.log('\n✓ Config is up to date (no new videos, no hidden changes)')
  }

  // Save public metadata (exclude Shorts — they live only in HIDDEN_VIDEO_IDS)
  const outputPath = resolve('public/videos-metadata.json')
  const output = {
    videos: publicVideos,
    generatedAt: new Date().toISOString(),
    count: publicVideos.length
  }

  writeFileSync(outputPath, JSON.stringify(output, null, 2))
  console.log(`  ✓ Generated ${publicVideos.length} public video metadata (excluded ${shortIds.length} Shorts)`)
  console.log(`  ✓ Saved to ${outputPath}`)

  // Print summary
  console.log('\n✅ Sync complete!')
  if (totalNewVideos > 0) {
    console.log(`\nNew videos by playlist:`)
    for (const [playlist, ids] of Object.entries(newVideosFound)) {
      console.log(`  ${playlist}: ${ids.length} new`)
      ids.forEach((id) => console.log(`    - ${id}`))
    }
  }
  if (shortIds.length > 0) {
    console.log(`\n🩳 Shorts auto-hidden via duration < 2 min (title tags not required): ${shortIds.length}`)
  }
}

syncVideos().catch((err) => {
  console.error('Fatal error:', err instanceof Error ? err.message : String(err))
  process.exit(1)
})
