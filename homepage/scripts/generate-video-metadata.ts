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
import { allVideoIds } from '../src/config/videos'

async function generateMetadata() {
  const apiKey = process.env.VITE_YOUTUBE_API_KEY

  if (!apiKey) {
    console.log(
      'ℹ️  Skipping metadata generation: VITE_YOUTUBE_API_KEY not set.\n' +
      '   Using fallback from public/videos-metadata.json'
    )
    return
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
    console.warn(
      '⚠️  Failed to generate metadata:',
      error instanceof Error ? error.message : error
    )
    console.warn('   Build will proceed with existing fallback JSON')
  }
  }

generateMetadata()
