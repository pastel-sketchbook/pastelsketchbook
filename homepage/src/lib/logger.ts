/**
 * Structured logging utility for monitoring and debugging
 * Provides consistent log format with timestamps and metadata
 */

export type LogLevel = 'debug' | 'info' | 'warn' | 'error'

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
    const entry = this.format('error', message, {
      ...metadata,
      ...(error instanceof Error && {
        errorName: error.name,
        errorMessage: error.message,
        errorStack: error.stack
      }),
      ...(typeof error === 'string' && { error })
    })
    this.output(entry)
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
}
