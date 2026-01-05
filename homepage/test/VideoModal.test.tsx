import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { VideoModal } from '../src/components/VideoModal'

describe('VideoModal - Zoom Controls', () => {
  const defaultProps = {
    videoId: 'V2cZl5s4EKU',
    onClose: vi.fn()
  }

  describe('Zoom Functionality', () => {
    it('should render zoom controls when video is open', () => {
      render(<VideoModal {...defaultProps} />)
      expect(screen.getByLabelText(/Decrease video size/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/Increase video size/i)).toBeInTheDocument()
    })

    it('should display initial zoom percentage at 100%', () => {
      render(<VideoModal {...defaultProps} />)
      expect(screen.getByText('100%')).toBeInTheDocument()
    })

    it('should increase scale when zoom in button clicked', async () => {
      const user = userEvent.setup()
      render(<VideoModal {...defaultProps} />)

      const zoomInBtn = screen.getByLabelText(/Increase video size/i)
      await user.click(zoomInBtn)

      await waitFor(() => {
        expect(screen.getByText('110%')).toBeInTheDocument()
      })
    })

    it('should decrease scale when zoom out button clicked', async () => {
      const user = userEvent.setup()
      render(<VideoModal {...defaultProps} />)

      const zoomInBtn = screen.getByLabelText(/Increase video size/i)
      await user.click(zoomInBtn) // First zoom in to 110%

      const zoomOutBtn = screen.getByLabelText(/Decrease video size/i)
      await user.click(zoomOutBtn) // Then zoom out back to 100%

      await waitFor(() => {
        expect(screen.getByText('100%')).toBeInTheDocument()
      })
    })

    it('should disable zoom out at minimum scale (60%)', async () => {
      const user = userEvent.setup()
      render(<VideoModal {...defaultProps} />)

      const zoomOutBtn = screen.getByLabelText(/Decrease video size/i)

      // Click multiple times to reach minimum
      for (let i = 0; i < 5; i++) {
        await user.click(zoomOutBtn)
      }

      await waitFor(() => {
        expect(zoomOutBtn).toBeDisabled()
        expect(screen.getByText('60%')).toBeInTheDocument()
      })
    })

    it('should disable zoom in at maximum scale (140%)', async () => {
      const user = userEvent.setup()
      render(<VideoModal {...defaultProps} />)

      const zoomInBtn = screen.getByLabelText(/Increase video size/i)

      // Click multiple times to reach maximum
      for (let i = 0; i < 5; i++) {
        await user.click(zoomInBtn)
      }

      await waitFor(() => {
        expect(zoomInBtn).toBeDisabled()
        expect(screen.getByText('140%')).toBeInTheDocument()
      })
    })
  })

  describe('Keyboard Navigation', () => {
    it('should zoom in when plus key pressed', async () => {
      render(<VideoModal {...defaultProps} />)

      fireEvent.keyDown(window, { key: '+' })

      await waitFor(() => {
        expect(screen.getByText('110%')).toBeInTheDocument()
      })
    })

    it('should zoom in when equals key pressed', async () => {
      render(<VideoModal {...defaultProps} />)

      fireEvent.keyDown(window, { key: '=' })

      await waitFor(() => {
        expect(screen.getByText('110%')).toBeInTheDocument()
      })
    })

    it('should zoom out when minus key pressed', async () => {
      render(<VideoModal {...defaultProps} />)

      // First zoom in
      fireEvent.keyDown(window, { key: '+' })

      // Then zoom out
      fireEvent.keyDown(window, { key: '-' })

      await waitFor(() => {
        expect(screen.getByText('100%')).toBeInTheDocument()
      })
    })

    it('should close modal when Escape key pressed', async () => {
      const onClose = vi.fn()
      render(<VideoModal {...defaultProps} onClose={onClose} />)

      fireEvent.keyDown(window, { key: 'Escape' })

      await waitFor(() => {
        expect(onClose).toHaveBeenCalled()
      })
    })
  })

  describe('Accessibility', () => {
    it('should have proper ARIA labels for zoom controls', () => {
      render(<VideoModal {...defaultProps} />)

      expect(screen.getByLabelText(/Decrease video size.*Press Minus/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/Increase video size.*Press Plus/i)).toBeInTheDocument()
    })

    it('should have role="group" for control container', () => {
      render(<VideoModal {...defaultProps} />)

      const controlGroup = screen.getByRole('group', {
        name: /Video player zoom controls/i
      })
      expect(controlGroup).toBeInTheDocument()
    })

    it('should have aria-label on close button', () => {
      render(<VideoModal {...defaultProps} />)

      const closeBtn = screen.getByLabelText(/Close video/i)
      expect(closeBtn).toBeInTheDocument()
    })
  })

  describe('Hover Behavior', () => {
    it('should render controls initially', () => {
      render(<VideoModal {...defaultProps} />)
      
      const controlGroup = screen.getByRole('group', {
        name: /Video player zoom controls/i
      })
      expect(controlGroup).toBeInTheDocument()
    })
  })

  describe('Modal Behavior', () => {
    it('should not render when videoId is null', () => {
      render(<VideoModal videoId={null} onClose={vi.fn()} />)

      expect(screen.queryByLabelText(/Increase video size/i)).not.toBeInTheDocument()
    })

    it('should close when pressing Escape key', async () => {
      const onClose = vi.fn()
      render(<VideoModal {...defaultProps} onClose={onClose} />)

      fireEvent.keyDown(window, { key: 'Escape' })

      await waitFor(() => {
        expect(onClose).toHaveBeenCalled()
      })
    })
  })
})
