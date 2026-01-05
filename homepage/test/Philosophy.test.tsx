import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Philosophy } from '../src/components/Philosophy'

describe('Philosophy Component', () => {
  it('should render vision section', () => {
    const { container } = render(<Philosophy />)
    const visionSection = container.querySelector('#vision')
    expect(visionSection).toBeInTheDocument()
  })

  it('should display vision heading', () => {
    render(<Philosophy />)
    const heading = screen.getByText(/What if our study hours could build more than knowledge/i)
    expect(heading).toBeInTheDocument()
  })

  it('should render problem section', () => {
    const { container } = render(<Philosophy />)
    const problemSection = container.querySelector('#problem')
    expect(problemSection).toBeInTheDocument()
  })

  it('should display problem heading', () => {
    render(<Philosophy />)
    const heading = screen.getByText(/Learning is valuable/)
    expect(heading).toBeInTheDocument()
  })

  it('should render solitary effort card', () => {
    render(<Philosophy />)
    const card = screen.getByText('Solitary Effort')
    expect(card).toBeInTheDocument()
  })

  it('should render creator treadmill card', () => {
    render(<Philosophy />)
    const card = screen.getByText('The Creator Treadmill')
    expect(card).toBeInTheDocument()
  })

  it('should display digital garden heading', () => {
    render(<Philosophy />)
    const heading = screen.getByText(/We're building a digital community garden/)
    expect(heading).toBeInTheDocument()
  })

  it('should display community topics with labels', () => {
    render(<Philosophy />)
    expect(screen.getByText('Art')).toBeInTheDocument()
    expect(screen.getByText('Science')).toBeInTheDocument()
    expect(screen.getByText('Languages')).toBeInTheDocument()
    expect(screen.getByText('Music')).toBeInTheDocument()
    expect(screen.getByText('Philosophy')).toBeInTheDocument()
  })

  it('should render virtuous cycle section', () => {
    const { container } = render(<Philosophy />)
    const cycleSection = container.querySelector('#cycle')
    expect(cycleSection).toBeInTheDocument()
  })

  it('should have cycle heading', () => {
    render(<Philosophy />)
    const heading = screen.getByText('A Virtuous Cycle')
    expect(heading).toBeInTheDocument()
  })

  it('should display all virtuous cycle steps', () => {
    render(<Philosophy />)
    const steps = [
      'Learn & Explore',
      'Create & Share',
      'Grow Audience',
      'Invest Collectively',
      'Compound Wealth'
    ]
    steps.forEach(step => {
      expect(screen.getByText(step)).toBeInTheDocument()
    })
  })

  it('should have correct section IDs for navigation', () => {
    const { container } = render(<Philosophy />)
    expect(container.querySelector('#vision')).toBeInTheDocument()
    expect(container.querySelector('#problem')).toBeInTheDocument()
    expect(container.querySelector('#cycle')).toBeInTheDocument()
  })

  it('should display subtitle for virtuous cycle', () => {
    render(<Philosophy />)
    const subtitle = screen.getByText('From Curiosity to Collective Capital')
    expect(subtitle).toBeInTheDocument()
  })

  it('should have seed/growth metaphor in content', () => {
    render(<Philosophy />)
    const content = screen.getByText(/We plant these seeds together/)
    expect(content).toBeInTheDocument()
  })

  it('should render sketch boxes for visual structure', () => {
    const { container } = render(<Philosophy />)
    const sketchBoxes = container.querySelectorAll('[class*="sketch-border"]')
    expect(sketchBoxes.length).toBeGreaterThan(0)
  })

  it('should include step descriptions', () => {
    render(<Philosophy />)
    const learningDesc = screen.getByText(/A member pursues a personal interest/)
    expect(learningDesc).toBeInTheDocument()
  })

  it('should have solitary effort description', () => {
    render(<Philosophy />)
    const desc = screen.getByText(/learning journeys are often isolated/)
    expect(desc).toBeInTheDocument()
  })

  it('should have creator treadmill description', () => {
    render(<Philosophy />)
    const desc = screen.getByText(/Turning passion into income requires/)
    expect(desc).toBeInTheDocument()
  })
})
