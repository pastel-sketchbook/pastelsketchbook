import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { SketchBox } from '../src/components/ui/SketchBox'

describe('SketchBox Component', () => {
  it('should render children content', () => {
    const { getByText } = render(
      <SketchBox>Test Content</SketchBox>
    )
    expect(getByText('Test Content')).toBeInTheDocument()
  })

  it('should apply sketch-border class', () => {
    const { container } = render(
      <SketchBox>Content</SketchBox>
    )
    const box = container.firstChild as HTMLElement
    expect(box).toHaveClass('sketch-border')
  })

  it('should support className prop', () => {
    const { container } = render(
      <SketchBox className="custom-class">Content</SketchBox>
    )
    const box = container.firstChild as HTMLElement
    expect(box).toHaveClass('custom-class')
  })

  it('should combine sketch-border with custom className', () => {
    const { container } = render(
      <SketchBox className="bg-white p-8">Content</SketchBox>
    )
    const box = container.firstChild as HTMLElement
    expect(box).toHaveClass('sketch-border')
    expect(box).toHaveClass('bg-white')
    expect(box).toHaveClass('p-8')
  })

  it('should render as a div element', () => {
    const { container } = render(
      <SketchBox>Content</SketchBox>
    )
    const box = container.firstChild
    expect(box?.nodeName).toBe('DIV')
  })

  it('should support multiple children', () => {
    const { getByText } = render(
      <SketchBox>
        <div>Child 1</div>
        <div>Child 2</div>
        <div>Child 3</div>
      </SketchBox>
    )
    expect(getByText('Child 1')).toBeInTheDocument()
    expect(getByText('Child 2')).toBeInTheDocument()
    expect(getByText('Child 3')).toBeInTheDocument()
  })

  it('should accept HTML element props', () => {
    const { container } = render(
      <SketchBox id="test-box" data-testid="sketch">
        Content
      </SketchBox>
    )
    const box = container.querySelector('[data-testid="sketch"]')
    expect(box).toHaveAttribute('id', 'test-box')
  })

  it('should maintain border styling for organic design', () => {
    const { container } = render(
      <SketchBox className="border-[#1B3022]/20">Content</SketchBox>
    )
    const box = container.firstChild as HTMLElement
    expect(box).toHaveClass('sketch-border')
  })

  it('should work with various background colors', () => {
    const { container } = render(
      <SketchBox className="bg-white">White Box</SketchBox>
    )
    const box = container.firstChild as HTMLElement
    expect(box).toHaveClass('bg-white')
  })

  it('should support padding classes', () => {
    const { container } = render(
      <SketchBox className="p-8 md:p-12">Padded Content</SketchBox>
    )
    const box = container.firstChild as HTMLElement
    expect(box).toHaveClass('p-8')
    expect(box).toHaveClass('md:p-12')
  })

  it('should support responsive classes', () => {
    const { container } = render(
      <SketchBox className="w-full md:w-1/2">Responsive</SketchBox>
    )
    const box = container.firstChild as HTMLElement
    expect(box).toHaveClass('w-full')
    expect(box).toHaveClass('md:w-1/2')
  })

  it('should handle complex children structures', () => {
    const { getByText } = render(
      <SketchBox>
        <div>
          <h2>Title</h2>
          <p>Paragraph</p>
        </div>
      </SketchBox>
    )
    expect(getByText('Title')).toBeInTheDocument()
    expect(getByText('Paragraph')).toBeInTheDocument()
  })

  it('should render without children', () => {
    const { container } = render(<SketchBox />)
    const box = container.firstChild as HTMLElement
    expect(box).toHaveClass('sketch-border')
    expect(box).toBeEmptyDOMElement()
  })

  it('should support rotation classes for organic feel', () => {
    const { container } = render(
      <SketchBox className="rotate-1">Rotated</SketchBox>
    )
    const box = container.firstChild as HTMLElement
    expect(box).toHaveClass('rotate-1')
  })

  it('should support shadow classes', () => {
    const { container } = render(
      <SketchBox className="shadow-sm hover:shadow-md">Shadow</SketchBox>
    )
    const box = container.firstChild as HTMLElement
    expect(box).toHaveClass('shadow-sm')
    expect(box).toHaveClass('hover:shadow-md')
  })
})
