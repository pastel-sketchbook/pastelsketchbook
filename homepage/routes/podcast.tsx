import { createFileRoute } from "@tanstack/react-router"
import { Suspense, useState } from "react"
import { PodcastPlayer } from "../src/components/PodcastPlayer"
import { ChunkErrorBoundary } from "../src/components/ui/ChunkErrorBoundary"

export const Route = createFileRoute("/podcast")({
  component: PodcastWithErrorBoundary
})

function PodcastWithErrorBoundary() {
  const [retryKey, setRetryKey] = useState(0)
  
  return (
    <ChunkErrorBoundary
      chunkName="podcast"
      onRetry={() => setRetryKey(k => k + 1)}
    >
      <Suspense
        fallback={
          <div className="bg-[#FAF9F6] min-h-screen pt-32 pb-24 flex items-center justify-center">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 mb-4">
                <div className="w-8 h-8 border-4 border-[#5F7D61] border-t-[#E76F51] rounded-full animate-spin" />
              </div>
              <p className="text-[#1B3022] font-serif">Loading podcast...</p>
            </div>
          </div>
        }
      >
        <PodcastPage key={retryKey} />
      </Suspense>
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

