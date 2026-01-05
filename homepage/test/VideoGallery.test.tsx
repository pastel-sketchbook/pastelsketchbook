import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { VideoGallery } from '../src/components/VideoGallery';

describe('VideoGallery', () => {
    const mockItems = [
        { id: '1', title: 'Video A', date: '2024-01-01', views: 1000 },
        { id: '2', title: 'Video B', date: '2024-02-01', views: 500 }
    ];

    it('renders title and description', () => {
        render(
            <VideoGallery
                items={[]}
                onVideoSelect={() => { }}
                title="Galaxy"
                description="Stars and planets"
            />
        );

        expect(screen.getByText('Galaxy')).toBeInTheDocument();
        expect(screen.getByText('Stars and planets')).toBeInTheDocument();
    });

    it('renders video items with metadata', () => {
        render(
            <VideoGallery
                items={mockItems}
                onVideoSelect={() => { }}
                title="Test"
                description="Test"
            />
        );

        expect(screen.getByText('Video A')).toBeInTheDocument();
        expect(screen.getByText('Video B')).toBeInTheDocument();
        expect(screen.getByText('1.0k watches')).toBeInTheDocument();
        expect(screen.getByText('500 watches')).toBeInTheDocument();
    });

    it('calls onVideoSelect when a card is clicked', () => {
        const onVideoSelect = vi.fn();
        render(
            <VideoGallery
                items={mockItems}
                onVideoSelect={onVideoSelect}
                title="Test"
                description="Test"
            />
        );

        const videoCard = screen.getByText('Video A').closest('button');
        if (videoCard) fireEvent.click(videoCard);

        expect(onVideoSelect).toHaveBeenCalledWith('1');
    });
});
