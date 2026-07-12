import { describe, it, expect } from 'vitest'
import {
  isYouTubeShort,
  parseIso8601Duration,
  SHORTS_MAX_DURATION_SEC,
  SHORTS_MAX_TRANSCRIPT_BYTES,
} from '../src/lib/youtube-shorts'

describe('parseIso8601Duration', () => {
  it('parses seconds only', () => {
    expect(parseIso8601Duration('PT79S')).toBe(79)
  })

  it('parses minutes and seconds', () => {
    expect(parseIso8601Duration('PT1M19S')).toBe(79)
    expect(parseIso8601Duration('PT16M14S')).toBe(974)
  })

  it('parses hours', () => {
    expect(parseIso8601Duration('PT1H2M3S')).toBe(3723)
  })

  it('returns null for missing or invalid', () => {
    expect(parseIso8601Duration(null)).toBeNull()
    expect(parseIso8601Duration(undefined)).toBeNull()
    expect(parseIso8601Duration('')).toBeNull()
    expect(parseIso8601Duration('not-a-duration')).toBeNull()
  })
})

describe('isYouTubeShort', () => {
  it('classifies duration < 2 min as Short (authoritative, no title tags needed)', () => {
    // Real Shorts on this channel — no hashtags required
    expect(isYouTubeShort({ durationSec: 79 })).toBe(true) // NhGHlAx9Md8 tower middleware
    expect(isYouTubeShort({ durationSec: 78 })).toBe(true) // aLDQbPWIcjg SOMA
    expect(isYouTubeShort({ durationSec: 85 })).toBe(true)
    expect(isYouTubeShort({ durationSec: 119 })).toBe(true) // just under 2 min
    expect(isYouTubeShort({ durationIso: 'PT1M19S' })).toBe(true)
  })

  it('classifies duration ≥ 2 min as full video', () => {
    expect(isYouTubeShort({ durationSec: 120 })).toBe(false) // exactly 2 min
    expect(isYouTubeShort({ durationSec: 181 })).toBe(false)
    expect(isYouTubeShort({ durationSec: 545 })).toBe(false)
    expect(isYouTubeShort({ durationSec: 974 })).toBe(false) // OTE2dxAJkWg
    expect(isYouTubeShort({ durationIso: 'PT16M14S' })).toBe(false)
  })

  it('prefers duration over misleading title tags', () => {
    // Full video that happens to have hashtags → still full
    expect(
      isYouTubeShort({
        durationSec: 900,
        title: 'Deep Dive #science #softwarearchitect #smartphone',
      })
    ).toBe(false)

    // Short without hashtags → still short
    expect(
      isYouTubeShort({
        durationSec: 79,
        title: 'How to Structure Rust Tower Middleware',
      })
    ).toBe(true)
  })

  it('falls back to transcript size when duration unknown', () => {
    expect(isYouTubeShort({ transcriptBytes: 1800 })).toBe(true)
    expect(isYouTubeShort({ transcriptBytes: SHORTS_MAX_TRANSCRIPT_BYTES - 1 })).toBe(true)
    expect(isYouTubeShort({ transcriptBytes: 10_000 })).toBe(false)
    expect(isYouTubeShort({ transcriptBytes: SHORTS_MAX_TRANSCRIPT_BYTES })).toBe(false)
  })

  it('falls back to legacy title tags only when duration and transcript unknown', () => {
    expect(
      isYouTubeShort({
        title: 'How Flutter Layout Actually Works #science #softwarearchitect #smartphone',
      })
    ).toBe(true)
    expect(isYouTubeShort({ title: 'How SOMA Unifies 3D Characters' })).toBe(false)
  })

  it('returns false when no signals present', () => {
    expect(isYouTubeShort({})).toBe(false)
    expect(isYouTubeShort({ title: '' })).toBe(false)
  })

  it('exposes SHORTS_MAX_DURATION_SEC as 120 (under 2 minutes)', () => {
    expect(SHORTS_MAX_DURATION_SEC).toBe(120)
  })
})
