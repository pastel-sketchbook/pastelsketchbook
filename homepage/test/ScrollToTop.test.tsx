import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { ScrollToTop } from '../src/components/ui/ScrollToTop';

describe('ScrollToTop', () => {
    beforeEach(() => {
        window.scrollTo = vi.fn();
    });

    it('is initially hidden', () => {
        render(<ScrollToTop />);
        const button = screen.queryByRole('button', { name: /scroll to top/i });
        expect(button).not.toBeInTheDocument();
    });

    it('becomes visible after scrolling down', async () => {
        render(<ScrollToTop />);

        // Mock scroll event
        act(() => {
            window.pageYOffset = 400;
            window.dispatchEvent(new Event('scroll'));
        });

        const button = await screen.findByRole('button', { name: /scroll to top/i });
        expect(button).toBeInTheDocument();
    });

    it('scrolls to top when clicked', async () => {
        render(<ScrollToTop />);

        act(() => {
            window.pageYOffset = 400;
            window.dispatchEvent(new Event('scroll'));
        });

        const button = await screen.findByRole('button', { name: /scroll to top/i });
        fireEvent.click(button);

        expect(window.scrollTo).toHaveBeenCalledWith({
            top: 0,
            behavior: 'smooth'
        });
    });
});
