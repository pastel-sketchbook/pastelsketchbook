import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { PodcastPlayer } from "../src/components/PodcastPlayer";

// Mock fetch for transcript
const mockTranscript = [
    { start: 0, duration: 5, text: "Intro segment" },
    { start: 5, duration: 10, text: "Second segment" }
];

global.fetch = vi.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve(mockTranscript),
    })
) as any;

// Mock scrollIntoView
window.HTMLElement.prototype.scrollIntoView = vi.fn();

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
