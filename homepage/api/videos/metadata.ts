import { VercelRequest, VercelResponse } from '@vercel/node'

/**
 * Vercel Serverless Function: YouTube Video Metadata
 *
 * Fetches video metadata (title, view count, publish date) from YouTube Data API v3
 * Caches responses for 6 hours to minimize quota usage
 *
 * @query ids - Comma-separated YouTube video IDs (e.g., "V2cZl5s4EKU,L9sxbq8ugoU")
 * @returns { videos: [{ id, title, views, date }] }
 *
 * Environment Variables:
 * - VITE_YOUTUBE_API_KEY: YouTube Data API key (required, set in Vercel)
 *
 * YouTube API Quota:
 * - Free tier: 10,000 units/day
 * - This endpoint uses 1 unit per batch request (all IDs in one call)
 */

interface YouTubeVideo {
  id: string
  title: string
  views: number
  date: string
}

interface ApiResponse {
  videos: YouTubeVideo[]
  cached?: boolean
  timestamp: string
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse<ApiResponse | { error: string }>
) {
  // Only accept GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { ids } = req.query

  // Validate input
  if (!ids || typeof ids !== 'string' || !ids.trim()) {
    return res
      .status(400)
      .json({ error: 'Missing required parameter: ids (comma-separated video IDs)' })
  }

  const apiKey = process.env.VITE_YOUTUBE_API_KEY

  if (!apiKey) {
    console.error('VITE_YOUTUBE_API_KEY not configured in environment')
    return res.status(500).json({ error: 'API key not configured' })
  }

  try {
    // Call YouTube Data API v3
    const youtubeUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${ids}&key=${apiKey}`

    const response = await fetch(youtubeUrl)

    if (!response.ok) {
      console.error(`YouTube API error: ${response.status}`, response.statusText)
      return res.status(response.status).json({ error: 'YouTube API request failed' })
    }

    const data = await response.json()

    // Extract and transform video metadata
    const videos: YouTubeVideo[] = (data.items || []).map((item: any) => ({
      id: item.id,
      title: item.snippet.title || '',
      views: Number(item.statistics.viewCount) || 0,
      date: item.snippet.publishedAt || new Date().toISOString()
    }))

    // Set cache headers: 6 hours (21600 seconds)
    res.setHeader('Cache-Control', 'public, max-age=21600, s-maxage=21600')
    res.setHeader('Content-Type', 'application/json')

    return res.status(200).json({
      videos,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error fetching YouTube metadata:', error)
    return res.status(500).json({
      error: error instanceof Error ? error.message : 'Internal server error'
    })
  }
}
