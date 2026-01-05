import { describe, it, expect, vi, beforeEach } from 'vitest'
import metadata from '../api/videos/metadata'
import type { VercelRequest, VercelResponse } from '@vercel/node'

// Mock VercelRequest and VercelResponse
function createMockRequest(overrides: Partial<VercelRequest> = {}): VercelRequest {
  return {
    method: 'GET',
    headers: {
      origin: 'http://localhost:3000'
    },
    query: {},
    socket: {
      remoteAddress: '127.0.0.1'
    } as any,
    ...overrides
  } as VercelRequest
}

function createMockResponse(): VercelResponse & { _getData: () => any } {
  const data: any = {}
  const headers: Record<string, string> = {}
  let statusCode = 200

  const statusChain = {
    json: vi.fn((body: any) => {
      data.body = body
      data.statusCode = statusCode
      return statusChain
    }),
    end: vi.fn(() => {
      data.statusCode = statusCode
      return statusChain
    })
  }

  return {
    setHeader: vi.fn((key: string, value: string) => {
      headers[key] = value
      return undefined as any
    }),
    status: vi.fn((code: number) => {
      statusCode = code
      return statusChain as any
    }),
    json: vi.fn((body: any) => {
      data.body = body
      data.statusCode = statusCode
      return undefined
    }),
    end: vi.fn(),
    _getData: () => data,
    _getHeaders: () => headers,
    _getStatusCode: () => statusCode
  } as any
}

