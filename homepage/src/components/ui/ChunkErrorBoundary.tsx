import React, { Component, ErrorInfo, ReactNode } from 'react'
import { SketchBox } from './SketchBox'
import { logger, MetricsLogger } from '../../lib/logger'
import { v7 as uuidv7 } from 'uuid'

interface Props {
  children: ReactNode
  chunkName: string
  fallback?: ReactNode
  onRetry?: () => void
}

interface State {
  hasError: boolean
  retryCount: number
  isRetrying: boolean
  errorId: string
}

/**
 * Error boundary specifically designed for lazy-loaded route chunks
 * Handles network failures, slow connections, and provides retry logic
 */
export class ChunkErrorBoundary extends Component<Props, State> {
  private metricsLogger: MetricsLogger | null = null
  private retryTimeout: ReturnType<typeof setTimeout> | null = null
  private chunkStartTime: number | null = null

  public state: State = {
    hasError: false,
    retryCount: 0,
    isRetrying: false,
    errorId: ''
  }

  componentDidMount() {
    this.chunkStartTime = Date.now()
    this.metricsLogger = MetricsLogger.getInstance()
    this.metricsLogger.recordChunkLoadStart(this.props.chunkName)
  }

  componentDidUpdate(_prevProps: Props, prevState: State) {
    // Log successful chunk load
    if (prevState.hasError && !this.state.hasError && this.chunkStartTime) {
      const duration = Date.now() - this.chunkStartTime
      this.metricsLogger?.recordChunkLoadSuccess(
        this.props.chunkName,
        duration
      )
    }
  }

  componentWillUnmount() {
    if (this.retryTimeout) {
      clearTimeout(this.retryTimeout)
    }
  }

  public static getDerivedStateFromError(): Partial<State> {
    return {
      hasError: true,
      retryCount: 0,
      isRetrying: false,
      errorId: uuidv7()
    }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const isChunkError =
      error.message.includes('Failed to fetch') ||
      error.message.includes('dynamically imported module') ||
      error.message.includes('chunk')

    this.metricsLogger?.recordChunkLoadError(
      this.props.chunkName,
      error,
      this.state.retryCount,
      this.state.errorId
    )

    logger.error(`Chunk load error for ${this.props.chunkName}`, error, {
      componentStack: errorInfo.componentStack,
      isChunkError,
      retryCount: this.state.retryCount
    })
  }

  private handleRetry = () => {
    const nextRetry = this.state.retryCount + 1

    // Max 3 retries with exponential backoff
    if (nextRetry > 3) {
      logger.error('Chunk load failed after max retries', new Error('Max retries exceeded'), {
        chunk: this.props.chunkName,
        maxRetries: 3
      })
      return
    }

    const backoffMs = Math.min(1000 * Math.pow(2, nextRetry - 1), 5000)

    logger.info('Retrying chunk load', {
      chunk: this.props.chunkName,
      attempt: nextRetry,
      backoffMs
    })

    this.setState({ isRetrying: true })

    this.retryTimeout = setTimeout(() => {
      this.setState({
        hasError: false,
        retryCount: nextRetry,
        isRetrying: false
      })
      this.props.onRetry?.()
    }, backoffMs)
  }

  private handleGoHome = () => {
    window.location.href = '/'
  }

  public render() {
    if (this.state.isRetrying) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-pastel-bg">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 mb-4">
              <div
                className="w-8 h-8 border-4 border-pastel-medium border-t-pastel-terracotta rounded-full animate-spin"
                aria-live="polite"
                aria-label="Retrying page load"
              />
            </div>
            <p className="text-pastel-dark font-serif text-sm">Retrying load...</p>
          </div>
        </div>
      )
    }

    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="bg-pastel-bg min-h-screen flex items-center justify-center p-4">
          <SketchBox className="bg-amber-50 p-8 text-center max-w-md">
            <span className="text-5xl mb-4 block">🌾</span>
            <h2 className="text-2xl font-bold text-amber-900 mb-2 font-serif">
              The page is resting
            </h2>
            <p className="text-amber-700 font-serif italic mb-6">
              We had trouble loading the <span className="font-semibold">{this.props.chunkName}</span> page.
              {' '}
              {this.state.retryCount > 0 &&
                `We've tried ${this.state.retryCount} time${this.state.retryCount > 1 ? 's' : ''}.`}
            </p>

            {this.state.retryCount < 3 && (
              <>
                <p className="text-sm text-amber-600 mb-4">
                  {this.state.retryCount === 0
                    ? 'This usually happens when your connection is slow.'
                    : 'Retrying might help if your connection improves.'}
                </p>
                <button
                  onClick={this.handleRetry}
                  className="w-full mb-3 px-4 py-2 bg-pastel-medium text-white font-semibold rounded hover:bg-[#4a6a54] transition-colors"
                  aria-label={`Retry loading ${this.props.chunkName} page (attempt ${this.state.retryCount + 1})`}
                >
                  Try Again
                </button>
              </>
            )}

            <button
              onClick={this.handleGoHome}
              className="w-full px-4 py-2 bg-pastel-yellow/20 text-pastel-dark font-semibold rounded hover:bg-pastel-yellow/30 transition-colors"
              aria-label="Return to homepage"
            >
              Go Home
            </button>

            <p className="text-xs text-amber-600 mt-4 font-mono">
              Error ID: {this.state.errorId.slice(0, 8).toUpperCase()}
            </p>
          </SketchBox>
        </div>
      )
    }

    return this.props.children
  }
}
