import { describe, expect, it, afterEach } from 'bun:test'
import { isLocalAppHost } from '../src/lib/is-local-host'

describe('isLocalAppHost', () => {
  const originalDev = process.env.DEV
  // biome-ignore lint/suspicious/noExplicitAny: hostname stub needs a partial Location
  const originalLocation: any = globalThis.location

  afterEach(() => {
    if (originalDev === undefined) {
      delete process.env.DEV
    } else {
      process.env.DEV = originalDev
    }
    ;(globalThis as any).location = originalLocation
  })

  it('returns true in dev mode', () => {
    // import.meta.env aliases process.env under bun:test
    process.env.DEV = 'true'
    expect(isLocalAppHost()).toBe(true)
  })

  it('returns true for localhost when not in dev mode', () => {
    delete process.env.DEV
    // window === globalThis (see test/setup.ts), so this also sets window.location
    ;(globalThis as any).location = { hostname: 'localhost' }
    expect(isLocalAppHost()).toBe(true)
  })

  it('returns false for production hostnames', () => {
    delete process.env.DEV
    ;(globalThis as any).location = { hostname: 'pastel-sketchbook.vercel.app' }
    expect(isLocalAppHost()).toBe(false)
  })
})
