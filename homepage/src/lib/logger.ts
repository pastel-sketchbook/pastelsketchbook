/**
 * Structured logging utility for monitoring and debugging
 * Provides consistent log format with timestamps and metadata
 * Includes specialized tracking for chunk loading, API calls, and errors
 */

export type LogLevel = 'debug' | 'info' | 'warn' | 'error'
export type ErrorType = 'chunk_load' | 'runtime' | 'api' | 'network' | 'unknown'

export interface LogEntry {
  timestamp: string
  level: LogLevel
  message: string
  metadata?: Record<string, any>
  stack?: string
}

class Logger {
  private isDevelopment = typeof process !== 'undefined' && process.env.NODE_ENV === 'development'

  private format(level: LogLevel, message: string, metadata?: Record<string, any>): LogEntry {
    return {
      timestamp: new Date().toISOString(),
      level,
      message,
      ...(metadata && { metadata }),
      ...(this.isDevelopment && { stack: new Error().stack })
    }
  }

  private output(entry: LogEntry) {
    // In development, pretty print
    if (this.isDevelopment) {
      const color = this.getColor(entry.level)
      console.log(
        `${color}[${entry.timestamp}] ${entry.level.toUpperCase()}${'\x1b[0m'} ${entry.message}`,
        entry.metadata || ''
      )
    } else {
      // In production, JSON output for log aggregation
      console.log(JSON.stringify(entry))
    }
  }

  private getColor(level: LogLevel): string {
    const colors: Record<LogLevel, string> = {
      debug: '\x1b[36m', // cyan
      info: '\x1b[32m', // green
      warn: '\x1b[33m', // yellow
      error: '\x1b[31m' // red
    }
    return colors[level]
  }

  debug(message: string, metadata?: Record<string, any>) {
    const entry = this.format('debug', message, metadata)
    this.output(entry)
  }

  info(message: string, metadata?: Record<string, any>) {
    const entry = this.format('info', message, metadata)
    this.output(entry)
  }

  warn(message: string, metadata?: Record<string, any>) {
    const entry = this.format('warn', message, metadata)
    this.output(entry)
  }

  error(message: string, error?: Error | string, metadata?: Record<string, any>) {
    const errorType = this.detectErrorType(error)
    const entry = this.format('error', message, {
      ...metadata,
      errorType,
      ...(error instanceof Error && {
        errorName: error.name,
        errorMessage: error.message,
        errorStack: error.stack
      }),
      ...(typeof error === 'string' && { error })
    })
    this.output(entry)
  }

  private detectErrorType(error?: Error | string): ErrorType {
    if (!error) return 'unknown'
    const message = error instanceof Error ? error.message : error
    
    if (message.includes('Failed to fetch') || message.includes('NetworkError'))
      return 'network'
    if (message.includes('chunk') || message.includes('dynamic import'))
      return 'chunk_load'
    if (message.includes('API') || message.includes('fetch'))
      return 'api'
    
    return 'runtime'
  }
}

export const logger = new Logger()

/**
 * Logger specifically for API metrics
 */
export class MetricsLogger {
  private startTime: number

  constructor() {
    this.startTime = Date.now()
  }

  recordApiCall(method: string, endpoint: string, statusCode: number, duration: number) {
    logger.info('API call', {
      method,
      endpoint,
      statusCode,
      durationMs: duration
    })
  }

  recordYouTubeApiCall(videoCount: number, duration: number, success: boolean) {
    logger.info('YouTube API request', {
      videoCount,
      durationMs: duration,
      success
    })
  }

  recordRateLimitCheck(ip: string, requestCount: number, maxRequests: number, allowed: boolean) {
    logger.debug('Rate limit check', {
      ip,
      requestCount,
      maxRequests,
      allowed
    })
  }

  recordFallback(source: 'api' | 'static' | 'placeholder', reason?: string) {
    logger.warn('Using fallback source', {
      source,
      reason
    })
  }

  recordQuotaWarning(estimatedUsage: number, dailyLimit: number, percentUsed: number) {
    if (percentUsed > 70) {
      logger.warn('High YouTube API quota usage', {
        estimatedUsage,
        dailyLimit,
        percentUsed: `${percentUsed}%`
      })
    }
  }

  recordChunkLoadStart(chunkName: string) {
    logger.debug('Chunk load started', {
      chunk: chunkName,
      timestamp: Date.now()
    })
  }

  recordChunkLoadSuccess(chunkName: string, duration: number) {
    logger.info('Chunk loaded successfully', {
      chunk: chunkName,
      durationMs: duration
    })
  }

  recordChunkLoadError(chunkName: string, error: Error, retry?: number) {
    logger.error('Chunk load failed', error, {
      chunk: chunkName,
      errorType: 'chunk_load',
      attemptNumber: retry || 1,
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown'
    })
  }

  recordErrorBoundaryActivation(componentName: string, error: Error) {
    logger.error('Error boundary activated', error, {
      component: componentName,
      errorType: 'runtime'
    })
  }
}
