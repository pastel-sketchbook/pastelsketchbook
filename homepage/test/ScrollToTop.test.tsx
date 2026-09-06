import { describe, it, expect, mock, beforeEach, afterEach } from 'bun:test';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { ScrollToTop } from '../src/components/ui/ScrollToTop';

describe('ScrollToTop', () => {
    const originalScrollTo = window.scrollTo;

    beforeEach(() => {
        (window as any).scrollTo = mock(() => {});
    });

    afterEach(() => {
        window.scrollTo = originalScrollTo;
        (window as any).pageYOffset = 0;
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
            (window as any).pageYOffset = 400;
            window.dispatchEvent(new Event('scroll'));
        });

        const button = await screen.findByRole('button', { name: /scroll to top/i });
        expect(button).toBeInTheDocument();
    });

    it('scrolls to top when clicked', async () => {
        render(<ScrollToTop />);

        act(() => {
            (window as any).pageYOffset = 400;
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
