import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Hero } from '../src/components/Hero'

describe('Hero Component', () => {
  it('should render hero section with id', () => {
    const { container } = render(<Hero />)
    const section = container.querySelector('#hero')
    expect(section).toBeInTheDocument()
  })

  it('should display main heading', () => {
    render(<Hero />)
    const heading = screen.getByText('Pastel Sketchbook')
    expect(heading).toBeInTheDocument()
    expect(heading.tagName).toBe('H1')
  })

  it('should display tagline', () => {
    render(<Hero />)
    const tagline = screen.getByText(/Where Collective Learning/i)
    expect(tagline).toBeInTheDocument()
  })

  it('should have scroll indicator link', () => {
    render(<Hero />)
    const link = screen.getByRole('link')
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '#vision')
  })

  it('should apply correct styling classes', () => {
    const { container } = render(<Hero />)
    const section = container.querySelector('#hero')
    expect(section).toHaveClass('min-h-screen', 'flex', 'flex-col', 'items-center', 'justify-center')
  })

  it('should contain SVG illustration', () => {
    const { container } = render(<Hero />)
    const svgs = container.querySelectorAll('svg')
    expect(svgs.length).toBeGreaterThan(0)
  })

  it('should render with proper structure', () => {
    const { container } = render(<Hero />)
    const section = container.querySelector('#hero')
    expect(section).toBeTruthy()
    expect(section?.querySelector('h1')).toBeTruthy()
  })

  it('should have visual depth with background elements', () => {
    const { container } = render(<Hero />)
    const section = container.querySelector('#hero')
    // Check that section has visual layering elements
    expect(section?.querySelectorAll('div').length).toBeGreaterThan(0)
  })

  it('should render animated content container', () => {
    const { container } = render(<Hero />)
    const animated = container.querySelector('[class*="relative"]')
    expect(animated).toBeInTheDocument()
  })
})
