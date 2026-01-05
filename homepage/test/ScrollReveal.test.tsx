import { render, screen } from '@testing-library/react'
import { ScrollReveal } from '../src/components/ScrollReveal'

describe('ScrollReveal', () => {
  it('renders children content', () => {
    render(
      <ScrollReveal>
        <div>Test Content</div>
      </ScrollReveal>
    )
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('renders with direction prop', () => {
    render(
      <ScrollReveal direction="left">
        <div>Left Content</div>
      </ScrollReveal>
    )
    expect(screen.getByText('Left Content')).toBeInTheDocument()
  })

  it('renders complex children', () => {
    render(
      <ScrollReveal direction="right" delay={0.2}>
        <div>
          <h3>Title</h3>
          <p>Description</p>
        </div>
      </ScrollReveal>
    )
    expect(screen.getByText('Title')).toBeInTheDocument()
    expect(screen.getByText('Description')).toBeInTheDocument()
  })
})
