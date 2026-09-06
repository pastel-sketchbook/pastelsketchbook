import { describe, it, expect, mock } from 'bun:test';
import { render, screen, fireEvent } from '@testing-library/react';
import { VideoSearch } from '../src/components/VideoSearch';

describe('VideoSearch', () => {
    it('renders search input with initial query', () => {
        const setSearchQuery = mock(() => {});
        render(<VideoSearch searchQuery="test query" setSearchQuery={setSearchQuery} />);

        const input = screen.getByPlaceholderText(/search/i);
        expect(input).toBeInTheDocument();
        expect(input).toHaveValue('test query');
    });

    it('calls setSearchQuery on change', () => {
        const setSearchQuery = mock(() => {});
        render(<VideoSearch searchQuery="" setSearchQuery={setSearchQuery} />);

        const input = screen.getByPlaceholderText(/search/i);
        fireEvent.change(input, { target: { value: 'new query' } });

        expect(setSearchQuery).toHaveBeenCalledWith('new query');
    });

    it('renders clear button when query is present', () => {
        const setSearchQuery = mock(() => {});
        render(<VideoSearch searchQuery="some query" setSearchQuery={setSearchQuery} />);

        const clearButton = screen.getByRole('button');
        expect(clearButton).toBeInTheDocument();
    });

    it('calls setSearchQuery with empty string when cleared', () => {
        const setSearchQuery = mock(() => {});
        render(<VideoSearch searchQuery="some query" setSearchQuery={setSearchQuery} />);

        const clearButton = screen.getByRole('button');
        fireEvent.click(clearButton);

        expect(setSearchQuery).toHaveBeenCalledWith('');
    });
});
