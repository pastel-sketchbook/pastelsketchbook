import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { ChunkErrorBoundary } from '../src/components/ui/ChunkErrorBoundary'
import { motion } from 'framer-motion'
import { fetchWikiBundle, fmtViews, fmtDate, catLabel } from '../src/utils/wiki'
import type { WikiVideo } from '../src/types/wiki'

export const Route = createFileRoute('/wiki/video/$id')({
  component: VideoDetailWithErrorBoundary,
})

function VideoDetailWithErrorBoundary() {
  return (
    <ChunkErrorBoundary chunkName="wiki-video-detail">
      <VideoDetail />
    </ChunkErrorBoundary>
  )
}

function findVideo(
  categories: { name: string; videos: WikiVideo[] }[],
  id: string,
): WikiVideo | null {
  for (const cat of categories) {
    const v = cat.videos.find((v) => v.id === id)
    if (v) return v
  }
  return null
}

function VideoDetail() {
  const { id } = Route.useParams()
  const [isPlaying, setIsPlaying] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(`https://www.youtube.com/watch?v=${id}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy URL:', err)
    }
  }

  const {
    data: wiki,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['wikiBundle'],
    queryFn: fetchWikiBundle,
    staleTime: 3600000,
  })

  if (isLoading || !wiki) {
    return (
      <div className="min-h-screen pt-32 pb-24 px-6">
        <div className="max-w-6xl mx-auto animate-pulse space-y-6">
          <div className="h-4 bg-[#1B3022]/5 rounded w-32" />
          <div className="h-10 bg-[#1B3022]/5 rounded-lg w-3/4" />
          <div className="h-4 bg-[#1B3022]/5 rounded w-48" />
          <div className="h-32 bg-[#1B3022]/5 rounded-xl mt-8" />
          <div className="space-y-3 mt-6">
            <div className="h-4 bg-[#1B3022]/5 rounded w-full" />
            <div className="h-4 bg-[#1B3022]/5 rounded w-5/6" />
            <div className="h-4 bg-[#1B3022]/5 rounded w-4/6" />
          </div>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="min-h-screen pt-32 pb-24 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl font-serif italic text-[#1B3022] mb-2">
            Failed to load video
          </h2>
          <p className="text-sm text-[#1B3022]/50 mb-6">
            Something went wrong. Please try again.
          </p>
          <Link
            to="/wiki"
            search={{ tag: undefined }}
            className="px-6 py-3 rounded-full bg-[#1B3022] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#2D4536] transition-all"
          >
            Back to Wiki
          </Link>
        </div>
      </div>
    )
  }

  const video = findVideo(wiki.categories, id)

  if (!video) {
    return (
      <div className="min-h-screen pt-32 pb-24 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-[#E9C46A]/15">
            <svg
              className="w-8 h-8 text-[#E9C46A]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-serif italic text-[#1B3022] mb-2">
            Video not found
          </h2>
          <p className="text-sm text-[#1B3022]/50 mb-6">
            No video with ID &ldquo;{id}&rdquo; exists in the wiki.
          </p>
          <Link
            to="/wiki"
            search={{ tag: undefined }}
            className="px-6 py-3 rounded-full bg-[#1B3022] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#2D4536] transition-all"
          >
            Back to Wiki
          </Link>
        </div>
      </div>
    )
  }

  const detail = video.detail

  return (
    <div className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#1B3022]/40 mb-8"
        >
          <Link
            to="/wiki"
            search={{ tag: undefined }}
            className="hover:text-[#5F7D61] transition-colors"
          >
            Wiki
          </Link>
          <span>/</span>
          {video.category && (
            <>
              <Link
                to="/wiki"
                search={{ tag: undefined }}
                className="hover:text-[#5F7D61] transition-colors"
              >
                {catLabel(video.category)}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="text-[#1B3022]/60 truncate max-w-[200px]">
            {video.title}
          </span>
        </motion.nav>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl text-[#1B3022] font-serif italic leading-tight mb-4"
        >
          {video.title}
        </motion.h1>

        {/* Meta row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap items-center gap-3 text-sm text-[#1B3022]/60 mb-8"
        >
          {video.category && (
            <span className="px-3 py-1 rounded-full bg-[#5F7D61]/10 text-[#5F7D61] text-xs font-bold uppercase tracking-wider">
              {catLabel(video.category)}
            </span>
          )}
          <span>{fmtViews(video.views)} views</span>
          <span className="text-[#1B3022]/30">&middot;</span>
          <span>{fmtDate(video.date)}</span>
        </motion.div>

        {/* Video player */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-10"
        >
          <div className="relative rounded-xl overflow-hidden sketch-border border-[#1B3022]/5">
            {isPlaying ? (
              <iframe
                src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
                className="w-full aspect-video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <button
                onClick={() => setIsPlaying(true)}
                className="block w-full relative group cursor-pointer"
                aria-label={`Play ${video.title}`}
              >
                <img
                  src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                  alt={video.title}
                  className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-[#1B3022]/10 group-hover:bg-[#1B3022]/20 transition-colors">
                  <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <svg
                      className="w-8 h-8 text-[#E76F51] ml-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </button>
            )}
          </div>
          <div className="mt-3 flex items-center justify-center gap-4">
            <a
              href={`https://youtu.be/${video.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#5F7D61] hover:text-[#1B3022] transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              Watch on YouTube
            </a>
            <button
              onClick={handleCopyUrl}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#5F7D61] hover:text-[#1B3022] transition-colors"
              aria-label="Copy YouTube URL"
            >
              {copied ? (
                <>
                  <svg className="w-4 h-4 text-[#5F7D61]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.193-9.193a4.5 4.5 0 00-6.364 0l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                  </svg>
                  Copy URL
                </>
              )}
            </button>
          </div>
        </motion.div>

        {detail ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            {/* Summary */}
            <section>
              <h2 className="text-sm font-bold uppercase tracking-widest text-[#1B3022]/40 mb-3">
                Summary
              </h2>
              <div className="bg-white rounded-xl sketch-border border-[#1B3022]/5 p-6">
                <p className="text-[#1B3022] leading-relaxed font-serif">
                  {detail.summary}
                </p>
              </div>
            </section>

            {/* Key Takeaways */}
            {detail.takeaways.length > 0 && (
              <section>
                <h2 className="text-sm font-bold uppercase tracking-widest text-[#1B3022]/40 mb-3">
                  Key Takeaways
                </h2>
                <div className="space-y-3">
                  {detail.takeaways.map((t, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-xl sketch-border border-[#1B3022]/5 p-5 flex gap-4"
                    >
                      <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#E76F51]/10 text-[#E76F51] text-xs font-bold flex items-center justify-center mt-0.5">
                        {i + 1}
                      </span>
                      <span className="text-[#1B3022]/80 leading-relaxed">
                        {t}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Topics Covered */}
            {detail.topics.length > 0 && (
              <section>
                <h2 className="text-sm font-bold uppercase tracking-widest text-[#1B3022]/40 mb-3">
                  Topics Covered
                </h2>
                <div className="flex flex-wrap gap-2">
                  {detail.topics.map((topic) => (
                    <span
                      key={topic}
                      className="px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#E9C46A]/15 text-[#1B3022]/70 border border-[#E9C46A]/30"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl sketch-border border-[#1B3022]/5 p-8 text-center"
          >
            <p className="text-sm text-[#1B3022]/50 font-serif italic">
              Detailed summary not yet available for this video.
            </p>
          </motion.div>
        )}

        {/* Tags */}
        {video.tags && video.tags.length > 0 && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8"
          >
            <h2 className="text-sm font-bold uppercase tracking-widest text-[#1B3022]/40 mb-3">
              Tags
            </h2>
            <div className="flex flex-wrap gap-2">
              {video.tags.map((tag) => (
                <Link
                  key={tag}
                  to="/wiki"
                  search={{ tag }}
                  className="px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/50 border border-[#5F7D61]/20 text-[#5F7D61] hover:bg-[#5F7D61] hover:text-white transition-colors cursor-pointer"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </motion.section>
        )}

        {/* Back link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="mt-16 pt-8 border-t border-[#1B3022]/5 flex justify-between items-center"
        >
          <Link
            to="/wiki"
            search={{ tag: undefined }}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#1B3022]/40 hover:text-[#5F7D61] transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Wiki
          </Link>
          <span className="text-xs text-[#1B3022]/30">
            {video.id}
          </span>
        </motion.div>
      </div>
    </div>
  )
}
