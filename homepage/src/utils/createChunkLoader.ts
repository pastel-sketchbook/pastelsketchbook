import { lazy, ComponentType, LazyExoticComponent } from 'react'
import { logger, MetricsLogger } from '../lib/logger'

interface ChunkLoaderOptions {
  chunkName: string
  maxRetries?: number
  timeout?: number
}

/**
 * Factory function for safely loading code-split chunks with comprehensive error logging
 * Handles network failures, timeouts, and provides retry logic
 *
 * @param componentLoader - Async function that returns the component module
 * @param options - Configuration for chunk loading
 * @returns LazyExoticComponent with built-in error handling and metrics
 *
 * @example
 * const Showcase = createChunkLoader(
 *   () => import('../routes/showcase'),
 *   { chunkName: 'showcase' }
 * )
 */
export function createChunkLoader<P extends object>(
  componentLoader: () => Promise<{ default: ComponentType<P> }>,
  options: ChunkLoaderOptions
): LazyExoticComponent<ComponentType<P>> {
  const metricsLogger = MetricsLogger.getInstance()
  const { chunkName, maxRetries = 3, timeout = 10000 } = options

  let retryCount = 0

  const wrappedLoader = async () => {
    const attemptLoad = async (): Promise<{ default: ComponentType<P> }> => {
      const startTime = Date.now()
      metricsLogger.recordChunkLoadStart(chunkName)

      try {
        // Create a promise that rejects after timeout
        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(
            () => reject(new Error(`Chunk load timeout after ${timeout}ms`)),
            timeout
          )
        )

        // Race between actual load and timeout
        const result = await Promise.race([
          componentLoader(),
          timeoutPromise
        ])

        const duration = Date.now() - startTime
        metricsLogger.recordChunkLoadSuccess(chunkName, duration)

        logger.info(`Successfully loaded chunk: ${chunkName}`, {
          duration,
          retries: retryCount
        })

        return result
      } catch (error) {
        const duration = Date.now() - startTime

        if (retryCount < maxRetries) {
          retryCount++
          const backoffMs = Math.min(1000 * Math.pow(2, retryCount - 1), 5000)

          metricsLogger.recordChunkLoadError(
            chunkName,
            error instanceof Error ? error : new Error(String(error)),
            retryCount
          )

          logger.warn(`Chunk load failed, retrying in ${backoffMs}ms`, {
            chunk: chunkName,
            attempt: retryCount,
            maxRetries,
            duration
          })

          // Wait before retrying
          await new Promise(resolve => setTimeout(resolve, backoffMs))
          return attemptLoad()
        } else {
          // Max retries exceeded
          metricsLogger.recordChunkLoadError(
            chunkName,
            error instanceof Error ? error : new Error(String(error)),
            retryCount
          )

          logger.error(`Chunk load failed after ${maxRetries} retries`,
            error instanceof Error ? error : new Error(String(error)),
            {
              chunk: chunkName,
              totalDuration: duration,
              attempts: retryCount + 1
            }
          )

          throw error
        }
      }
    }

    return attemptLoad()
  }

  return lazy(wrappedLoader)
}
