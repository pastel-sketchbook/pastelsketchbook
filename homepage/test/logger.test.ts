import { describe, it, expect, beforeEach, vi } from 'vitest'
import { logger, MetricsLogger, type LogLevel } from '../src/lib/logger'

describe('Logger utility', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.spyOn(console, 'log').mockImplementation(() => {})
  })

  describe('Logger class', () => {
    it('should log debug messages', () => {
      logger.debug('test message')
      expect(console.log).toHaveBeenCalled()
    })

    it('should log info messages', () => {
      logger.info('test message')
      expect(console.log).toHaveBeenCalled()
    })

    it('should log warning messages', () => {
      logger.warn('test message')
      expect(console.log).toHaveBeenCalled()
    })

    it('should log error messages with string', () => {
      logger.error('error occurred', 'error string')
      expect(console.log).toHaveBeenCalled()
    })

    it('should log error messages with Error object', () => {
      const error = new Error('test error')
      logger.error('error occurred', error)
      expect(console.log).toHaveBeenCalled()
    })

    it('should include metadata in logs', () => {
      logger.info('test message', { userId: '123', action: 'test' })
      expect(console.log).toHaveBeenCalled()
    })

    it('should handle multiple metadata properties', () => {
      logger.debug('test', {
        prop1: 'value1',
        prop2: 'value2',
        prop3: 123
      })
      expect(console.log).toHaveBeenCalled()
    })
  })

  describe('MetricsLogger class', () => {
    let metricsLogger: MetricsLogger

    beforeEach(() => {
      metricsLogger = new MetricsLogger()
      vi.spyOn(console, 'log').mockImplementation(() => {})
    })

    it('should record API calls', () => {
      metricsLogger.recordApiCall('GET', '/api/videos', 200, 150)
      expect(console.log).toHaveBeenCalled()
    })

    it('should record YouTube API calls', () => {
      metricsLogger.recordYouTubeApiCall(5, 200, true)
      expect(console.log).toHaveBeenCalled()
    })

    it('should record YouTube API failures', () => {
      metricsLogger.recordYouTubeApiCall(0, 100, false)
      expect(console.log).toHaveBeenCalled()
    })

    it('should record rate limit checks', () => {
      metricsLogger.recordRateLimitCheck('192.168.1.1', 10, 60, true)
      expect(console.log).toHaveBeenCalled()
    })

    it('should record fallback source usage', () => {
      metricsLogger.recordFallback('static', 'API rate limited')
      expect(console.log).toHaveBeenCalled()
    })

    it('should warn on high quota usage', () => {
      metricsLogger.recordQuotaWarning(8000, 10000, 80)
      expect(console.log).toHaveBeenCalled()
    })

    it('should not warn on low quota usage', () => {
      const logSpy = vi.spyOn(console, 'log')
      metricsLogger.recordQuotaWarning(5000, 10000, 50)
      expect(logSpy).not.toHaveBeenCalled()
    })

    it('should track different API methods', () => {
      metricsLogger.recordApiCall('POST', '/api/data', 201, 100)
      metricsLogger.recordApiCall('PUT', '/api/data', 200, 120)
      metricsLogger.recordApiCall('DELETE', '/api/data', 204, 80)
      expect(console.log).toHaveBeenCalled()
    })

    it('should track different HTTP status codes', () => {
      metricsLogger.recordApiCall('GET', '/api/test', 404, 100)
      metricsLogger.recordApiCall('GET', '/api/test', 500, 150)
      metricsLogger.recordApiCall('GET', '/api/test', 200, 50)
      expect(console.log).toHaveBeenCalled()
    })
  })

  describe('Log levels', () => {
    const levels: LogLevel[] = ['debug', 'info', 'warn', 'error']

    it('should support all log levels', () => {
      levels.forEach(level => {
        const method = level as keyof typeof logger
        expect(typeof logger[method]).toBe('function')
      })
    })
  })

  describe('Error logging with metadata', () => {
    it('should combine error and metadata', () => {
      const error = new Error('test error')
      logger.error('operation failed', error, { userId: '123' })
      expect(console.log).toHaveBeenCalled()
    })

    it('should handle null metadata gracefully', () => {
      logger.error('test error', 'error message', undefined)
      expect(console.log).toHaveBeenCalled()
    })
  })
})
