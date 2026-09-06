import { Window } from 'happy-dom'
import { afterEach, beforeEach, expect, mock, spyOn } from 'bun:test'

/**
 * bun:test preload (see bunfig.toml `[test] preload`).
 *
 * Runs once before any test file is evaluated. Order matters:
 * DOM globals must exist before `@testing-library/dom` is imported
 * anywhere, because `screen` binds to `document.body` at import time.
 * For the same reason the testing-library imports below are dynamic.
 */

// happy-dom globals, GlobalRegistrator-style: window === globalThis,
// so stubbing a global (e.g. `location`) also affects `window.*`.
const win: any = new Window({ url: 'http://localhost:3000/' })
const g: any = globalThis
for (const key of Object.getOwnPropertyNames(win)) {
  if (key === 'window') continue
  if (!(key in g)) {
    try {
      g[key] = win[key]
    } catch {
      // Read-only global (e.g. crypto) — keep the runtime's own.
    }
  }
}
// Bun ships a subset of DOM globals (Event, EventTarget, ...). Force the
// happy-dom implementations so instanceof/dispatchEvent brand checks agree
// with the happy-dom nodes tests render into.
for (const key of ['Event', 'CustomEvent', 'EventTarget', 'DOMException', 'document', 'navigator']) {
  try {
    g[key] = win[key]
  } catch {
    // Read-only global — keep the runtime's own.
  }
}
// Listener functions must register on the happy-dom window, otherwise
// window.dispatchEvent would hit the runtime's native EventTarget and
// reject happy-dom events with ERR_INVALID_ARG_TYPE.
g.addEventListener = win.addEventListener.bind(win)
g.removeEventListener = win.removeEventListener.bind(win)
g.dispatchEvent = win.dispatchEvent.bind(win)
g.window = g
g.self = g

// happy-dom implements Element.animate with real (async) WAAPI semantics:
// cancelled animations reject with AbortError, which bun:test attributes
// to whichever test happens to be running. Stub it — tests assert DOM
// state, not animation frames.
const inertAnimation = () => ({
  finished: Promise.resolve(),
  ready: Promise.resolve(),
  cancel() {},
  play() {},
  pause() {},
  reverse() {},
  finish() {},
  commitStyles() {},
  persist() {},
  onfinish: null,
  oncancel: null,
  onremove: null,
  playState: 'finished',
  pending: false,
  currentTime: 0,
  startTime: 0,
  playbackRate: 1,
  id: '',
  timeline: null,
  effect: null,
  addEventListener() {},
  removeEventListener() {},
  dispatchEvent() {
    return true
  }
})
for (const proto of [g.Element?.prototype, g.HTMLElement?.prototype, g.SVGElement?.prototype]) {
  if (proto) {
    try {
      proto.animate = function () {
        return inertAnimation()
      }
    } catch {
      // Non-configurable — keep the native implementation.
    }
  }
}

// Dynamic imports AFTER globals exist (see note above).
const matchers = await import('@testing-library/jest-dom/matchers')
;(expect as any).extend(matchers)
const { cleanup } = await import('@testing-library/react')

/**
 * Assign a mock to `global.fetch` without triggering TS2741.
 *
 * Bun types declare a `fetch` namespace with a `preconnect` static method,
 * so `global.fetch = mock(...)` fails because the mock doesn't carry that
 * property. This helper encapsulates the single `as any` cast so every
 * test file can call `mockFetch(mock(...))` instead.
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
    str.includes('The operation was aborted') ||
    str.includes('animation was canceled')
  ) {
    return true
  }
  return originalStderrWrite(chunk, ...args)
}) as typeof process.stderr.write

// Suppress framer-motion / motion-dom AbortError unhandled rejections in happy-dom
// These originate from animation cancellation during component unmount and are not test failures.
if (typeof window !== 'undefined') {
  window.addEventListener('unhandledrejection', (event: PromiseRejectionEvent) => {
    const reason: any = (event as any).reason
    const msg = reason?.message ?? String(reason ?? '')
    const name = reason?.name ?? ''
    if (
      name === 'AbortError' ||
      msg.includes('animation was canceled') ||
      msg.includes('The operation was aborted') ||
      msg.includes('AbortError')
    ) {
      event.preventDefault()
    }
  })
}
if (typeof process !== 'undefined' && (process as any).on) {
  // Prevent the runner from exiting on these rejections during tests
  ;(process as any).on('unhandledRejection', (reason: any) => {
    const msg = reason?.message ?? String(reason ?? '')
    const name = reason?.name ?? ''
    if (
      name === 'AbortError' ||
      msg.includes('animation was canceled') ||
      msg.includes('The operation was aborted') ||
      msg.includes('AbortError')
    ) {
      return
    }
  })
}

// Global console mock setup - silence console output during tests
beforeEach(() => {
  spyOn(console, 'log').mockImplementation(() => {})
  spyOn(console, 'warn').mockImplementation(() => {})
  spyOn(console, 'error').mockImplementation(() => {})
  spyOn(console, 'info').mockImplementation(() => {})
  spyOn(console, 'debug').mockImplementation(() => {})
})

afterEach(() => {
  cleanup()
  mock.restore()
})

// Plain no-op observers (not mock() instances, so mock.restore() can't clear them).
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

class IntersectionObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

g.ResizeObserver = ResizeObserverMock
g.IntersectionObserver = IntersectionObserverMock

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
  mock((url: string) => {
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
