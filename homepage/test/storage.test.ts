import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import type { SparkResult } from '../types'

const STORAGE_KEY = 'pastel_sketchbook_sparks'

describe('localStorage persistence', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
  })

  it('should save and retrieve sparks from localStorage', () => {
    const sparks: SparkResult[] = [
      {
        topic: 'Learning Spanish',
        creation: 'Create YouTube videos teaching Spanish',
        platform: 'YouTube',
        impact: 'Build audience and generate revenue',
      },
    ]

    localStorage.setItem(STORAGE_KEY, JSON.stringify(sparks))
    const retrieved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')

    expect(retrieved).toEqual(sparks)
  })

  it('should handle empty localStorage', () => {
    const retrieved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    expect(retrieved).toEqual([])
  })

  it('should append new sparks to existing ones', () => {
    const existingSparks: SparkResult[] = [
      {
        topic: 'Quantum Physics',
        creation: 'Write blog posts',
        platform: 'Medium',
        impact: 'Educate community',
      },
    ]

    localStorage.setItem(STORAGE_KEY, JSON.stringify(existingSparks))

    const newSpark: SparkResult = {
      topic: 'Vegan Baking',
      creation: 'Create recipe videos',
      platform: 'YouTube',
      impact: 'Share plant-based cooking',
    }

    const updated = [newSpark, ...existingSparks]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))

    const retrieved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    expect(retrieved).toEqual(updated)
  })

  it('should remove spark by id', () => {
    const sparks = [
      { id: '1', topic: 'Topic 1', creation: 'Creation 1', platform: 'Platform 1', impact: 'Impact 1', date: 1 },
      { id: '2', topic: 'Topic 2', creation: 'Creation 2', platform: 'Platform 2', impact: 'Impact 2', date: 2 },
      { id: '3', topic: 'Topic 3', creation: 'Creation 3', platform: 'Platform 3', impact: 'Impact 3', date: 3 },
    ]

    localStorage.setItem(STORAGE_KEY, JSON.stringify(sparks))

    const updated = sparks.filter((s) => s.id !== '2')
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))

    const retrieved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    expect(retrieved).toHaveLength(2)
    expect(retrieved[0].id).toBe('1')
    expect(retrieved[1].id).toBe('3')
  })

  it('should handle malformed JSON gracefully', () => {
    localStorage.setItem(STORAGE_KEY, 'invalid json')

    const result = () => JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    expect(result).toThrow()
  })
})
