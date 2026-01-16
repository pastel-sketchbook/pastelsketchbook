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
  } catch (e) {
    // .env.local not found, continue with existing env vars
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
}

const PLAYLISTS: PlaylistConfig[] = [
  { id: 'PLOZ1_i7WA_ED7Bdhz48-YqxpeZ4qszwvK', name: 'korea' },
  { id: 'PLOZ1_i7WA_ECACxs7BkfGh_ZxTSwQ_s7y', name: 'finance' },
  { id: 'PLOZ1_i7WA_EAeKcYgHWr9MjHlK8JCDJKr', name: 'kubernetes' },
  { id: 'PLOZ1_i7WA_EC7ePuZp2f1TPtjdyIdKwtc', name: 'development' },
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

async function fetchVideoMetadata(
  videoIds: string[],
  apiKey: string
): Promise<VideoMetadata[]> {
  if (videoIds.length === 0) return []

  const allMetadata: VideoMetadata[] = []
  const BATCH_SIZE = 50 // YouTube API max is 50 per request

  try {
    for (let i = 0; i < videoIds.length; i += BATCH_SIZE) {
      const batch = videoIds.slice(i, i + BATCH_SIZE)
      const ids = batch.join(',')
      const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${ids}&key=${apiKey}`

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

      const batchMetadata = (data.items || []).map((item: any) => ({
        id: item.id,
        title: item.snippet.title || '',
        views: Number(item.statistics.viewCount) || 0,
        date: item.snippet.publishedAt || new Date().toISOString(),
        tags: item.snippet.tags || []
      }))

      allMetadata.push(...batchMetadata)
    }

    return allMetadata
  } catch (error) {
    console.error(
      'Failed to fetch video metadata:',
      error instanceof Error ? error.message : error
    )
    return []
  }
}

async function syncVideos() {
  loadEnv()
  const apiKey = process.env.VITE_YOUTUBE_API_KEY

  if (!apiKey) {
    console.warn(
      '⚠️  VITE_YOUTUBE_API_KEY not set.\n' +
      '   Skipping playlist sync and metadata generation.\n' +
      '   Set VITE_YOUTUBE_API_KEY in .env.local (dev) or Vercel project settings (prod).'
    )
    process.exit(0)
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

  // Update config if there are new videos
  if (totalNewVideos > 0) {
    console.log(`\n📝 Updating video config with ${totalNewVideos} new videos...`)

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
  tags: z.array(z.string()).optional()
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
  programming: [
    ${playlistData.programming.map((id) => `'${id}'`).join(',\n    ')}
  ]
} as const

export const allVideoIds = [
  ...VIDEO_CONFIG.korea,
  ...VIDEO_CONFIG.finance,
  ...VIDEO_CONFIG.kubernetes,
  ...VIDEO_CONFIG.development,
  ...VIDEO_CONFIG.programming
]

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
    console.log('\n✓ Config is up to date (no new videos)')
  }

  // Fetch metadata for all videos
  console.log('\n🎥 Fetching video metadata...')
  const allVideoIds = Object.values(playlistData).flat()
  const videos = await fetchVideoMetadata(allVideoIds, apiKey)

  if (videos.length === 0) {
    console.warn('⚠️  No video metadata fetched')
    return
  }

  // Save metadata
  const outputPath = resolve('public/videos-metadata.json')
  const output = {
    videos,
    generatedAt: new Date().toISOString(),
    count: videos.length
  }

  writeFileSync(outputPath, JSON.stringify(output, null, 2))
  console.log(`  ✓ Generated ${videos.length} video metadata`)
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
}

syncVideos()