describe('API Routes: /api/videos/metadata', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Set API key for tests
    process.env.VITE_YOUTUBE_API_KEY = 'test-key'
  })

  describe('Request Validation', () => {
    it('should return 400 for missing ids parameter', async () => {
      const req = createMockRequest({
        query: {}
      })
      const res = createMockResponse()

      await metadata(req, res)

      expect(res.status).toHaveBeenCalledWith(400)
      const data = res._getData()
      expect(data.body.error).toContain('Missing required parameter')
    })

    it('should return 400 for empty ids string', async () => {
      const req = createMockRequest({
        query: { ids: '' }
      })
      const res = createMockResponse()

      await metadata(req, res)

      expect(res.status).toHaveBeenCalledWith(400)
    })

    it('should return 400 for whitespace-only ids', async () => {
      const req = createMockRequest({
        query: { ids: '   ' }
      })
      const res = createMockResponse()

      await metadata(req, res)

      expect(res.status).toHaveBeenCalledWith(400)
    })

    it('should return 400 for invalid video ID format', async () => {
      const req = createMockRequest({
        query: { ids: 'invalid-id' }
      })
      const res = createMockResponse()

      await metadata(req, res)

      expect(res.status).toHaveBeenCalledWith(400)
      const data = res._getData()
      expect(data.body.error).toContain('Invalid video ID format')
    })

    it('should return 400 if any video ID is invalid', async () => {
      const req = createMockRequest({
        query: { ids: 'dQw4w9WgXcQ,invalid-id,V2cZl5s4EKU' }
      })
      const res = createMockResponse()

      await metadata(req, res)

      expect(res.status).toHaveBeenCalledWith(400)
    })

    it('should return 400 for too many video IDs (>50)', async () => {
      const tooManyIds = Array(51)
        .fill(null)
        .map((_, i) => `dQw4w9WgXcQ`)
        .join(',')

      const req = createMockRequest({
        query: { ids: tooManyIds }
      })
      const res = createMockResponse()

      await metadata(req, res)

      expect(res.status).toHaveBeenCalledWith(400)
      const data = res._getData()
      expect(data.body.error).toContain('Maximum 50 video IDs')
    })

    it('should accept valid video IDs', async () => {
      const req = createMockRequest({
        query: { ids: 'dQw4w9WgXcQ' }
      })
      const res = createMockResponse()

      // Mock the YouTube API response
      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              items: [
                {
                  id: 'dQw4w9WgXcQ',
                  snippet: {
                    title: 'Test Video',
                    publishedAt: '2009-10-25T06:57:33Z'
                  },
                  statistics: {
                    viewCount: '1234567890'
                  }
                }
              ]
            })
        } as any)
      )

      await metadata(req, res)

      expect(res.status).toHaveBeenCalledWith(200)
    })
  })

  describe('HTTP Methods', () => {
    it('should accept GET requests', async () => {
      const req = createMockRequest({
        method: 'GET',
        query: { ids: 'dQw4w9WgXcQ' }
      })
      const res = createMockResponse()

      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({ items: [] })
        } as any)
      )

      await metadata(req, res)

      expect(res.status).toHaveBeenCalledWith(200)
    })

    it('should handle OPTIONS preflight requests', async () => {
      const req = createMockRequest({
        method: 'OPTIONS'
      })
      const res = createMockResponse()

      await metadata(req, res)

      // OPTIONS returns 200 via status().end()
      expect(res.status).toHaveBeenCalledWith(200)
    })

    it('should reject POST requests', async () => {
      const req = createMockRequest({
        method: 'POST',
        query: { ids: 'dQw4w9WgXcQ' }
      })
      const res = createMockResponse()

      await metadata(req, res)

      expect(res.status).toHaveBeenCalledWith(405)
      const data = res._getData()
      expect(data.body.error).toContain('Method not allowed')
    })

    it('should reject DELETE requests', async () => {
      const req = createMockRequest({
        method: 'DELETE',
        query: { ids: 'dQw4w9WgXcQ' }
      })
      const res = createMockResponse()

      await metadata(req, res)

      expect(res.status).toHaveBeenCalledWith(405)
    })
  })

  describe('CORS Headers', () => {
    it('should set CORS headers for allowed origin', async () => {
      const req = createMockRequest({
        headers: {
          origin: 'http://localhost:3000'
        },
        query: { ids: 'dQw4w9WgXcQ' }
      })
      const res = createMockResponse()

      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({ items: [] })
        } as any)
      )

      await metadata(req, res)

      expect(res.setHeader).toHaveBeenCalledWith(
        'Access-Control-Allow-Origin',
        expect.any(String)
      )
      expect(res.setHeader).toHaveBeenCalledWith(
        'Access-Control-Allow-Methods',
        expect.stringContaining('GET')
      )
    })

    it('should set cache headers', async () => {
      const req = createMockRequest({
        query: { ids: 'dQw4w9WgXcQ' }
      })
      const res = createMockResponse()

      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({ items: [] })
        } as any)
      )

      await metadata(req, res)

      expect(res.setHeader).toHaveBeenCalledWith(
        'Cache-Control',
        expect.stringContaining('max-age=21600')
      )
    })
  })

  describe('Error Handling', () => {
    it('should return 500 if API key not configured', async () => {
      const originalEnv = process.env.VITE_YOUTUBE_API_KEY
      delete process.env.VITE_YOUTUBE_API_KEY

      const req = createMockRequest({
        query: { ids: 'dQw4w9WgXcQ' }
      })
      const res = createMockResponse()

      try {
        await metadata(req, res)
        expect(res.status).toHaveBeenCalledWith(500)
        const data = res._getData()
        expect(data.body.error).toContain('API key not configured')
      } finally {
        if (originalEnv) {
          process.env.VITE_YOUTUBE_API_KEY = originalEnv
        }
      }
    })

    it('should handle YouTube API errors gracefully', async () => {
      const req = createMockRequest({
        query: { ids: 'dQw4w9WgXcQ' }
      })
      const res = createMockResponse()

      process.env.VITE_YOUTUBE_API_KEY = 'test-key'

      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: false,
          status: 403,
          statusText: 'Forbidden'
        } as any)
      )

      await metadata(req, res)

      expect(res.status).toHaveBeenCalledWith(403)
      const data = res._getData()
      expect(data.body.error).toBeDefined()
    })

    it('should handle fetch exceptions', async () => {
      const req = createMockRequest({
        query: { ids: 'dQw4w9WgXcQ' }
      })
      const res = createMockResponse()

      process.env.VITE_YOUTUBE_API_KEY = 'test-key'

      global.fetch = vi.fn(() =>
        Promise.reject(new Error('Network error'))
      )

      await metadata(req, res)

      expect(res.status).toHaveBeenCalledWith(500)
      const data = res._getData()
      expect(data.body.error).toContain('Internal server error')
    })

    it('should return generic error messages (no details to client)', async () => {
      const req = createMockRequest({
        query: { ids: 'dQw4w9WgXcQ' }
      })
      const res = createMockResponse()

      process.env.VITE_YOUTUBE_API_KEY = 'test-key'

      global.fetch = vi.fn(() =>
        Promise.reject(new Error('Sensitive error details'))
      )

      await metadata(req, res)

      const data = res._getData()
      expect(data.body.error).not.toContain('Sensitive error details')
      expect(data.body.error).toContain('Internal server error')
    })
  })

  describe('Response Format', () => {
    it('should return correct response structure', async () => {
      const req = createMockRequest({
        query: { ids: 'dQw4w9WgXcQ' }
      })
      const res = createMockResponse()

      process.env.VITE_YOUTUBE_API_KEY = 'test-key'

      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              items: [
                {
                  id: 'dQw4w9WgXcQ',
                  snippet: {
                    title: 'Never Gonna Give You Up',
                    publishedAt: '2009-10-25T06:57:33Z'
                  },
                  statistics: {
                    viewCount: '1234567890'
                  }
                }
              ]
            })
        } as any)
      )

      await metadata(req, res)

      expect(res.status).toHaveBeenCalledWith(200)
      const data = res._getData()
      expect(data.body).toHaveProperty('videos')
      expect(data.body).toHaveProperty('timestamp')
      expect(Array.isArray(data.body.videos)).toBe(true)
      expect(data.body.videos[0]).toHaveProperty('id')
      expect(data.body.videos[0]).toHaveProperty('title')
      expect(data.body.videos[0]).toHaveProperty('views')
      expect(data.body.videos[0]).toHaveProperty('date')
    })
  })
})
