import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, mock, beforeEach, afterEach } from "bun:test";
import { PodcastPlayer } from "../src/components/PodcastPlayer";

// Mock fetch for transcript
const mockTranscript = [
    { timestamp: [0, 5], text: "Intro segment" },
    { timestamp: [5, 15], text: "Second segment" }
];

const originalFetch = globalThis.fetch;
const originalScrollIntoView = window.HTMLElement.prototype.scrollIntoView;

beforeEach(() => {
    (globalThis as any).fetch = mock(() =>
        Promise.resolve({
            json: () => Promise.resolve(mockTranscript),
        })
    );
    // Mock scrollIntoView
    (window.HTMLElement.prototype as any).scrollIntoView = mock(() => {});
});

afterEach(() => {
    (globalThis as any).fetch = originalFetch;
    window.HTMLElement.prototype.scrollIntoView = originalScrollIntoView;
});

describe("PodcastPlayer", () => {
    it("renders title and episode number", async () => {
        render(
            <PodcastPlayer
                title="Test Episode"
                episodeNumber={1}
                audioSrc="test.m4a"
                transcriptSrc="test.json"
            />
        );

        expect(screen.getByText("Test Episode")).toBeInTheDocument();
        expect(screen.getByText("Episode 1")).toBeInTheDocument();
        // Wait for transcript to load
        expect(await screen.findByText("Intro segment")).toBeInTheDocument();
    });

    it("displays transcript segments", async () => {
        render(
            <PodcastPlayer
                title="Test Episode"
                episodeNumber={1}
                audioSrc="test.m4a"
                transcriptSrc="test.json"
            />
        );

        expect(await screen.findByText("Intro segment")).toBeInTheDocument();
        expect(screen.getByText("Second segment")).toBeInTheDocument();
    });
});
