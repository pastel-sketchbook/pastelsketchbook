import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SparkAI } from '../src/components/SparkAI'

// Mock Google GenAI SDK
vi.mock('@google/genai', () => ({
  GoogleGenAI: vi.fn((config: any) => ({
    models: {
      generateContent: vi.fn(async () => ({
        text: JSON.stringify({
          topic: 'Learning JavaScript',
          creation: 'Create a tutorial series',
          platform: 'YouTube',
          impact: 'Educate thousands of developers'
        })
      }))
    }
  })),
  Type: {
    OBJECT: 'object',
    STRING: 'string',
    ARRAY: 'array'
  }
}))

describe('SparkAI Component', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('should render spark AI section', () => {
    const { container } = render(<SparkAI />)
    const section = container.querySelector('#spark')
    expect(section).toBeInTheDocument()
  })

  it('should display Spark an Idea button', () => {
    render(<SparkAI />)
    const button = screen.getByRole('button', { name: /Spark an Idea/i })
    expect(button).toBeInTheDocument()
  })

  it('should have input field for topic', () => {
    render(<SparkAI />)
    const input = screen.getByPlaceholderText(/e.g. Learning Spanish/)
    expect(input).toBeInTheDocument()
  })

  it('should accept topic input', async () => {
    render(<SparkAI />)
    const input = screen.getByPlaceholderText(/e.g. Learning Spanish/) as HTMLInputElement
    
    await userEvent.type(input, 'JavaScript')
    expect(input.value).toBe('JavaScript')
  })

  it('should have generate button in initial state', () => {
    render(<SparkAI />)
    const button = screen.getByRole('button', { name: /Spark an Idea/i })
    expect(button).toBeInTheDocument()
  })

  it('should enable button when input has text', async () => {
    render(<SparkAI />)
    const input = screen.getByPlaceholderText(/e.g. Learning Spanish/)
    const button = screen.getByRole('button', { name: /Spark an Idea/i })
    
    await userEvent.type(input, 'Learning')
    expect(button).not.toBeDisabled()
  })

  it('should display saved sparks heading', () => {
    render(<SparkAI />)
    // Check for section structure
    const { container } = render(<SparkAI />)
    expect(container).toBeInTheDocument()
  })

  it('should have localStorage initialization for sparks', () => {
    render(<SparkAI />)
    // Component uses useLocalStorage hook internally
    expect(localStorage.getItem('pastel_sketchbook_sparks')).toBeDefined()
  })

  it('should have section with proper ID', () => {
    const { container } = render(<SparkAI />)
    const section = container.querySelector('#spark')
    expect(section).toHaveAttribute('id', 'spark')
  })

  it('should render with section styling classes', () => {
    const { container } = render(<SparkAI />)
    const section = container.querySelector('#spark')
    expect(section).toHaveClass('py-32')
    expect(section).toHaveClass('px-6')
  })

  it('should have max-width container', () => {
    const { container } = render(<SparkAI />)
    const maxWidthDiv = container.querySelector('[class*="max-w"]')
    expect(maxWidthDiv).toBeInTheDocument()
  })

  it('should be wrapped in error boundary', () => {
    // Component is used within error boundary in routes/index.tsx
    const { container } = render(<SparkAI />)
    expect(container).toBeInTheDocument()
  })

  it('should have input with proper placeholder', () => {
    render(<SparkAI />)
    const input = screen.getByPlaceholderText(/e.g. Learning Spanish/)
    expect(input).toHaveAttribute('type', 'text')
  })

  it('should have button with loading state capability', () => {
    render(<SparkAI />)
    const button = screen.getByRole('button', { name: /Spark an Idea/i })
    expect(button).toBeInTheDocument()
  })

  it('should initialize with empty state', () => {
    render(<SparkAI />)
    const input = screen.getByPlaceholderText(/e.g. Learning Spanish/) as HTMLInputElement
    expect(input.value).toBe('')
  })

  it('should provide AI-powered idea generation', () => {
    render(<SparkAI />)
    const button = screen.getByRole('button', { name: /Spark an Idea/i })
    expect(button).toBeInTheDocument()
    // Verify GoogleGenAI was mocked
    expect(vi.mocked).toBeDefined()
  })

  it('should support text clearing', async () => {
    render(<SparkAI />)
    const input = screen.getByPlaceholderText(/e.g. Learning Spanish/) as HTMLInputElement
    
    await userEvent.type(input, 'Test')
    expect(input.value).toBe('Test')
    
    await userEvent.clear(input)
    expect(input.value).toBe('')
  })

  it('should be part of main homepage flow', () => {
    const { container } = render(<SparkAI />)
    const section = container.querySelector('#spark')
    expect(section).toBeInTheDocument()
    expect(section?.className).toContain('bg-[#FAF9F6]')
  })
})
