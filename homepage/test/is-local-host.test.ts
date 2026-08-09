import { describe, expect, it, vi } from 'vitest'
import { isLocalAppHost } from '../src/lib/is-local-host'

describe('isLocalAppHost', () => {
  it('returns true in Vite dev mode', () => {
    vi.stubGlobal('import', { meta: { env: { DEV: true } } })
    expect(isLocalAppHost()).toBe(true)
  })

  it('returns true for localhost when not in dev mode', () => {
    vi.stubEnv('DEV', false)
    vi.stubGlobal('location', { hostname: 'localhost' })
    expect(isLocalAppHost()).toBe(true)
  })

  it('returns false for production hostnames', () => {
    vi.stubEnv('DEV', false)
    vi.stubGlobal('location', { hostname: 'pastel-sketchbook.vercel.app' })
    expect(isLocalAppHost()).toBe(false)
  })
})
