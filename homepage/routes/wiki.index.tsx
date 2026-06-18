import { createFileRoute, Link, useSearch } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { ChunkErrorBoundary } from '../src/components/ui/ChunkErrorBoundary'
import { VideoModal } from '../src/components/VideoModal'
import { motion, AnimatePresence } from 'framer-motion'
import { fetchWikiBundle, fmtViews, fmtDate, catLabel } from '../src/utils/wiki'
import { fetchBooks, buildCategoryBookLookup } from '../src/utils/books'
import type { WikiBundle } from '../src/types/wiki'
import type { BookRef } from '../src/utils/books'

export const Route = createFileRoute('/wiki/')({
  component: WikiWithErrorBoundary,
  validateSearch: (search: Record<string, unknown>) => ({
    tag: typeof search.tag === 'string' ? search.tag : undefined,
  }),
})

function WikiWithErrorBoundary() {
  return (
    <ChunkErrorBoundary chunkName="wiki">
      <Wiki />
    </ChunkErrorBoundary>
  )
}

function Wiki() {
  const { tag } = useSearch({ from: '/wiki/' })
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [expandedClusters, setExpandedClusters] = useState<Set<string>>(
    new Set(),
  )
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null)

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

  const { data: booksData } = useQuery({
    queryKey: ['books'],
    queryFn: fetchBooks,
    staleTime: 3600000,
  })

  const categoryBookLookup = (() => {
    if (!booksData || !wiki) return new Map<string, BookRef[]>()
    return buildCategoryBookLookup(booksData, wiki)
  })()

  // Resolve ?tag= search param to a category
  useEffect(() => {
    if (!tag || !wiki) return
    const match = wiki.categories.find((c) =>
      c.topTags?.some((t) => t.tag.toLowerCase() === tag.toLowerCase()),
    )
    if (match) setActiveCategory(match.name)
  }, [tag, wiki])

  if (isError) {
    return (
      <div className="min-h-screen pt-32 pb-24 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-[#E76F51]/10">
            <svg
              className="w-8 h-8 text-[#E76F51]"
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
          <h2 className="text-2xl font-serif italic text-[#1B3022] mb-2">
            Failed to load wiki
          </h2>
          <p className="text-sm text-[#1B3022]/50 mb-6 max-w-md mx-auto">
            Something went wrong loading the wiki. Please try again.
          </p>
          <button
            onClick={() => refetch()}
            className="px-6 py-3 rounded-full bg-[#1B3022] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#2D4536] transition-all"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  if (isLoading || !wiki) {
    return (
      <div className="min-h-screen pt-32 pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-12 bg-[#1B3022]/5 rounded-lg w-48" />
            <div className="h-6 bg-[#1B3022]/5 rounded w-96" />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-12">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={`skel-${i}`}
                  className="h-32 bg-[#1B3022]/5 rounded-xl"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  const totalViews = wiki.categories.reduce((s, c) => s + c.totalViews, 0)
  const detailIds = new Set(
    wiki.categories.flatMap((c) => c.videos.filter((v) => v.detail).map((v) => v.id)),
  )
  const selected = activeCategory
    ? wiki.categories.find((c) => c.name === activeCategory)
    : null

  const toggleCluster = (name: string) => {
    setExpandedClusters((prev) => {
      const next = new Set(prev)
      if (next.has(name)) next.delete(name)
      else next.add(name)
      return next
    })
  }

  return (
    <div className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl mb-6 text-[#1B3022] tracking-tighter leading-none font-serif italic"
          >
            Wiki
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-[#1B3022]/60 font-serif italic max-w-2xl mx-auto mb-8"
          >
            A living knowledge base of {wiki.totalVideos} videos across{' '}
            {wiki.categories.length} categories.
          </motion.p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link
              to="/wiki/learning-plan"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#5F7D61] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#4a6a4c] hover:scale-105 transition-all shadow-md"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              Learning Plan
            </Link>
            <Link
              to="/wiki/graph"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1B3022] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#2D4536] hover:scale-105 transition-all shadow-md"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="2" strokeWidth="2" />
                <circle cx="5" cy="6" r="2" strokeWidth="2" />
                <circle cx="19" cy="6" r="2" strokeWidth="2" />
                <circle cx="5" cy="18" r="2" strokeWidth="2" />
                <circle cx="19" cy="18" r="2" strokeWidth="2" />
                <path strokeWidth="1.5" d="M7 7l3 3M14 9l3-2M7 17l3-3M14 15l3 2" />
              </svg>
              Explore Graph View
            </Link>
          </div>
        </header>

        {/* Overview Stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-3 gap-4 mb-12"
        >
          <div className="bg-white p-6 rounded-xl sketch-border border-[#1B3022]/5 text-center">
            <div className="text-3xl font-bold text-[#1B3022]">
              {wiki.totalVideos}
            </div>
            <div className="text-xs font-bold uppercase tracking-widest text-[#1B3022]/40 mt-1">
              Videos
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl sketch-border border-[#1B3022]/5 text-center">
            <div className="text-3xl font-bold text-[#1B3022]">
              {fmtViews(totalViews)}
            </div>
            <div className="text-xs font-bold uppercase tracking-widest text-[#1B3022]/40 mt-1">
              Total Views
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl sketch-border border-[#1B3022]/5 text-center">
            <div className="text-3xl font-bold text-[#1B3022]">
              {wiki.categories.length}
            </div>
            <div className="text-xs font-bold uppercase tracking-widest text-[#1B3022]/40 mt-1">
              Categories
            </div>
          </div>
        </motion.div>

        {/* Category Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
          {[...wiki.categories].sort((a, b) => b.videoCount - a.videoCount).map((cat, i) => (
            <motion.button
              key={cat.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.05 }}
              onClick={() =>
                setActiveCategory(
                  activeCategory === cat.name ? null : cat.name,
                )
              }
              className={`text-left p-6 rounded-xl sketch-border transition-all duration-300 ${
                activeCategory === cat.name
                  ? 'bg-[#1B3022] text-white shadow-lg scale-[1.02]'
                  : 'bg-white border-[#1B3022]/5 hover:bg-white hover:shadow-md'
              }`}
            >
              <h3
                className={`font-serif italic text-lg mb-1 ${activeCategory === cat.name ? 'text-white' : 'text-[#1B3022]'}`}
              >
                {catLabel(cat.name)}
              </h3>
              <p
                className={`text-xs mb-3 line-clamp-2 ${activeCategory === cat.name ? 'text-white/70' : 'text-[#1B3022]/50'}`}
              >
                {cat.description}
              </p>
              <div className="flex gap-4 text-xs font-bold uppercase tracking-widest">
                <span
                  className={
                    activeCategory === cat.name
                      ? 'text-white/60'
                      : 'text-[#5F7D61]'
                  }
                >
                  {cat.videoCount} videos
                </span>
                <span
                  className={
                    activeCategory === cat.name
                      ? 'text-white/60'
                      : 'text-[#D4A373]'
                  }
                >
                  {fmtViews(cat.totalViews)} views
                </span>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Cross-Category Tags */}
        {!activeCategory && wiki.crossCategoryTags.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-12"
          >
            <h2 className="text-sm font-bold uppercase tracking-widest text-[#1B3022]/40 mb-4">
              Cross-Category Tags
            </h2>
            <div className="space-y-2">
              {wiki.crossCategoryTags.map((ct) => (
                <CrossCategoryTag key={ct.tag} ct={ct} detailIds={detailIds} />
              ))}
            </div>
          </motion.div>
        )}

        {/* Category Detail */}
        <AnimatePresence mode="wait">
          {selected && (
            <motion.div
              key={selected.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {/* Related Categories */}
              {selected.related.length > 0 && (
                <div className="flex items-center gap-2 mb-6 text-xs">
                  <span className="font-bold uppercase tracking-widest text-[#1B3022]/40">
                    See also:
                  </span>
                  {selected.related.map((rel) => (
                    <button
                      key={rel}
                      onClick={() => setActiveCategory(rel)}
                      className="px-3 py-1 rounded-full bg-[#5F7D61]/10 text-[#5F7D61] font-bold uppercase tracking-wider hover:bg-[#5F7D61]/20 transition-colors"
                    >
                      {catLabel(rel)}
                    </button>
                  ))}
                </div>
              )}

              {/* Topic Clusters */}
              {selected.clusters.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-sm font-bold uppercase tracking-widest text-[#1B3022]/40 mb-4">
                    Topic Clusters
                  </h2>
                  <div className="space-y-3">
                    {selected.clusters.map((cluster) => (
                      <div
                        key={cluster.name}
                        className="bg-white rounded-xl sketch-border border-[#1B3022]/5 overflow-hidden"
                      >
                        <button
                          onClick={() => toggleCluster(cluster.name)}
                          className="w-full flex items-center justify-between p-4 text-left hover:bg-white/50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <h3 className="font-serif italic text-[#1B3022]">
                              {cluster.name}
                            </h3>
                            <span className="px-2 py-0.5 rounded-full bg-[#5F7D61]/10 text-[10px] font-bold uppercase tracking-widest text-[#5F7D61]">
                              {cluster.videos.length} videos
                            </span>
                          </div>
                          <motion.svg
                            animate={{
                              rotate: expandedClusters.has(cluster.name)
                                ? 180
                                : 0,
                            }}
                            transition={{ duration: 0.2 }}
                            className="w-4 h-4 text-[#1B3022]/30"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 9l-7 7-7-7"
                            />
                          </motion.svg>
                        </button>
                        <AnimatePresence>
                          {expandedClusters.has(cluster.name) && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="px-4 pb-4 space-y-2">
                                {cluster.videos.map((v) => (
                                  <div
                                    key={v.id}
                                    className="py-2 px-3 rounded-lg hover:bg-[#FAF9F6] transition-colors group"
                                  >
                                    <div className="flex items-center justify-between">
                                      <button
                                        onClick={() => setPlayingVideoId(v.id)}
                                        className="flex-shrink-0 w-7 h-7 rounded-full bg-[#E76F51]/10 text-[#E76F51] flex items-center justify-center hover:bg-[#E76F51]/20 transition-colors mr-3"
                                        aria-label={`Play ${v.title}`}
                                      >
                                        <svg className="w-3 h-3 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                                          <path d="M8 5v14l11-7z" />
                                        </svg>
                                      </button>
                                      <Link
                                        to="/wiki/video/$id"
                                        params={{ id: v.id }}
                                        className="text-sm text-[#1B3022] group-hover:text-[#5F7D61] transition-colors truncate mr-4 flex items-center gap-1.5 flex-1"
                                      >
                                        {v.title}
                                        {v.detail && (
                                          <svg className="w-4 h-4 text-[#E76F51] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-label="Has wiki summary">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                          </svg>
                                        )}
                                      </Link>
                                      <span className="text-xs text-[#5F7D61] font-semibold flex-shrink-0">
                                        {fmtViews(v.views)} views
                                      </span>
                                    </div>
                                    {v.detail && (
                                      <p className="text-xs text-[#1B3022]/50 mt-1.5 ml-10 line-clamp-2 leading-relaxed">
                                        {v.detail.summary}
                                      </p>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Top Tags */}
              {selected.topTags.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-sm font-bold uppercase tracking-widest text-[#1B3022]/40 mb-4">
                    Top Tags
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {selected.topTags.map((t) => (
                      <span
                        key={t.tag}
                        className="px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/50 border border-[#5F7D61]/20 text-[#5F7D61]"
                      >
                        {t.tag}{' '}
                        <span className="text-[#1B3022]/30">({t.count})</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Referenced in Books */}
              {(() => {
                const bookRefs = categoryBookLookup.get(selected.name)
                if (!bookRefs || bookRefs.length === 0) return null
                const uniqueBooks = Array.from(new Set(bookRefs.map((r) => r.bookId)))
                  .map((bid) => bookRefs.find((r) => r.bookId === bid)!)
                return (
                  <div className="mb-8">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-[#1B3022]/40 mb-4">
                      Referenced in Books
                    </h2>
                    <div className="space-y-2">
                      {uniqueBooks.map((ref) => (
                        <Link
                          key={ref.bookId}
                          to="/books"
                          className="block bg-white rounded-xl sketch-border border-[#1B3022]/5 p-4 hover:shadow-md transition-all group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-[#D4A373]/10 flex items-center justify-center flex-shrink-0">
                              <svg className="w-4 h-4 text-[#D4A373]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 7.5h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
                              </svg>
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-[#1B3022] group-hover:text-[#5F7D61] transition-colors">
                                {ref.bookTitle}
                              </p>
                              <p className="text-xs text-[#1B3022]/50">
                                {bookRefs.filter((r) => r.bookId === ref.bookId).length} chapters referenced
                              </p>
                            </div>
                            <svg className="w-4 h-4 text-[#1B3022]/20 ml-auto flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )
              })()}

              {/* All Videos */}
              <div>
                <h2 className="text-sm font-bold uppercase tracking-widest text-[#1B3022]/40 mb-4">
                  All Videos ({selected.videos.length})
                </h2>
                <div className="bg-white rounded-xl sketch-border border-[#1B3022]/5 overflow-hidden">
                  <div className="divide-y divide-[#1B3022]/5">
                    {selected.videos.map((v, i) => (
                      <div
                        key={v.id}
                        className="p-4 hover:bg-[#FAF9F6] transition-colors group"
                      >
                        <div className="flex items-center gap-4">
                          <span className="text-xs text-[#1B3022]/20 font-bold w-8 text-right flex-shrink-0">
                            {i + 1}
                          </span>
                          <button
                            onClick={() => setPlayingVideoId(v.id)}
                            className="flex-shrink-0 w-7 h-7 rounded-full bg-[#E76F51]/10 text-[#E76F51] flex items-center justify-center hover:bg-[#E76F51]/20 transition-colors"
                            aria-label={`Play ${v.title}`}
                          >
                            <svg className="w-3 h-3 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </button>
                          <Link
                            to="/wiki/video/$id"
                            params={{ id: v.id }}
                            className="text-sm text-[#1B3022] group-hover:text-[#5F7D61] transition-colors flex-1 truncate flex items-center gap-1.5"
                          >
                            {v.title}
                            {v.detail && (
                              <svg className="w-4 h-4 text-[#E76F51] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-label="Has wiki summary">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                            )}
                          </Link>
                          <span className="text-xs text-[#5F7D61] font-semibold flex-shrink-0">
                            {fmtViews(v.views)}
                          </span>
                          <span className="text-xs text-[#1B3022]/60 flex-shrink-0 hidden sm:block">
                            {fmtDate(v.date)}
                          </span>
                        </div>
                        {v.detail && (
                          <p className="text-xs text-[#1B3022]/50 mt-1.5 ml-[4.5rem] line-clamp-2 leading-relaxed">
                            {v.detail.summary}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <div className="mt-16 text-center text-xs text-[#1B3022]/30">
          Last updated: {fmtDate(wiki.generatedAt)}
        </div>
      </div>

      <VideoModal
        videoId={playingVideoId}
        onClose={() => setPlayingVideoId(null)}
      />
    </div>
  )
}

function CrossCategoryTag({
  ct,
  detailIds,
}: {
  ct: WikiBundle['crossCategoryTags'][number]
  detailIds: Set<string>
}) {
  const [open, setOpen] = useState(false)
  const videos = ct.videos ?? []

  return (
    <div className="rounded-xl sketch-border border-[#1B3022]/5 bg-white overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-[#E9C46A]/5 transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1B3022]/70">
            {ct.tag}
          </span>
          <span className="text-xs text-[#1B3022]/40">
            {videos.length} video{videos.length !== 1 ? 's' : ''} across{' '}
            {ct.categories.map(catLabel).join(', ')}
          </span>
        </div>
        <svg
          className={`w-4 h-4 text-[#1B3022]/30 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <AnimatePresence>
        {open && videos.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-3 space-y-2 border-t border-[#1B3022]/5">
              {videos.map((v) => (
                <div
                  key={v.id}
                  className="flex items-center justify-between py-2 first:pt-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="px-2 py-0.5 rounded-full bg-[#5F7D61]/10 text-[#5F7D61] text-[10px] font-bold uppercase tracking-wider flex-shrink-0">
                      {catLabel(v.category)}
                    </span>
                    <Link
                      to="/wiki/video/$id"
                      params={{ id: v.id }}
                      className="text-[13px] text-[#1B3022] font-serif italic hover:text-[#5F7D61] transition-colors truncate"
                    >
                      {v.title}
                      {detailIds.has(v.id) && (
                        <svg
                          className="inline-block w-3.5 h-3.5 ml-1.5 -mt-0.5 text-[#E76F51]"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          viewBox="0 0 24 24"
                          aria-label="Wiki detail available"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                        </svg>
                      )}
                    </Link>
                  </div>
                  <span className="text-xs text-[#1B3022]/40 flex-shrink-0 ml-3">
                    {fmtViews(v.views)} views
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
