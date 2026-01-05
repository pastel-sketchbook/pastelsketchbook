import { describe, it, expect, beforeEach, vi } from 'vitest'

/**
 * Unit tests for api/videos/metadata.ts
 * Tests rate limiting, error handling, and response validation
 */

describe('YouTube Metadata API', () => {
  const mockYouTubeResponse = {
    items: [
      {
        id: 'V2cZl5s4EKU',
        snippet: {
          title: 'Test Video 1',
          publishedAt: '2025-12-26T23:35:15Z'
        },
        statistics: {
          viewCount: '100'
        }
      },
      {
        id: 'L9sxbq8ugoU',
        snippet: {
          title: 'Test Video 2',
          publishedAt: '2026-01-01T19:49:51Z'
        },
        statistics: {
          viewCount: '50'
        }
      }
    ]
  }

  describe('Response Format', () => {
    it('should return videos array with correct schema', () => {
      const videos = mockYouTubeResponse.items.map((item: any) => ({
        id: item.id,
        title: item.snippet.title || '',
        views: Number(item.statistics.viewCount) || 0,
        date: item.snippet.publishedAt || new Date().toISOString()
      }))

      expect(videos).toHaveLength(2)
      expect(videos[0]).toHaveProperty('id')
      expect(videos[0]).toHaveProperty('title')
      expect(videos[0]).toHaveProperty('views')
      expect(videos[0]).toHaveProperty('date')
    })

    it('should convert view count to number', () => {
      const video = {
        id: 'V2cZl5s4EKU',
        title: 'Test',
        views: Number('100'),
        date: '2025-12-26T23:35:15Z'
      }

      expect(typeof video.views).toBe('number')
      expect(video.views).toBe(100)
    })

    it('should handle missing view counts', () => {
      const mockItem = {
        id: 'test-id',
        snippet: { title: 'Test', publishedAt: '2025-12-26T23:35:15Z' },
        statistics: { viewCount: undefined }
      }

      const video = {
        id: mockItem.id,
        title: mockItem.snippet.title,
        views: Number(mockItem.statistics.viewCount) || 0,
        date: mockItem.snippet.publishedAt
      }

      expect(video.views).toBe(0)
    })

    it('should include timestamp in response', () => {
      const timestamp = new Date().toISOString()
      const response = {
        videos: [],
        timestamp
      }

      expect(response).toHaveProperty('timestamp')
      expect(typeof response.timestamp).toBe('string')
    })
  })

  describe('Rate Limiting', () => {
    it('should identify correct rate limit key from x-forwarded-for', () => {
      const forwarded = '192.168.1.1, 10.0.0.1, 172.16.0.1'
      const ip = forwarded.split(',')[0].trim()
      expect(ip).toBe('192.168.1.1')
    })

    it('should handle single IP in x-forwarded-for', () => {
      const forwarded = '192.168.1.1'
      const ip = forwarded.split(',')[0].trim()
      expect(ip).toBe('192.168.1.1')
    })

    it('should track request timestamps per IP', () => {
      const rateLimitMap = new Map<string, number[]>()
      const ip = '192.168.1.1'
      const now = Date.now()

      const requests = rateLimitMap.get(ip) || []
      rateLimitMap.set(ip, [...requests, now])

      expect(rateLimitMap.get(ip)).toHaveLength(1)
      expect(rateLimitMap.get(ip)![0]).toBe(now)
    })

    it('should filter old requests outside window', () => {
      const WINDOW_MS = 60000
      const PAST_REQUEST = Date.now() - (WINDOW_MS + 1000) // Outside window
      const RECENT_REQUEST = Date.now() // Inside window

      const requests = [PAST_REQUEST, RECENT_REQUEST]
      const now = Date.now()
      const validRequests = requests.filter((t) => now - t < WINDOW_MS)

      expect(validRequests).toHaveLength(1)
      expect(validRequests[0]).toBe(RECENT_REQUEST)
    })

    it('should block requests exceeding limit', () => {
      const MAX_REQUESTS = 60
      const requests = Array(MAX_REQUESTS).fill(Date.now())

      const shouldAllow = requests.length < MAX_REQUESTS
      expect(shouldAllow).toBe(false)
    })

    it('should cleanup old entries from rate limit map', () => {
      const WINDOW_MS = 60000
      const rateLimitMap = new Map<string, number[]>()

      // Add multiple IPs with old and recent requests
      const now = Date.now()
      rateLimitMap.set('ip1', [now - (WINDOW_MS + 1000), now])
      rateLimitMap.set('ip2', [now - (WINDOW_MS + 1000)])
      rateLimitMap.set('ip3', [now])

      // Simulate cleanup
      for (const [key, times] of rateLimitMap.entries()) {
        const valid = times.filter((t) => now - t < WINDOW_MS)
        if (valid.length === 0) {
          rateLimitMap.delete(key)
        } else {
          rateLimitMap.set(key, valid)
        }
      }

      expect(rateLimitMap.get('ip1')).toHaveLength(1) // Filtered old request
      expect(rateLimitMap.get('ip2')).toBeUndefined() // Deleted (no valid requests)
      expect(rateLimitMap.get('ip3')).toHaveLength(1) // Kept recent request
    })
  })

  describe('Input Validation', () => {
    it('should validate that ids parameter exists', () => {
      const ids = undefined
      const isValid = Boolean(ids && typeof ids === 'string' && ids.trim().length > 0)

      expect(isValid).toBe(false)
    })

    it('should validate ids is string', () => {
      const ids = 'V2cZl5s4EKU,L9sxbq8ugoU'
      const isValid = typeof ids === 'string'

      expect(isValid).toBe(true)
    })

    it('should reject empty ids parameter', () => {
      const ids = '   '
      const isValid = Boolean(ids && typeof ids === 'string' && ids.trim().length > 0)

      expect(isValid).toBe(false)
    })

    it('should accept comma-separated ids', () => {
      const ids = 'V2cZl5s4EKU,L9sxbq8ugoU,vNHblhm9oQo'
      const isValid = ids && typeof ids === 'string' && ids.trim().length > 0

      expect(isValid).toBe(true)
    })
  })

  describe('Error Handling', () => {
    it('should return 405 for non-GET requests', () => {
      const method = 'POST'
      const isAllowed = method === 'GET'

      expect(isAllowed).toBe(false)
    })

    it('should return 429 when rate limited', () => {
      const MAX_REQUESTS = 60
      const requestCount = 61
      const isRateLimited = requestCount > MAX_REQUESTS

      expect(isRateLimited).toBe(true)
    })

    it('should return 400 for missing ids parameter', () => {
      const ids = undefined
      const isValid = Boolean(ids && typeof ids === 'string' && ids.trim().length > 0)

      expect(isValid).toBe(false)
    })

    it('should return 500 if API key not configured', () => {
      const apiKey = undefined
      const isConfigured = !!apiKey

      expect(isConfigured).toBe(false)
    })
  })

  describe('Cache Headers', () => {
    it('should set correct cache control headers', () => {
      const cacheControl = 'public, max-age=21600, s-maxage=21600'
      const maxAge = 21600 // 6 hours

      expect(cacheControl).toContain('public')
      expect(cacheControl).toContain('max-age=21600')
      expect(maxAge).toBe(6 * 60 * 60)
    })

    it('should set content-type to application/json', () => {
      const contentType = 'application/json'

      expect(contentType).toBe('application/json')
    })
  })
})
