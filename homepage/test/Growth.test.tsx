import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Growth } from '../src/components/Growth'

// Mock lazy import for Recharts
vi.mock('recharts', () => ({
  AreaChart: ({ children, data }: any) => <div data-testid="area-chart">{children}</div>,
  CartesianGrid: () => <div />,
  XAxis: () => <div />,
  YAxis: () => <div />,
  Tooltip: () => <div />,
  Area: () => <div />,
}))

describe('Growth Component', () => {
  it('should render investment section', () => {
    const { container } = render(<Growth />)
    const section = container.querySelector('#investment')
    expect(section).toBeInTheDocument()
  })

  it('should render growth section', () => {
    const { container } = render(<Growth />)
    const section = container.querySelector('#growth')
    expect(section).toBeInTheDocument()
  })

  it('should display investment heading', () => {
    render(<Growth />)
    const heading = screen.getByText(/We don't just earn/)
    expect(heading).toBeInTheDocument()
  })

  it('should display power of time heading', () => {
    render(<Growth />)
    const heading = screen.getByText('The Power of Time')
    expect(heading).toBeInTheDocument()
  })

  it('should display growth subtitle', () => {
    render(<Growth />)
    const subtitle = screen.getByText('How Small Streams Become a River')
    expect(subtitle).toBeInTheDocument()
  })

  it('should display investment strategy description', () => {
    render(<Growth />)
    const text = screen.getByText(/seeded into Pastel Sketchbook's investment account/)
    expect(text).toBeInTheDocument()
  })

  it('should display ETF explanation', () => {
    render(<Growth />)
    const text = screen.getByText(/low-cost, diversified Exchange-Traded Funds/)
    expect(text).toBeInTheDocument()
  })

  it('should display compounding emphasis', () => {
    render(<Growth />)
    const text = screen.getByText(/it's about cultivating a lasting financial resource/)
    expect(text).toBeInTheDocument()
  })

  it('should display model assumptions', () => {
    render(<Growth />)
    const heading = screen.getByText(/Model Assumptions/i)
    expect(heading).toBeInTheDocument()
  })

  it('should show initial seed value', () => {
    render(<Growth />)
    const value = screen.getByText('$1,000')
    expect(value).toBeInTheDocument()
  })

  it('should show monthly contribution', () => {
    render(<Growth />)
    const value = screen.getByText('$200')
    expect(value).toBeInTheDocument()
  })

  it('should show average annual return', () => {
    render(<Growth />)
    const value = screen.getByText('7%')
    expect(value).toBeInTheDocument()
  })

  it('should display hypothetical disclaimer', () => {
    render(<Growth />)
    const disclaimer = screen.getByText('Hypothetical illustration only.')
    expect(disclaimer).toBeInTheDocument()
  })

  it('should display compounding explanation', () => {
    render(<Growth />)
    const text = screen.getByText(/Compounding is our most powerful tool/)
    expect(text).toBeInTheDocument()
  })

  it('should render SVG jar illustration', () => {
    const { container } = render(<Growth />)
    const svgs = container.querySelectorAll('svg')
    expect(svgs.length).toBeGreaterThan(0)
  })

  it('should have chart reference container', () => {
    const { container } = render(<Growth />)
    const chartBox = container.querySelector('[class*="sketch-border"]')
    expect(chartBox).toBeInTheDocument()
  })

  it('should display invest section with proper structure', () => {
    const { container } = render(<Growth />)
    const investSection = container.querySelector('#investment')
    expect(investSection).toBeInTheDocument()
  })

  it('should display growth section with layout', () => {
    const { container } = render(<Growth />)
    const growthSection = container.querySelector('#growth')
    expect(growthSection).toBeInTheDocument()
  })
})
