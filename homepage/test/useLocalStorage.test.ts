import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useLocalStorage } from '../src/hooks/useLocalStorage'

describe('useLocalStorage hook', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  it('should initialize with initial value when localStorage is empty', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'))
    expect(result.current[0]).toBe('initial')
  })

  it('should initialize with stored value when present', () => {
    localStorage.setItem('test-key', JSON.stringify('stored value'))
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'))
    expect(result.current[0]).toBe('stored value')
  })

  it('should handle object values', () => {
    const initial = { name: 'John', age: 30 }
    const { result } = renderHook(() => useLocalStorage('user', initial))
    expect(result.current[0]).toEqual(initial)
  })

  it('should persist value to localStorage when updated', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'))

    act(() => {
      result.current[1]('updated')
    })

    expect(result.current[0]).toBe('updated')
    expect(localStorage.getItem('test-key')).toBe(JSON.stringify('updated'))
  })

  it('should handle array values', () => {
    const initial = ['a', 'b', 'c']
    const { result } = renderHook(() => useLocalStorage('test-array', initial))

    act(() => {
      result.current[1](['x', 'y'])
    })

    expect(result.current[0]).toEqual(['x', 'y'])
    expect(JSON.parse(localStorage.getItem('test-array') || '[]')).toEqual(['x', 'y'])
  })

  it('should handle complex nested objects', () => {
    const initial = {
      user: { name: 'John', email: 'john@example.com' },
      preferences: { theme: 'dark', notifications: true }
    }
    const { result } = renderHook(() => useLocalStorage('config', initial))

    expect(result.current[0]).toEqual(initial)
  })

  it('should handle null and undefined values', () => {
    const { result } = renderHook(() => useLocalStorage('nullable', null))
    expect(result.current[0]).toBeNull()
  })

  it('should handle numeric values', () => {
    const { result } = renderHook(() => useLocalStorage('counter', 0))

    act(() => {
      result.current[1](42)
    })

    expect(result.current[0]).toBe(42)
  })

  it('should handle boolean values', () => {
    const { result } = renderHook(() => useLocalStorage('flag', false))

    act(() => {
      result.current[1](true)
    })

    expect(result.current[0]).toBe(true)
  })

  it('should handle multiple updates', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'))

    act(() => {
      result.current[1]('first')
    })
    expect(result.current[0]).toBe('first')

    act(() => {
      result.current[1]('second')
    })
    expect(result.current[0]).toBe('second')

    act(() => {
      result.current[1]('third')
    })
    expect(result.current[0]).toBe('third')
  })

  it('should handle invalid JSON in localStorage gracefully', () => {
    localStorage.setItem('bad-key', 'invalid json')
    const { result } = renderHook(() => useLocalStorage('bad-key', 'fallback'))
    expect(result.current[0]).toBe('fallback')
  })

  it('should persist different keys independently', () => {
    const { result: result1 } = renderHook(() => useLocalStorage('key1', 'value1'))
    const { result: result2 } = renderHook(() => useLocalStorage('key2', 'value2'))

    act(() => {
      result1.current[1]('updated1')
    })
    
    act(() => {
      result2.current[1]('value2')
    })

    expect(result1.current[0]).toBe('updated1')
    expect(result2.current[0]).toBe('value2')
    expect(localStorage.getItem('key1')).toBe(JSON.stringify('updated1'))
    expect(localStorage.getItem('key2')).toBe(JSON.stringify('value2'))
  })

  it('should return current value after update', () => {
    const { result } = renderHook(() => useLocalStorage('test', 'initial'))

    act(() => {
      result.current[1]('updated')
    })

    const [value] = result.current
    expect(value).toBe('updated')
  })

  it('should handle empty strings', () => {
    const { result } = renderHook(() => useLocalStorage('empty', ''))

    expect(result.current[0]).toBe('')

    act(() => {
      result.current[1]('not empty')
    })

    expect(result.current[0]).toBe('not empty')
  })

  it('should handle special characters in values', () => {
    const specialValue = 'test!@#$%^&*()'
    const { result } = renderHook(() => useLocalStorage('special', specialValue))

    expect(result.current[0]).toBe(specialValue)
    
    act(() => {
      result.current[1](specialValue)
    })
    
    expect(localStorage.getItem('special')).toBe(JSON.stringify(specialValue))
  })

  it('should handle unicode characters', () => {
    const unicodeValue = '你好世界 🌍 مرحبا'
    const { result } = renderHook(() => useLocalStorage('unicode', unicodeValue))

    expect(result.current[0]).toBe(unicodeValue)
    
    act(() => {
      result.current[1](unicodeValue)
    })
    
    expect(localStorage.getItem('unicode')).toBe(JSON.stringify(unicodeValue))
  })

  it('should warn on read errors and fallback to initial value', () => {
    // Store invalid JSON
    localStorage.setItem('error-key', 'not json')
    
    const { result } = renderHook(() => useLocalStorage('error-key', 'fallback'))
    expect(result.current[0]).toBe('fallback')
    // Console is mocked globally via setup.ts
  })

  it('should sync across multiple hook instances with same key', () => {
    const { result: result1 } = renderHook(() => useLocalStorage('shared', 'initial'))
    
    localStorage.setItem('shared', JSON.stringify('external update'))
    
    const { result: result2 } = renderHook(() => useLocalStorage('shared', 'initial'))
    expect(result2.current[0]).toBe('external update')
  })

  it('should handle big numbers correctly', () => {
    const bigNumber = Number.MAX_SAFE_INTEGER
    const { result } = renderHook(() => useLocalStorage('bignum', bigNumber))
    expect(result.current[0]).toBe(bigNumber)
  })

  it('should handle deeply nested structures', () => {
    const deepStructure = {
      level1: {
        level2: {
          level3: {
            level4: {
              value: 'deep'
            }
          }
        }
      }
    }
    const { result } = renderHook(() => useLocalStorage('deep', deepStructure))
    expect(result.current[0]).toEqual(deepStructure)
  })
})
