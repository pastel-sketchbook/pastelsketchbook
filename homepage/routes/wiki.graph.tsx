import { createFileRoute, Link } from '@tanstack/react-router'
import { lazy, Suspense } from 'react'
import { useQuery } from '@tanstack/react-query'
import { ChunkErrorBoundary } from '../src/components/ui/ChunkErrorBoundary'
import {
  fetchWikiBundle,
  catLabel,
  CATEGORY_COLORS,
} from '../src/utils/wiki'

const WikiGraph = lazy(() =>
  import('../src/components/WikiGraph').then((m) => ({ default: m.WikiGraph })),
)

export const Route = createFileRoute('/wiki/graph')({
  component: GraphWithErrorBoundary,
})

function GraphWithErrorBoundary() {
  return (
    <ChunkErrorBoundary chunkName="wiki-graph">
      <GraphPage />
    </ChunkErrorBoundary>
  )
}

function GraphPage() {
  const {
    data: wiki,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['wikiBundle'],
    queryFn: fetchWikiBundle,
    staleTime: 3600000,
  })

  if (isError) {
    return (
      <div className="bg-[#f0f0ec] min-h-screen pt-32 pb-24 px-6 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-[#c9434e]/10">
            <svg
              className="w-8 h-8 text-[#c9434e]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-serif italic text-[#1e232b] mb-2">
            Failed to load graph
          </h2>
          <p className="text-sm text-[#1e232b]/50 mb-6 max-w-md mx-auto">
            Something went wrong loading the graph. Please try again.
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => refetch()}
              className="px-6 py-3 rounded-full bg-[#1e232b] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#2e353f] transition-all"
            >
              Retry
            </button>
            <Link
              to="/wiki"
              className="px-6 py-3 rounded-full bg-[#1e232b]/10 text-[#1e232b]/70 text-xs font-bold uppercase tracking-widest hover:bg-[#1e232b]/20 transition-all"
            >
              Back to Wiki
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (isLoading || !wiki) {
    return (
      <div className="bg-[#f0f0ec] min-h-screen pt-32 pb-24 px-6 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 mb-4">
            <div className="w-8 h-8 border-4 border-[#1a8a6e] border-t-[#c9434e] rounded-full animate-spin" />
          </div>
          <p className="text-[#1e232b]/60 font-serif">Loading graph...</p>
        </div>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen pt-20 relative"
      style={{
        background: `
          radial-gradient(ellipse at 15% 20%, #f5ede0 0%, transparent 50%),
          radial-gradient(ellipse at 85% 15%, #f0e8da 0%, transparent 45%),
          radial-gradient(ellipse at 50% 80%, #ede6d8 0%, transparent 50%),
          radial-gradient(ellipse at 80% 70%, #f2ece0 0%, transparent 40%),
          radial-gradient(ellipse at 20% 90%, #eee7db 0%, transparent 45%),
          linear-gradient(135deg, #f3ede3 0%, #efebe4 35%, #f0ece5 65%, #ede8e0 100%)
        `,
      }}
    >
      {/* Back link */}
      <div className="absolute top-24 left-6 z-10">
        <Link
          to="/wiki"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1e232b]/10 backdrop-blur-sm text-[#1e232b]/70 text-xs font-bold uppercase tracking-widest hover:bg-[#1e232b]/20 transition-all"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Wiki
        </Link>
      </div>

      {/* Legend */}
      <div className="absolute top-24 right-6 z-10 bg-white/70 backdrop-blur-sm rounded-xl p-4 text-xs text-[#1e232b]/70 border border-[#1e232b]/10">
        <div className="font-bold uppercase tracking-widest text-[#1e232b]/40 mb-2">Categories</div>
        <div className="space-y-1.5">
          {Object.entries(CATEGORY_COLORS).map(([key, color]) => (
            <div key={key} className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
              {catLabel(key)}
            </div>
          ))}
        </div>
        <div className="mt-3 pt-3 border-t border-[#1e232b]/10 text-[#1e232b]/40">
          Click node to open video<br />
          Scroll to zoom, drag to rotate
        </div>
      </div>

      <Suspense
        fallback={
          <div className="w-full flex items-center justify-center" style={{ height: 'calc(100vh - 80px)' }}>
            <div className="w-8 h-8 border-4 border-[#5F7D61] border-t-[#E76F51] rounded-full animate-spin" />
          </div>
        }
      >
        <WikiGraph wiki={wiki} />
      </Suspense>
    </div>
  )
}
