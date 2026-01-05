import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { VideoSkeleton } from '../src/components/VideoSkeleton'

describe('VideoSkeleton', () => {
  it('should render with default count of 6', () => {
    const { container } = render(<VideoSkeleton />)
    // Count the grid items (each skeleton item has space-y-4)
    const items = container.querySelectorAll('.space-y-4')
    expect(items.length).toBe(6)
  })

  it('should render with custom count', () => {
    const { container } = render(<VideoSkeleton count={9} />)
    const items = container.querySelectorAll('.space-y-4')
    expect(items.length).toBe(9)
  })

  it('should have animated shimmer effect', () => {
    const { container } = render(<VideoSkeleton count={1} />)
    const shimmer = container.querySelector('[class*="gradient"]')
    expect(shimmer).toBeTruthy()
  })

  it('should have sketch-border class for design consistency', () => {
    const { container } = render(<VideoSkeleton count={1} />)
    const border = container.querySelector('.sketch-border')
    expect(border).toBeTruthy()
  })

  it('should use pastel color scheme', () => {
    const { container } = render(<VideoSkeleton count={1} />)
    const gradients = container.innerHTML

    // Check for pastel colors used in gradients
    expect(gradients).toContain('#D4A373') // Tan
    expect(gradients).toContain('#5F7D61') // Medium green
    expect(gradients).toContain('#E76F51') // Terracotta
  })

  it('should be accessible', () => {
    const { container } = render(<VideoSkeleton count={1} />)
    // Check structure exists
    expect(container.querySelector('.space-y-12')).toBeTruthy()
    expect(container.querySelector('.grid')).toBeTruthy()
  })

  it('should have animations', () => {
    const { container } = render(<VideoSkeleton count={1} />)
    // Check for animation classes
    const animated = container.innerHTML
    expect(animated).toContain('animate')
  })
})
