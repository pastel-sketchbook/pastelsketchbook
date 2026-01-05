import { expect, afterEach, vi, beforeEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'

extendExpect(expect, matchers)

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

global.fetch = vi.fn((url: string) => {
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
}) as any

function extendExpect(expect: any, matchers: any) {
  Object.keys(matchers).forEach((key) => {
    expect.extend({ [key]: matchers[key] })
  })
}
