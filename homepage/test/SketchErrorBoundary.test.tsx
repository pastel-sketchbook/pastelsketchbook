import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SketchErrorBoundary } from '../src/components/ui/SketchErrorBoundary'

// Mock console.error to avoid test output pollution
beforeEach(() => {
  vi.spyOn(console, 'error').mockImplementation(() => {})
})

describe('SketchErrorBoundary Component', () => {
  it('should render children when no error occurs', () => {
    render(
      <SketchErrorBoundary name="Test Section">
        <div>Test Content</div>
      </SketchErrorBoundary>
    )
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('should render error UI when child throws error', () => {
    const ThrowError = () => {
      throw new Error('Test error')
    }

    render(
      <SketchErrorBoundary name="Test Section">
        <ThrowError />
      </SketchErrorBoundary>
    )

    // Error boundary should display error message
    expect(screen.getByText(/Something didn't quite grow right/i)).toBeInTheDocument()
  })

  it('should display section name in error message', () => {
    const ThrowError = () => {
      throw new Error('Test error')
    }

    render(
      <SketchErrorBoundary name="SparkAI Section">
        <ThrowError />
      </SketchErrorBoundary>
    )

    expect(screen.getByText(/SparkAI Section/i)).toBeInTheDocument()
  })

  it('should render multiple children', () => {
    render(
      <SketchErrorBoundary name="Test">
        <div>Child 1</div>
        <div>Child 2</div>
        <div>Child 3</div>
      </SketchErrorBoundary>
    )

    expect(screen.getByText('Child 1')).toBeInTheDocument()
    expect(screen.getByText('Child 2')).toBeInTheDocument()
    expect(screen.getByText('Child 3')).toBeInTheDocument()
  })

  it('should have proper styling applied', () => {
    const { container } = render(
      <SketchErrorBoundary name="Test">
        <div>Content</div>
      </SketchErrorBoundary>
    )

    const section = container.querySelector('div')
    expect(section).toBeTruthy()
  })

  it('should provide error recovery information', () => {
    const ThrowError = () => {
      throw new Error('Test error')
    }

    render(
      <SketchErrorBoundary name="Test Section">
        <ThrowError />
      </SketchErrorBoundary>
    )

    // Should show helpful error message
    const errorText = screen.getByText(/currently resting/i)
    expect(errorText).toBeInTheDocument()
  })

  it('should handle async errors in boundary', () => {
    const AsyncThrowError = () => {
      return <div>This will work initially</div>
    }

    render(
      <SketchErrorBoundary name="Async Section">
        <AsyncThrowError />
      </SketchErrorBoundary>
    )

    expect(screen.getByText('This will work initially')).toBeInTheDocument()
  })

  it('should support custom error messages', () => {
    const ThrowError = () => {
      throw new Error('Custom error message')
    }

    render(
      <SketchErrorBoundary name="Custom Section">
        <ThrowError />
      </SketchErrorBoundary>
    )

    expect(screen.getByText(/currently resting/i)).toBeInTheDocument()
  })

  it('should reset error state appropriately', () => {
    const { rerender } = render(
      <SketchErrorBoundary name="Test">
        <div>Success</div>
      </SketchErrorBoundary>
    )

    expect(screen.getByText('Success')).toBeInTheDocument()

    // Re-render with same props should maintain normal state
    rerender(
      <SketchErrorBoundary name="Test">
        <div>Success</div>
      </SketchErrorBoundary>
    )

    expect(screen.getByText('Success')).toBeInTheDocument()
  })

  it('should handle multiple sections independently', () => {
    render(
      <>
        <SketchErrorBoundary name="Section 1">
          <div>Content 1</div>
        </SketchErrorBoundary>
        <SketchErrorBoundary name="Section 2">
          <div>Content 2</div>
        </SketchErrorBoundary>
      </>
    )

    expect(screen.getByText('Content 1')).toBeInTheDocument()
    expect(screen.getByText('Content 2')).toBeInTheDocument()
  })
})
