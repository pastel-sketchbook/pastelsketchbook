import { expect, afterEach, vi, beforeEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'

extendExpect(expect, matchers)

/**
 * Assign a mock to `global.fetch` without triggering TS2741.
 *
 * Bun types declare a `fetch` namespace with a `preconnect` static method,
 * so `global.fetch = vi.fn(...)` fails because `vi.fn()` doesn't carry that
 * property. This helper encapsulates the single `as any` cast so every
 * test file can call `mockFetch(vi.fn(...))` instead.
 */
// biome-ignore lint/suspicious/noExplicitAny: single cast to work around Bun fetch namespace
export function mockFetch(fn: any): void {
  ;(global as any).fetch = fn
}

// Suppress happy-dom DOMException noise from iframe/fetch teardowns
const originalStderrWrite = process.stderr.write.bind(process.stderr)
process.stderr.write = ((chunk: any, ...args: any[]) => {
  const str = typeof chunk === 'string' ? chunk : chunk?.toString?.() ?? ''
  if (
    str.includes('DOMException') ||
    str.includes('AbortError') ||
    str.includes('NetworkError') ||
    str.includes('The operation was aborted')
  ) {
    return true
  }
  return originalStderrWrite(chunk, ...args)
}) as typeof process.stderr.write

// Global console mock setup - silence console output during tests
beforeEach(() => {
  vi.spyOn(console, 'log').mockImplementation(() => {})
  vi.spyOn(console, 'warn').mockImplementation(() => {})
  vi.spyOn(console, 'error').mockImplementation(() => {})
  vi.spyOn(console, 'info').mockImplementation(() => {})
  vi.spyOn(console, 'debug').mockImplementation(() => {})
})

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

class ResizeObserverMock {
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
}

class IntersectionObserverMock {
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
}

global.ResizeObserver = ResizeObserverMock as any
global.IntersectionObserver = IntersectionObserverMock as any

// Mock fetch for API route testing
const mockVideoMetadata = {
  videos: [
    {
      id: 'V2cZl5s4EKU',
      title: 'Test Video 1',
      views: 100,
      date: '2025-12-26T23:35:15Z'
    },
    {
      id: 'L9sxbq8ugoU',
      title: 'Test Video 2',
      views: 50,
      date: '2026-01-01T19:49:51Z'
    }
  ],
  timestamp: new Date().toISOString()
}

mockFetch(
  vi.fn((url: string) => {
    if (url.includes('/api/videos/metadata')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockVideoMetadata)
      })
    }
    if (url.includes('/videos-metadata.json')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ videos: mockVideoMetadata.videos })
      })
    }
    return Promise.reject(new Error('Not mocked'))
  })
)

function extendExpect(expect: any, matchers: any) {
  Object.keys(matchers).forEach((key) => {
    expect.extend({ [key]: matchers[key] })
  })
}
