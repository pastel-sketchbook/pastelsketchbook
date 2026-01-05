import { ComponentType, LazyExoticComponent } from 'react'
import { createChunkLoader } from '../utils/createChunkLoader'

interface ChunkLoaderOptions {
  chunkName: string
  maxRetries?: number
  timeout?: number
}

/**
 * Hook for safely loading code-split chunks with comprehensive error logging
 * Wraps the createChunkLoader utility for use within React components
 *
 * @param componentLoader - Async function that returns the component module
 * @param options - Configuration for chunk loading
 * @returns LazyExoticComponent with built-in error handling and metrics
 *
 * @deprecated Use createChunkLoader directly instead. This hook is kept for backward compatibility
 * but will be removed in a future version. Consider using createChunkLoader in your routes.
 *
 * @example
 * // Old way (deprecated)
 * const Showcase = useChunkLoader(
 *   () => import('../routes/showcase'),
 *   { chunkName: 'showcase' }
 * )
 *
 * // New way (recommended)
 * const Showcase = createChunkLoader(
 *   () => import('../routes/showcase'),
 *   { chunkName: 'showcase' }
 * )
 */
export function useChunkLoader<P extends object>(
  componentLoader: () => Promise<{ default: ComponentType<P> }>,
  options: ChunkLoaderOptions
): LazyExoticComponent<ComponentType<P>> {
  return createChunkLoader(componentLoader, options)
}
