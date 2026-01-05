/**
 * Generate static video metadata JSON as fallback
 *
 * This script is run during the build process to pre-fetch YouTube video metadata.
 * The generated JSON serves as a fallback if the API is unavailable.
 *
 * Usage: bun scripts/generate-video-metadata.ts
 *
 * Environment Variables:
 * - VITE_YOUTUBE_API_KEY: YouTube Data API key (required)
 */

import { writeFileSync } from 'fs'
import { resolve } from 'path'

// Video IDs from showcase.tsx
const koreaVideos = [
  'V2cZl5s4EKU',
  'L9sxbq8ugoU',
  'vNHblhm9oQo',
  '4h84JgKkt94',
  'CASZX56r-tk',
  'EvcUSPWkOA8',
  'JlPl9MskqJM',
  'drVBXipEOAs'
]

const financeVideos = [
  'tPDFgVAp4c4',
  'nnL78ZVifZU',
  'MDNRiJN7aEg',
  'KBfVy5-M-5k',
  'EMXUbohWsWs'
]

const kubernetesVideos = ['8ycnldvJmuA', 'ftODZr2_V5Q']

const developmentVideos = [
  'Xhq99-YHXCY',
  'PNFlYx8HiOM',
  'pzVOjl6mOD4',
  'olsB3bJxA2A',
  'IF5sNQH-01c',
  '2kvYb2pVe5o',
  'TLqdeHlAo3A'
]

const allVideoIds = [
  ...koreaVideos,
  ...financeVideos,
  ...kubernetesVideos,
  ...developmentVideos
]

async function generateMetadata() {
  const apiKey = process.env.VITE_YOUTUBE_API_KEY

  if (!apiKey) {
    console.error(
      'Error: VITE_YOUTUBE_API_KEY environment variable is not set.\n' +
      'Please set your YouTube Data API key before running this script.'
    )
    process.exit(1)
  }

  console.log(`Fetching metadata for ${allVideoIds.length} videos...`)

  try {
    // Batch fetch all video IDs in one request
    const ids = allVideoIds.join(',')
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

    // Transform response
    const videos = (data.items || []).map((item: any) => ({
      id: item.id,
      title: item.snippet.title || '',
      views: Number(item.statistics.viewCount) || 0,
      date: item.snippet.publishedAt || new Date().toISOString()
    }))

    // Write to public directory
    const outputPath = resolve('public/videos-metadata.json')
    const output = {
      videos,
      generatedAt: new Date().toISOString(),
      count: videos.length
    }

    writeFileSync(outputPath, JSON.stringify(output, null, 2))

    console.log(`✓ Generated ${videos.length} video metadata`)
    console.log(`✓ Saved to ${outputPath}`)
    console.log(
      `✓ Fallback JSON ready (generated at ${output.generatedAt})`
    )
  } catch (error) {
    console.error(
      'Error generating metadata:',
      error instanceof Error ? error.message : error
    )
    process.exit(1)
  }
}

generateMetadata()
