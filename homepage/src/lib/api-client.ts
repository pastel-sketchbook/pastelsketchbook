/**
 * Shared API Client
 * Reusable utilities for making API requests with consistent error handling,
 * logging, and validation patterns. Designed for use in Vercel serverless functions.
 */

import { z } from 'zod'
import { logger } from './logger'

export interface ApiClientConfig {
  timeout?: number
  retries?: number
  retryDelay?: number
}

export interface ApiResponse<T> {
  data?: T
  error?: string
  statusCode: number
  timestamp: string
}

const DEFAULT_TIMEOUT = 10000
const DEFAULT_RETRIES = 2
const DEFAULT_RETRY_DELAY = 1000

/**
 * Makes a typed API request with automatic retry, error handling, and logging
 */
export async function makeApiRequest<T>(
  url: string,
  schema: z.ZodSchema,
  config?: ApiClientConfig
): Promise<ApiResponse<T>> {
  const timeout = config?.timeout ?? DEFAULT_TIMEOUT
  const retries = config?.retries ?? DEFAULT_RETRIES
  const retryDelay = config?.retryDelay ?? DEFAULT_RETRY_DELAY

  let lastError: Error | null = null

  for (let attempt = 1; attempt <= retries + 1; attempt++) {
    try {
      logger.debug(`API request attempt ${attempt}/${retries + 1}`, { url })

      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), timeout)

      const response = await fetch(url, {
        signal: controller.signal
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()

      // Validate response schema
      try {
        const validated = schema.parse(data)
        logger.info('API request successful', {
          url,
          statusCode: response.status,
          attempt,
          duration: timeout
        })

        return {
          data: validated as T,
          statusCode: response.status,
          timestamp: new Date().toISOString()
        }
      } catch (validationError) {
        throw new Error(
          `Response validation failed: ${validationError instanceof z.ZodError ? validationError.issues[0]?.message : String(validationError)}`
        )
      }
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error))

      if (attempt <= retries) {
        logger.warn(`API request failed, retrying in ${retryDelay}ms`, {
          url,
          attempt,
          error: lastError.message
        })

        await new Promise(resolve => setTimeout(resolve, retryDelay))
      }
    }
  }

  logger.error('API request failed after retries', {
    url,
    attempts: retries + 1,
    error: lastError?.message
  })

  return {
    error: lastError?.message || 'Unknown error',
    statusCode: 500,
    timestamp: new Date().toISOString()
  }
}

/**
 * Utility to create a cached fetch function with TTL
 * Useful for avoiding repeated API calls within a time window
 */
export function createCachedFetch<T>(
  schema: z.ZodSchema,
  ttlMs: number = 3600000 // 1 hour default
) {
  const cache = new Map<string, { data: T; expiresAt: number }>()

  return async (url: string, config?: ApiClientConfig): Promise<ApiResponse<T>> => {
    const now = Date.now()
    const cached = cache.get(url)

    if (cached && cached.expiresAt > now) {
      logger.info('Returning cached API response', { url })
      return {
        data: cached.data,
        statusCode: 200,
        timestamp: new Date().toISOString()
      }
    }

    const result = await makeApiRequest<T>(url, schema, config)

    if (result.data) {
      cache.set(url, {
        data: result.data,
        expiresAt: now + ttlMs
      })
    }

    return result
  }
}

/**
 * Rate limiting utility for API routes
 * Tracks requests per IP in a sliding window
 */
export class RateLimiter {
  private requests: Map<string, number[]> = new Map()
  private readonly windowMs: number
  private readonly maxRequests: number
  private cleanupInterval: NodeJS.Timeout | null = null

  constructor(windowMs: number = 60000, maxRequests: number = 60) {
    this.windowMs = windowMs
    this.maxRequests = maxRequests

    // Clean up old entries every 5 minutes
    this.cleanupInterval = setInterval(() => this.cleanup(), 5 * 60 * 1000)
  }

  isAllowed(identifier: string): boolean {
    const now = Date.now()
    const requests = this.requests.get(identifier) || []
    const validRequests = requests.filter(t => now - t < this.windowMs)

    if (validRequests.length >= this.maxRequests) {
      logger.warn('Rate limit exceeded', {
        identifier,
        requests: validRequests.length,
        maxRequests: this.maxRequests
      })
      return false
    }

    validRequests.push(now)
    this.requests.set(identifier, validRequests)
    return true
  }

  private cleanup(): void {
    const now = Date.now()
    for (const [id, requests] of this.requests.entries()) {
      const validRequests = requests.filter(t => now - t < this.windowMs)
      if (validRequests.length === 0) {
        this.requests.delete(id)
      } else {
        this.requests.set(id, validRequests)
      }
    }
    logger.debug('Rate limiter cleaned up', {
      activeKeys: this.requests.size
    })
  }

  destroy(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval)
    }
    this.requests.clear()
  }
}

/**
 * Error response builder for consistent error formatting
 */
export function createErrorResponse(error: unknown, defaultMessage: string = 'Internal Server Error') {
  const message = error instanceof Error ? error.message : String(error)
  return {
    error: message || defaultMessage,
    timestamp: new Date().toISOString()
  }
}
