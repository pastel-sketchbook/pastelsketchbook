import { describe, it, expect } from 'vitest'
import type { SparkResult } from '../types'

describe('SparkResult type', () => {
  it('should have required properties', () => {
    const spark: SparkResult = {
      topic: 'Test Topic',
      creation: 'Test Creation',
      platform: 'Test Platform',
      impact: 'Test Impact',
    }

    expect(spark.topic).toBe('Test Topic')
    expect(spark.creation).toBe('Test Creation')
    expect(spark.platform).toBe('Test Platform')
    expect(spark.impact).toBe('Test Impact')
  })

  it('should accept string values for all properties', () => {
    const spark: SparkResult = {
      topic: '',
      creation: '',
      platform: '',
      impact: '',
    }

    expect(typeof spark.topic).toBe('string')
    expect(typeof spark.creation).toBe('string')
    expect(typeof spark.platform).toBe('string')
    expect(typeof spark.impact).toBe('string')
  })
})

describe('isSparkResult type guard', () => {
  function isSparkResult(data: unknown): data is SparkResult {
    return (
      typeof data === 'object' &&
      data !== null &&
      'topic' in data &&
      typeof data.topic === 'string' &&
      'creation' in data &&
      typeof data.creation === 'string' &&
      'platform' in data &&
      typeof data.platform === 'string' &&
      'impact' in data &&
      typeof data.impact === 'string'
    )
  }

  it('should return true for valid SparkResult', () => {
    const validData = {
      topic: 'Test',
      creation: 'Test',
      platform: 'Test',
      impact: 'Test',
    }

    expect(isSparkResult(validData)).toBe(true)
  })

  it('should return false for invalid data', () => {
    expect(isSparkResult(null)).toBe(false)
    expect(isSparkResult(undefined)).toBe(false)
    expect(isSparkResult({})).toBe(false)
    expect(isSparkResult({ topic: 'test' })).toBe(false)
    expect(isSparkResult({ topic: 123, creation: '', platform: '', impact: '' })).toBe(false)
  })

  it('should narrow type correctly', () => {
    const unknownData: unknown = {
      topic: 'Test',
      creation: 'Test',
      platform: 'Test',
      impact: 'Test',
    }

    if (isSparkResult(unknownData)) {
      expect(unknownData.topic.toUpperCase()).toBe('TEST')
    } else {
      throw new Error('Type guard failed')
    }
  })
})
