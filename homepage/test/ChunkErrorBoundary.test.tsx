import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ChunkErrorBoundary } from '../src/components/ui/ChunkErrorBoundary'

describe('ChunkErrorBoundary', () => {
  it('renders children immediately on mount without loading state', () => {
    const testContent = 'Test children content'

    render(
      <ChunkErrorBoundary chunkName="test">
        <div>{testContent}</div>
      </ChunkErrorBoundary>
    )

    // Children should render immediately
    expect(screen.getByText(testContent)).toBeInTheDocument()

    // Should NOT show the retrying spinner
    expect(screen.queryByText('Retrying load...')).not.toBeInTheDocument()
  })

  it('initializes with isRetrying set to false', () => {
    render(
      <ChunkErrorBoundary chunkName="test">
        <div>Content</div>
      </ChunkErrorBoundary>
    )

    // Content should be visible (no retry spinner shown)
    expect(screen.getByText('Content')).toBeInTheDocument()
  })
})
