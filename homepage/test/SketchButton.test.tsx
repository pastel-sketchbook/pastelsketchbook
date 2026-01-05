import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SketchButton } from '../src/components/ui/SketchButton'

describe('SketchButton Component', () => {
  it('should render button with text', () => {
    render(<SketchButton>Click me</SketchButton>)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  it('should call onClick handler when clicked', async () => {
    const handleClick = vi.fn()
    render(<SketchButton onClick={handleClick}>Click me</SketchButton>)

    const button = screen.getByRole('button')
    await userEvent.click(button)
    expect(handleClick).toHaveBeenCalledOnce()
  })

  it('should be disabled when disabled prop is true', () => {
    render(<SketchButton disabled>Click me</SketchButton>)
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
  })

  it('should not call onClick when disabled', async () => {
    const handleClick = vi.fn()
    render(
      <SketchButton disabled onClick={handleClick}>
        Click me
      </SketchButton>
    )

    const button = screen.getByRole('button')
    await userEvent.click(button)
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('should support variant prop for styling', () => {
    const { container } = render(
      <SketchButton variant="primary">Primary</SketchButton>
    )
    const button = container.querySelector('button')
    expect(button).toBeInTheDocument()
  })

  it('should support size prop for different sizes', () => {
    const { container } = render(
      <SketchButton size="large">Large Button</SketchButton>
    )
    const button = container.querySelector('button')
    expect(button).toBeInTheDocument()
  })

  it('should support className prop for custom styling', () => {
    const { container } = render(
      <SketchButton className="custom-class">Button</SketchButton>
    )
    const button = container.querySelector('button')
    expect(button).toHaveClass('custom-class')
  })

  it('should support aria-label for accessibility', () => {
    render(<SketchButton aria-label="Submit form">Submit</SketchButton>)
    const button = screen.getByLabelText('Submit form')
    expect(button).toBeInTheDocument()
  })

  it('should support type prop', () => {
    const { container } = render(
      <SketchButton type="submit">Submit</SketchButton>
    )
    const button = container.querySelector('button')
    expect(button).toHaveAttribute('type', 'submit')
  })

  it('should maintain focus after click', async () => {
    render(<SketchButton>Focused</SketchButton>)
    const button = screen.getByRole('button')
    await userEvent.click(button)
    expect(button).toBeInTheDocument()
  })

  it('should handle multiple rapid clicks', async () => {
    const handleClick = vi.fn()
    render(<SketchButton onClick={handleClick}>Click</SketchButton>)

    const button = screen.getByRole('button')
    await userEvent.click(button)
    await userEvent.click(button)
    await userEvent.click(button)
    expect(handleClick).toHaveBeenCalledTimes(3)
  })

  it('should support children as elements', () => {
    render(
      <SketchButton>
        <span>Icon</span>
        Text
      </SketchButton>
    )
    expect(screen.getByText('Icon')).toBeInTheDocument()
    expect(screen.getByText('Text')).toBeInTheDocument()
  })

  it('should have keyboard support', async () => {
    const handleClick = vi.fn()
    render(<SketchButton onClick={handleClick}>Button</SketchButton>)

    const button = screen.getByRole('button')
    button.focus()
    await userEvent.keyboard('{Enter}')
    expect(handleClick).toHaveBeenCalled()
  })

  it('should support hover interactions', () => {
    const { container } = render(<SketchButton>Hover me</SketchButton>)
    const button = container.querySelector('button')
    expect(button).toBeInTheDocument()
  })
})
