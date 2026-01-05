import { VercelRequest, VercelResponse } from '@vercel/node'

/**
 * Simple structured logging for API monitoring
 * Used in serverless environment without importing client logger
 */
function logApiCall(message: string, metadata?: Record<string, any>) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    level: 'info',
    message,
    ...(metadata && { metadata })
  }
  console.log(JSON.stringify(logEntry))
}

function logApiError(message: string, error?: Error | string, metadata?: Record<string, any>) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    level: 'error',
    message,
    ...metadata,
    ...(error instanceof Error && {
      errorMessage: error.message,
      errorStack: error.stack
    }),
    ...(typeof error === 'string' && { error })
  }
  console.error(JSON.stringify(logEntry))
}

/**
 * Set CORS headers to restrict cross-origin access
 * Only allows GET requests from configured origins
 */
function setCorsHeaders(req: VercelRequest, res: VercelResponse) {
  // Allow specific origins (or localhost for development)
  const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:3000,https://pastelsketchbook.org').split(',')
  const origin = req.headers.origin
  
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.setHeader('Access-Control-Max-Age', '3600') // 1 hour
}

/**
 * Vercel Serverless Function: YouTube Video Metadata
 *
 * Fetches video metadata (title, view count, publish date) from YouTube Data API v3
 * Caches responses for 6 hours to minimize quota usage
 * Includes rate limiting to prevent quota exhaustion
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
 *
 * Rate Limiting:
 * - 60 requests per minute per IP
 * - Returns 429 if exceeded
 *
 * CORS:
 * - Only allows requests from configured origins (see setCorsHeaders)
 * - GET requests only (no POST/PUT/DELETE)
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

/**
 * Simple in-memory rate limiting
 * Tracks request timestamps per IP address
 *
 * Trade-offs:
 * - ✅ Single server: Sufficient for Vercel serverless (no persistent state needed)
 * - ✅ Low overhead: No external dependencies (Redis)
 * - ⚠️  Race condition: Theoretical edge case in extreme concurrency (>1000 concurrent reqs)
 * - ⚠️  Multi-server: Not suitable for load-balanced deployments
 *
 * Future: Consider Redis for horizontal scaling if needed
 */
const rateLimitMap = new Map<string, number[]>()
const RATE_LIMIT_WINDOW_MS = 60000 // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 60

function getRateLimitKey(req: VercelRequest): string {
  // Get IP from x-forwarded-for (Vercel) or x-real-ip (nginx) or fallback to connection.remoteAddress
  const forwarded = req.headers['x-forwarded-for']
  if (typeof forwarded === 'string') {
    return forwarded.split(',')[0].trim()
  }
  const realIp = req.headers['x-real-ip']
  if (typeof realIp === 'string') {
    return realIp
  }
  return req.socket?.remoteAddress || 'unknown'
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const requests = rateLimitMap.get(ip) || []

  // Filter out old requests outside the window
  const validRequests = requests.filter((t) => now - t < RATE_LIMIT_WINDOW_MS)

  // Check if limit exceeded
  if (validRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
    return false
  }

  // Record this request
  rateLimitMap.set(ip, [...validRequests, now])

  // Cleanup old entries periodically (keep map size bounded)
  if (rateLimitMap.size > 1000) {
    const now = Date.now()
    for (const [key, times] of rateLimitMap.entries()) {
      const valid = times.filter((t) => now - t < RATE_LIMIT_WINDOW_MS)
      if (valid.length === 0) {
        rateLimitMap.delete(key)
      } else {
        rateLimitMap.set(key, valid)
      }
    }
  }

  return true
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse<ApiResponse | { error: string }>
) {
  // Set CORS headers for all responses
  setCorsHeaders(req, res)
  
  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }
  
  // Only accept GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Check rate limit
  const ip = getRateLimitKey(req)
  if (!checkRateLimit(ip)) {
    logApiCall('Rate limit exceeded', { ip })
    return res.status(429).json({ error: 'Too many requests' })
  }

  const { ids } = req.query

  // Validate input
  if (!ids || typeof ids !== 'string' || !ids.trim()) {
    logApiError('Missing ids parameter', 'Invalid request')
    return res
      .status(400)
      .json({ error: 'Missing required parameter: ids (comma-separated video IDs)' })
  }

  const apiKey = process.env.VITE_YOUTUBE_API_KEY

  if (!apiKey) {
    logApiError('API key not configured', 'VITE_YOUTUBE_API_KEY missing')
    return res.status(500).json({ error: 'API key not configured' })
  }

  const startTime = Date.now()

  try {
    // Call YouTube Data API v3
    const videoIds = ids.split(',').length
    const youtubeUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${ids}&key=${apiKey}`

    const response = await fetch(youtubeUrl)

    if (!response.ok) {
      const duration = Date.now() - startTime
      logApiError('YouTube API error', `Status ${response.status}`, {
        statusCode: response.status,
        statusText: response.statusText,
        durationMs: duration,
        videoCount: videoIds
      })
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

    const duration = Date.now() - startTime
    logApiCall('YouTube metadata fetched successfully', {
      videoCount: videos.length,
      durationMs: duration
    })

    // Set cache headers: 6 hours (21600 seconds)
    res.setHeader('Cache-Control', 'public, max-age=21600, s-maxage=21600')
    res.setHeader('Content-Type', 'application/json')

    return res.status(200).json({
      videos,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    const duration = Date.now() - startTime
    logApiError('Error fetching YouTube metadata', error, {
      durationMs: duration,
      videoCount: ids.split(',').length
    })
    return res.status(500).json({
      error: error instanceof Error ? error.message : 'Internal server error'
    })
  }
}
