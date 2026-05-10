import { createFileRoute, Link } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChunkErrorBoundary } from '../src/components/ui/ChunkErrorBoundary'
import { VideoModal } from '../src/components/VideoModal'
import { fetchWikiBundle } from '../src/utils/wiki'
import type { WikiVideo } from '../src/types/wiki'

// -- Types --

interface BookChapter {
  number: number
  title: string
  summary: string
  videoIds: string[]
  tags: string[]
}

interface Book {
  id: string
  title: string
  subtitle: string
  description: string
  chapters: BookChapter[]
}

interface BooksData {
  generatedAt: string
  books: Book[]
}

// -- Data --

async function fetchBooks(): Promise<BooksData> {
  const res = await fetch('/books.json')
  if (!res.ok) throw new Error(`Failed to load books: ${res.status}`)
  return res.json()
}

// -- Route --

export const Route = createFileRoute('/books/')({
  component: BooksWithErrorBoundary,
})

function BooksWithErrorBoundary() {
  return (
    <ChunkErrorBoundary chunkName="books">
      <Books />
    </ChunkErrorBoundary>
  )
}

function Books() {
  const [activeBook, setActiveBook] = useState<string | null>(null)
  const [expandedChapter, setExpandedChapter] = useState<string | null>(null)
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null)

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['books'],
    queryFn: fetchBooks,
    staleTime: 3600000,
  })

  const { data: wiki } = useQuery({
    queryKey: ['wikiBundle'],
    queryFn: fetchWikiBundle,
    staleTime: 3600000,
  })

  const videoLookup = useMemo(() => {
    if (!wiki) return new Map<string, WikiVideo>()
    const map = new Map<string, WikiVideo>()
    for (const cat of wiki.categories) {
      for (const v of cat.videos) {
        map.set(v.id, v)
      }
    }
    return map
  }, [wiki])

  if (isError) {
    return (
      <div className="min-h-screen pt-32 pb-24 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-[#E76F51]/10">
            <svg className="w-8 h-8 text-[#E76F51]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-serif italic text-[#1B3022] mb-2">Failed to load books</h2>
          <p className="text-sm text-[#1B3022]/50 mb-6">Something went wrong. Please try again.</p>
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

  if (isLoading || !data) {
    return (
      <div className="min-h-screen pt-32 pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-12 bg-[#1B3022]/5 rounded-lg w-48" />
            <div className="h-6 bg-[#1B3022]/5 rounded w-96" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={`skel-${i}`} className="h-64 bg-[#1B3022]/5 rounded-xl" />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  const selected = activeBook ? data.books.find((b) => b.id === activeBook) : null
  const totalChapters = data.books.reduce((s, b) => s + b.chapters.length, 0)
  const totalVideos = data.books.reduce(
    (s, b) => s + b.chapters.reduce((cs, c) => cs + c.videoIds.length, 0),
    0,
  )

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
            Books
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-[#1B3022]/60 font-serif italic max-w-2xl mx-auto mb-4"
          >
            Two books synthesized from {totalVideos} videos across {totalChapters} chapters.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-sm text-[#1B3022]/40 max-w-xl mx-auto"
          >
            Book 1 maps the territory — platform blueprints, system design, strategic thinking.
            Book 2 explores the terrain — RFCs, algorithms, memory models, library internals.
          </motion.p>
        </header>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-3 gap-4 mb-12"
        >
          <div className="bg-white p-6 rounded-xl sketch-border border-[#1B3022]/5 text-center">
            <div className="text-3xl font-bold text-[#1B3022]">{data.books.length}</div>
            <div className="text-xs font-bold uppercase tracking-widest text-[#1B3022]/40 mt-1">Books</div>
          </div>
          <div className="bg-white p-6 rounded-xl sketch-border border-[#1B3022]/5 text-center">
            <div className="text-3xl font-bold text-[#1B3022]">{totalChapters}</div>
            <div className="text-xs font-bold uppercase tracking-widest text-[#1B3022]/40 mt-1">Chapters</div>
          </div>
          <div className="bg-white p-6 rounded-xl sketch-border border-[#1B3022]/5 text-center">
            <div className="text-3xl font-bold text-[#1B3022]">{totalVideos}</div>
            <div className="text-xs font-bold uppercase tracking-widest text-[#1B3022]/40 mt-1">Source Videos</div>
          </div>
        </motion.div>

        {/* Book Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {data.books.map((book, i) => (
            <motion.button
              key={book.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              onClick={() => setActiveBook(activeBook === book.id ? null : book.id)}
              className={`text-left p-8 rounded-xl sketch-border transition-all duration-300 ${
                activeBook === book.id
                  ? 'bg-[#1B3022] text-white shadow-lg scale-[1.02]'
                  : 'bg-white border-[#1B3022]/5 hover:shadow-md'
              }`}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  activeBook === book.id ? 'bg-white/10' : 'bg-[#D4A373]/10'
                }`}>
                  <svg className={`w-6 h-6 ${activeBook === book.id ? 'text-white' : 'text-[#D4A373]'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    {i === 0 ? (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 7.5h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.384 3.18A1 1 0 015 17.482V6.518a1 1 0 011.036-.868l5.384 3.18m0 0l5.384-3.18A1 1 0 0118 6.518v10.964a1 1 0 01-1.036.868l-5.384-3.18m0-6.346v6.346" />
                    )}
                  </svg>
                </div>
                <div>
                  <h3 className={`font-serif italic text-xl mb-1 ${activeBook === book.id ? 'text-white' : 'text-[#1B3022]'}`}>
                    {book.title}
                  </h3>
                  <p className={`text-xs font-bold uppercase tracking-widest ${activeBook === book.id ? 'text-white/50' : 'text-[#D4A373]'}`}>
                    {book.subtitle}
                  </p>
                </div>
              </div>
              <p className={`text-sm leading-relaxed mb-4 ${activeBook === book.id ? 'text-white/70' : 'text-[#1B3022]/60'}`}>
                {book.description}
              </p>
              <div className="flex gap-4 text-xs font-bold uppercase tracking-widest">
                <span className={activeBook === book.id ? 'text-white/60' : 'text-[#5F7D61]'}>
                  {book.chapters.length} chapters
                </span>
                <span className={activeBook === book.id ? 'text-white/60' : 'text-[#D4A373]'}>
                  {book.chapters.reduce((s, c) => s + c.videoIds.length, 0)} videos
                </span>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Chapter List */}
        <AnimatePresence mode="wait">
          {selected && (
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-sm font-bold uppercase tracking-widest text-[#1B3022]/40 mb-4">
                Table of Contents — {selected.title}
              </h2>
              <div className="space-y-3">
                {selected.chapters.map((ch) => {
                  const chKey = `${selected.id}-${ch.number}`
                  const isExpanded = expandedChapter === chKey
                  return (
                    <div
                      key={chKey}
                      className="bg-white rounded-xl sketch-border border-[#1B3022]/5 overflow-hidden"
                    >
                      <button
                        onClick={() => setExpandedChapter(isExpanded ? null : chKey)}
                        className="w-full flex items-center justify-between p-5 text-left hover:bg-[#FAF9F6] transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <span className="text-xs font-bold text-[#D4A373] w-8 flex-shrink-0">
                            {String(ch.number).padStart(2, '0')}
                          </span>
                          <h3 className="font-serif italic text-[#1B3022]">{ch.title}</h3>
                          <span className="px-2 py-0.5 rounded-full bg-[#5F7D61]/10 text-[10px] font-bold uppercase tracking-widest text-[#5F7D61]">
                            {ch.videoIds.length} videos
                          </span>
                        </div>
                        <motion.svg
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="w-4 h-4 text-[#1B3022]/30 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </motion.svg>
                      </button>
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 pb-5 border-t border-[#1B3022]/5">
                              <p className="text-sm text-[#1B3022]/70 leading-relaxed mt-4 mb-4">
                                {ch.summary}
                              </p>
                              <div className="flex flex-wrap gap-1.5 mb-4">
                                {ch.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#E9C46A]/10 text-[#E9C46A] border border-[#E9C46A]/20"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                              <div className="space-y-4">
                                {ch.videoIds.map((vid) => {
                                  const info = videoLookup.get(vid)
                                  const detail = info?.detail
                                  return (
                                  <div
                                    key={vid}
                                    className="rounded-lg border border-[#1B3022]/5 overflow-hidden"
                                  >
                                    <div className="flex items-center gap-3 py-3 px-3 hover:bg-[#FAF9F6] transition-colors group">
                                      <button
                                        onClick={() => setPlayingVideoId(vid)}
                                        className="flex-shrink-0 w-7 h-7 rounded-full bg-[#E76F51]/10 text-[#E76F51] flex items-center justify-center hover:bg-[#E76F51]/20 transition-colors"
                                        aria-label={`Play video ${info?.title ?? vid}`}
                                      >
                                        <svg className="w-3 h-3 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                                          <path d="M8 5v14l11-7z" />
                                        </svg>
                                      </button>
                                      <Link
                                        to="/wiki/video/$id"
                                        params={{ id: vid }}
                                        className="text-base font-semibold text-[#1B3022] group-hover:text-[#5F7D61] transition-colors truncate flex items-center gap-1.5"
                                      >
                                        {info?.title ?? vid}
                                        {detail && (
                                          <svg className="w-4 h-4 text-[#E76F51] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-label="Has wiki detail">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                          </svg>
                                        )}
                                      </Link>
                                    </div>
                                    {detail && (
                                      <div className="px-3 pb-3 border-t border-[#1B3022]/5">
                                        <p className="text-[17px] text-[#1B3022] leading-relaxed font-serif font-semibold mt-2 mb-2">
                                          {detail.summary}
                                        </p>
                                        {detail.takeaways.length > 0 && (
                                          <ul className="space-y-1.5">
                                            {detail.takeaways.map((t, i) => (
                                              <li key={i} className="flex gap-2 text-[#1B3022]/80 leading-relaxed">
                                                <span className="flex-shrink-0 w-4 h-4 rounded-full bg-[#5F7D61]/10 text-[#5F7D61] text-[11px] font-bold flex items-center justify-center mt-0.5">
                                                  {i + 1}
                                                </span>
                                                <span>{t}</span>
                                              </li>
                                            ))}
                                          </ul>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                  )
                                })}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <VideoModal
        videoId={playingVideoId}
        onClose={() => setPlayingVideoId(null)}
      />
    </div>
  )
}
