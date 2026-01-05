import { createFileRoute } from "@tanstack/react-router"
import { PodcastPlayer } from "../src/components/PodcastPlayer"
import { ChunkErrorBoundary } from "../src/components/ui/ChunkErrorBoundary"

export const Route = createFileRoute("/podcast")({
  component: PodcastWithErrorBoundary
})

function PodcastWithErrorBoundary() {
  return (
    <ChunkErrorBoundary chunkName="podcast">
      <PodcastPage />
    </ChunkErrorBoundary>
  )
}

function PodcastPage() {
  return (
    <div className="bg-[#FAF9F6] min-h-screen pt-32 pb-24">
      <PodcastPlayer
        audioSrc="/podcasts/episode_1.m4a"
        transcriptSrc="/podcasts/episode_1.transcript.json"
        title="The Art of Collective Learning"
        episodeNumber={1}
      />
    </div>
  )
}

