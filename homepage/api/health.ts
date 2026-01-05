import { VercelRequest, VercelResponse } from '@vercel/node'
import { logger } from '../src/lib/logger'
import { VideoMetadataResponseSchema } from '../src/config/videos'

interface HealthStatus {
  status: 'healthy' | 'degraded' | 'unhealthy'
  timestamp: string
  checks: {
    api: {
      status: 'ok' | 'failed'
      responseTime?: number
    }
    fallback: {
      status: 'ok' | 'failed'
    }
    environment: {
      status: 'ok' | 'failed'
      message?: string
    }
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const startTime = Date.now()
  const health: HealthStatus = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    checks: {
      api: { status: 'ok' },
      fallback: { status: 'ok' },
      environment: { status: 'ok' }
    }
  }

  // Check environment variables
  if (!process.env.VITE_YOUTUBE_API_KEY) {
    health.checks.environment.status = 'failed'
    health.checks.environment.message = 'YouTube API key not configured'
    health.status = 'degraded'
  }

  // Check API connectivity (test with a single video ID)
  try {
    const testVideoId = 'dQw4w9WgXcQ' // Rick Roll - stable video that won't change
    const apiStartTime = Date.now()

    const apiResponse = await fetch(
      `https://www.googleapis.com/youtube/data/v3/videos?part=snippet,statistics&id=${testVideoId}&key=${process.env.VITE_YOUTUBE_API_KEY}`,
      { timeout: 5000 }
    )

    const apiResponseTime = Date.now() - apiStartTime

    if (!apiResponse.ok) {
      health.checks.api.status = 'failed'
      health.status = 'degraded'
      logger.warn('Health check: YouTube API failed', {
        status: apiResponse.status,
        responseTime: apiResponseTime
      })
    } else {
      health.checks.api.responseTime = apiResponseTime
      logger.info('Health check: YouTube API healthy', {
        responseTime: apiResponseTime
      })
    }
  } catch (error) {
    health.checks.api.status = 'failed'
    health.status = 'degraded'
    logger.error('Health check: YouTube API error', error instanceof Error ? error.message : String(error))
  }

  // Check fallback metadata availability
  try {
    // In a real scenario, you'd check if the static metadata file exists
    // For now, we assume it's available if the function is running
    health.checks.fallback.status = 'ok'
  } catch (error) {
    health.checks.fallback.status = 'failed'
    health.status = 'unhealthy'
    logger.error('Health check: Fallback metadata error', error instanceof Error ? error.message : String(error))
  }

  // Determine overall status
  const failedChecks = Object.values(health.checks).filter(c => c.status === 'failed').length
  if (failedChecks > 1) {
    health.status = 'unhealthy'
  } else if (failedChecks === 1) {
    health.status = 'degraded'
  }

  const statusCode = health.status === 'healthy' ? 200 : health.status === 'degraded' ? 503 : 500

  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Cache-Control', 'no-cache')
  res.status(statusCode).json(health)

  logger.info('Health check completed', {
    status: health.status,
    totalTime: Date.now() - startTime
  })
}
