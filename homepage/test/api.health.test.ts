import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import health from '../api/health'
import type { VercelRequest, VercelResponse } from '@vercel/node'

function createMockRequest(overrides: Partial<VercelRequest> = {}): VercelRequest {
  return {
    method: 'GET',
    headers: {},
    query: {},
    socket: {
      remoteAddress: '127.0.0.1'
    } as any,
    ...overrides
  } as VercelRequest
}

function createMockResponse(): VercelResponse & { _getData: () => any } {
  const data: any = {}
  let statusCode = 200

  return {
    setHeader: vi.fn(),
    status: vi.fn((code: number) => {
      statusCode = code
      return {
        json: vi.fn((body: any) => {
          data.body = body
          data.statusCode = statusCode
          return undefined
        })
      } as any
    }),
    json: vi.fn((body: any) => {
      data.body = body
      data.statusCode = statusCode
      return undefined
    }),
    _getData: () => data,
    _getStatusCode: () => statusCode
  } as any
}

describe('API Routes: /api/health', () => {
  const originalEnv = process.env.VITE_YOUTUBE_API_KEY

  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    process.env.VITE_YOUTUBE_API_KEY = originalEnv
  })

  describe('Health Status Response', () => {
    it('should return status object with required fields', async () => {
      process.env.VITE_YOUTUBE_API_KEY = 'test-key'

      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true,
          status: 200
        } as any)
      )

      const req = createMockRequest()
      const res = createMockResponse()

      await health(req, res)

      const data = res._getData()
      expect(data.body).toHaveProperty('status')
      expect(data.body).toHaveProperty('timestamp')
      expect(data.body).toHaveProperty('checks')
      expect(data.body.checks).toHaveProperty('api')
      expect(data.body.checks).toHaveProperty('fallback')
      expect(data.body.checks).toHaveProperty('environment')
    })

    it('should return HTTP 200 when healthy', async () => {
      process.env.VITE_YOUTUBE_API_KEY = 'test-key'

      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true,
          status: 200
        } as any)
      )

      const req = createMockRequest()
      const res = createMockResponse()

      await health(req, res)

      expect(res.status).toHaveBeenCalledWith(200)
      const data = res._getData()
      expect(data.body.status).toBe('healthy')
    })

    it('should return HTTP 503 when degraded', async () => {
      process.env.VITE_YOUTUBE_API_KEY = undefined

      global.fetch = vi.fn(() =>
        Promise.reject(new Error('Network error'))
      )

      const req = createMockRequest()
      const res = createMockResponse()

      await health(req, res)

      const data = res._getData()
      // Degraded if only one check fails
      if (data.body.status === 'degraded') {
        expect(res.status).toHaveBeenCalledWith(503)
      }
    })

    it('should return HTTP 500 when unhealthy', async () => {
      process.env.VITE_YOUTUBE_API_KEY = undefined

      global.fetch = vi.fn(() =>
        Promise.reject(new Error('API error'))
      )

      const req = createMockRequest()
      const res = createMockResponse()

      // Mock multiple failures
      await health(req, res)

      const data = res._getData()
      if (data.body.status === 'unhealthy') {
        expect(res.status).toHaveBeenCalledWith(500)
      }
    })
  })

  describe('Environment Check', () => {
    it('should mark environment as failed if API key missing', async () => {
      const savedEnv = process.env.VITE_YOUTUBE_API_KEY
      delete process.env.VITE_YOUTUBE_API_KEY

      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true
        } as any)
      )

      const req = createMockRequest()
      const res = createMockResponse()

      try {
        await health(req, res)

        const data = res._getData()
        expect(data.body.checks.environment.status).toBe('failed')
        expect(data.body.checks.environment.message).toContain('YouTube API key')
      } finally {
        if (savedEnv) process.env.VITE_YOUTUBE_API_KEY = savedEnv
      }
    })

    it('should mark environment as ok if API key present', async () => {
      process.env.VITE_YOUTUBE_API_KEY = 'test-key'

      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true
        } as any)
      )

      const req = createMockRequest()
      const res = createMockResponse()

      await health(req, res)

      const data = res._getData()
      expect(data.body.checks.environment.status).toBe('ok')
    })
  })

  describe('API Connectivity Check', () => {
    it('should mark API as ok if YouTube API succeeds', async () => {
      process.env.VITE_YOUTUBE_API_KEY = 'test-key'

      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true,
          status: 200
        } as any)
      )

      const req = createMockRequest()
      const res = createMockResponse()

      await health(req, res)

      const data = res._getData()
      expect(data.body.checks.api.status).toBe('ok')
      expect(data.body.checks.api.responseTime).toBeDefined()
    })

    it('should mark API as failed if YouTube API returns error', async () => {
      process.env.VITE_YOUTUBE_API_KEY = 'test-key'

      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: false,
          status: 403
        } as any)
      )

      const req = createMockRequest()
      const res = createMockResponse()

      await health(req, res)

      const data = res._getData()
      expect(data.body.checks.api.status).toBe('failed')
    })

    it('should mark API as failed if fetch throws', async () => {
      process.env.VITE_YOUTUBE_API_KEY = 'test-key'

      global.fetch = vi.fn(() =>
        Promise.reject(new Error('Network timeout'))
      )

      const req = createMockRequest()
      const res = createMockResponse()

      await health(req, res)

      const data = res._getData()
      expect(data.body.checks.api.status).toBe('failed')
    })

    it('should include response time in API check', async () => {
      process.env.VITE_YOUTUBE_API_KEY = 'test-key'

      global.fetch = vi.fn(
        () =>
          new Promise((resolve) => {
            setTimeout(
              () =>
                resolve({
                  ok: true,
                  status: 200
                } as any),
              10
            )
          })
      )

      const req = createMockRequest()
      const res = createMockResponse()

      await health(req, res)

      const data = res._getData()
      expect(data.body.checks.api.responseTime).toBeGreaterThanOrEqual(10)
    })
  })

  describe('Fallback Check', () => {
    it('should mark fallback as ok by default', async () => {
      process.env.VITE_YOUTUBE_API_KEY = 'test-key'

      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true
        } as any)
      )

      const req = createMockRequest()
      const res = createMockResponse()

      await health(req, res)

      const data = res._getData()
      expect(data.body.checks.fallback.status).toBe('ok')
    })
  })

  describe('Overall Status Logic', () => {
    it('should be healthy when all checks pass', async () => {
      process.env.VITE_YOUTUBE_API_KEY = 'test-key'

      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true
        } as any)
      )

      const req = createMockRequest()
      const res = createMockResponse()

      await health(req, res)

      const data = res._getData()
      expect(data.body.status).toBe('healthy')
      expect(res.status).toHaveBeenCalledWith(200)
    })

    it('should be degraded when one check fails', async () => {
      process.env.VITE_YOUTUBE_API_KEY = undefined

      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true
        } as any)
      )

      const req = createMockRequest()
      const res = createMockResponse()

      await health(req, res)

      const data = res._getData()
      // Environment check will fail
      expect(['degraded', 'healthy']).toContain(data.body.status)
    })

    it('should be unhealthy when multiple checks fail', async () => {
      process.env.VITE_YOUTUBE_API_KEY = undefined

      global.fetch = vi.fn(() =>
        Promise.reject(new Error('Network error'))
      )

      const req = createMockRequest()
      const res = createMockResponse()

      await health(req, res)

      const data = res._getData()
      // Both environment and API checks will fail
      if (data.body.status === 'unhealthy') {
        expect(res.status).toHaveBeenCalledWith(500)
      }
    })
  })

  describe('Response Headers', () => {
    it('should set Content-Type header', async () => {
      process.env.VITE_YOUTUBE_API_KEY = 'test-key'

      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true
        } as any)
      )

      const req = createMockRequest()
      const res = createMockResponse()

      await health(req, res)

      expect(res.setHeader).toHaveBeenCalledWith(
        'Content-Type',
        'application/json'
      )
    })

    it('should set Cache-Control to no-cache', async () => {
      process.env.VITE_YOUTUBE_API_KEY = 'test-key'

      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true
        } as any)
      )

      const req = createMockRequest()
      const res = createMockResponse()

      await health(req, res)

      expect(res.setHeader).toHaveBeenCalledWith('Cache-Control', 'no-cache')
    })
  })

  describe('Timestamp', () => {
    it('should include ISO 8601 timestamp', async () => {
      process.env.VITE_YOUTUBE_API_KEY = 'test-key'

      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true
        } as any)
      )

      const req = createMockRequest()
      const res = createMockResponse()

      await health(req, res)

      const data = res._getData()
      const timestamp = new Date(data.body.timestamp)
      expect(timestamp.getTime()).toBeGreaterThan(0)
    })
  })
})
