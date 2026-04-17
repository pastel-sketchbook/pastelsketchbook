import { createFileRoute, Link } from '@tanstack/react-router'
import { useState, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { ChunkErrorBoundary } from '../src/components/ui/ChunkErrorBoundary'
import { VideoModal } from '../src/components/VideoModal'
import { fetchWikiBundle, catLabel, fmtViews } from '../src/utils/wiki'
import { motion, AnimatePresence } from 'framer-motion'
import type { WikiBundle } from '../src/types/wiki'

export const Route = createFileRoute('/wiki/learning-plan')({
  component: LearningPlanWithErrorBoundary,
})

function LearningPlanWithErrorBoundary() {
  return (
    <ChunkErrorBoundary chunkName="wiki-learning-plan">
      <LearningPlanPage />
    </ChunkErrorBoundary>
  )
}

const PLAN_CATEGORIES = ['development', 'kubernetes'] as const

interface LearningStep {
  id: string
  title: string
  videoId: string
  summary: string | null
  takeaways: string[]
  topics: string[]
  tags: string[]
  category: string
  views: number
  hasDetail: boolean
}

interface LearningModule {
  name: string
  category: string
  description: string
  steps: LearningStep[]
  detailCount: number
}

function buildLearningPlan(wiki: WikiBundle): LearningModule[] {
  const modules: LearningModule[] = []
  const seen = new Set<string>()

  for (const catName of PLAN_CATEGORIES) {
    const cat = wiki.categories.find((c) => c.name === catName)
    if (!cat) continue

    for (const cluster of cat.clusters) {
      const steps: LearningStep[] = []
      for (const v of cluster.videos) {
        if (seen.has(v.id)) continue
        seen.add(v.id)
        steps.push({
          id: v.id,
          title: v.title,
          videoId: v.id,
          summary: v.detail?.summary ?? null,
          takeaways: v.detail?.takeaways ?? [],
          topics: v.detail?.topics ?? [],
          tags: v.tags ?? [],
          category: catName,
          views: v.views,
          hasDetail: !!v.detail,
        })
      }

      if (steps.length === 0) continue

      const detailCount = steps.filter((s) => s.hasDetail).length
      const topicSnippet = steps
        .flatMap((s) =>
          s.topics.length > 0 ? s.topics.slice(0, 2) : s.tags.slice(0, 2),
        )
        .filter((t, i, a) => a.indexOf(t) === i)
        .slice(0, 4)

      modules.push({
        name: cluster.name,
        category: catName,
        description: `${steps.length} video${steps.length > 1 ? 's' : ''}${topicSnippet.length > 0 ? ` · ${topicSnippet.join(', ')}` : ''}`,
        steps,
        detailCount,
      })
    }

    // Unclustered: videos in the category but not in any cluster
    const unclustered: LearningStep[] = []
    for (const v of cat.videos) {
      if (seen.has(v.id)) continue
      seen.add(v.id)
      unclustered.push({
        id: v.id,
        title: v.title,
        videoId: v.id,
        summary: v.detail?.summary ?? null,
        takeaways: v.detail?.takeaways ?? [],
        topics: v.detail?.topics ?? [],
        tags: v.tags ?? [],
        category: catName,
        views: v.views,
        hasDetail: !!v.detail,
      })
    }

    if (unclustered.length > 0) {
      const detailCount = unclustered.filter((s) => s.hasDetail).length
      modules.push({
        name: `More ${catLabel(catName)}`,
        category: catName,
        description: `${unclustered.length} additional video${unclustered.length > 1 ? 's' : ''}`,
        steps: unclustered,
        detailCount,
      })
    }
  }

  return modules
}

function LearningPlanPage() {
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null)
  const [expandedModule, setExpandedModule] = useState<string | null>(null)
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(
    () => {
      try {
        const saved = localStorage.getItem('ps-learning-completed')
        return saved ? new Set(JSON.parse(saved)) : new Set<string>()
      } catch {
        return new Set<string>()
      }
    },
  )

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

  const modules = useMemo(() => (wiki ? buildLearningPlan(wiki) : []), [wiki])

  const filteredModules = useMemo(
    () =>
      activeFilter
        ? modules.filter((m) => m.category === activeFilter)
        : modules,
    [modules, activeFilter],
  )

  const totalSteps = modules.reduce((s, m) => s + m.steps.length, 0)
  const completedCount = modules
    .flatMap((m) => m.steps)
    .filter((s) => completedSteps.has(s.id)).length

  const toggleComplete = (id: string) => {
    setCompletedSteps((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      try {
        localStorage.setItem(
          'ps-learning-completed',
          JSON.stringify([...next]),
        )
      } catch {}
      return next
    })
  }

  if (isError) {
    return (
      <div className="min-h-screen pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-serif italic text-[#1B3022] mb-2">
            Failed to load learning plan
          </h2>
          <p className="text-sm text-[#1B3022]/50 mb-6">
            {error?.message || 'Something went wrong.'}
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => refetch()}
              className="px-6 py-3 rounded-full bg-[#1B3022] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#2D4536] transition-all"
            >
              Retry
            </button>
            <Link
              to="/wiki"
              search={{ tag: undefined }}
              className="px-6 py-3 rounded-full bg-[#1B3022]/10 text-[#1B3022]/70 text-xs font-bold uppercase tracking-widest hover:bg-[#1B3022]/20 transition-all"
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
      <div className="min-h-screen pt-32 pb-24 px-6 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-[#5F7D61] border-t-[#E76F51] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#1B3022]/60 font-serif italic">
            Building your learning plan...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Back link */}
        <Link
          to="/wiki"
          search={{ tag: undefined }}
          className="inline-flex items-center gap-2 mb-8 text-xs font-bold uppercase tracking-widest text-[#1B3022]/40 hover:text-[#1B3022]/70 transition-colors"
        >
          <svg
            className="w-3 h-3"
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

        {/* Header */}
        <header className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl mb-4 text-[#1B3022] tracking-tighter leading-none font-serif italic"
          >
            Learning Plan
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="text-xl md:text-2xl text-[#1B3022]/60 font-serif italic mx-auto mb-6"
          >
            A structured path through {totalSteps} videos across Development &
            Kubernetes
          </motion.p>

          {/* Progress */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="max-w-xl mx-auto"
          >
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-[#1B3022]/40 mb-2">
              <span>Progress</span>
              <span>
                {completedCount} / {totalSteps}
              </span>
            </div>
            <div className="h-2 bg-[#1B3022]/5 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#5F7D61] rounded-full"
                initial={{ width: 0 }}
                animate={{
                  width:
                    totalSteps > 0
                      ? `${(completedCount / totalSteps) * 100}%`
                      : '0%',
                }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </motion.div>
        </header>

        {/* Category filter */}
        <div className="flex items-center justify-center gap-2 mb-10">
          <button
            onClick={() => setActiveFilter(null)}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
              activeFilter === null
                ? 'bg-[#1B3022] text-white'
                : 'bg-[#1B3022]/5 text-[#1B3022]/60 hover:bg-[#1B3022]/10'
            }`}
          >
            All
          </button>
          {PLAN_CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setActiveFilter(activeFilter === c ? null : c)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                activeFilter === c
                  ? 'bg-[#1B3022] text-white'
                  : 'bg-[#1B3022]/5 text-[#1B3022]/60 hover:bg-[#1B3022]/10'
              }`}
            >
              {catLabel(c)}
            </button>
          ))}
        </div>

        {/* Modules */}
        <div className="space-y-4">
          {filteredModules.map((mod, mi) => {
            const modKey = `${mod.category}-${mod.name}`
            const isExpanded = expandedModule === modKey
            const modCompleted = mod.steps.filter((s) =>
              completedSteps.has(s.id),
            ).length
            const modProgress =
              mod.steps.length > 0 ? modCompleted / mod.steps.length : 0

            return (
              <motion.div
                key={modKey}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * mi }}
                className="bg-white rounded-xl sketch-border border-[#1B3022]/5 overflow-hidden"
              >
                <button
                  onClick={() =>
                    setExpandedModule(isExpanded ? null : modKey)
                  }
                  className="w-full flex items-center gap-4 p-5 text-left hover:bg-[#FAF9F6] transition-colors"
                >
                  {/* Progress ring */}
                  <div className="relative w-10 h-10 flex-shrink-0">
                    <svg
                      viewBox="0 0 36 36"
                      className="w-10 h-10 -rotate-90"
                    >
                      <circle
                        cx="18"
                        cy="18"
                        r="16"
                        fill="none"
                        stroke="#1B3022"
                        strokeOpacity="0.05"
                        strokeWidth="3"
                      />
                      <circle
                        cx="18"
                        cy="18"
                        r="16"
                        fill="none"
                        stroke={
                          modProgress === 1
                            ? '#5F7D61'
                            : '#E76F51'
                        }
                        strokeWidth="3"
                        strokeDasharray={`${modProgress * 100.5} 100.5`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-[#1B3022]/60">
                      {modCompleted}/{mod.steps.length}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-serif italic text-[#1B3022] truncate">
                        {mod.name}
                      </h3>
                      <span className="px-2 py-0.5 rounded-full bg-[#5F7D61]/10 text-[10px] font-bold uppercase tracking-widest text-[#5F7D61] flex-shrink-0">
                        {catLabel(mod.category)}
                      </span>
                      {mod.detailCount > 0 && (
                        <span className="px-2 py-0.5 rounded-full bg-[#E76F51]/10 text-[10px] font-bold uppercase tracking-widest text-[#E76F51] flex-shrink-0">
                          {mod.detailCount} summarized
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#1B3022]/40 truncate">
                      {mod.description}
                    </p>
                  </div>

                  <motion.svg
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-4 h-4 text-[#1B3022]/30 flex-shrink-0"
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
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 space-y-3">
                        {mod.steps.map((step, si) => {
                          const done = completedSteps.has(step.id)
                          return (
                            <div
                              key={step.id}
                              className={`rounded-lg border p-4 transition-all ${
                                done
                                  ? 'border-[#5F7D61]/20 bg-[#5F7D61]/5'
                                  : 'border-[#1B3022]/5 bg-white'
                              }`}
                            >
                              <div className="flex items-start gap-3">
                                {/* Checkbox */}
                                <button
                                  onClick={() => toggleComplete(step.id)}
                                  className={`mt-0.5 w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${
                                    done
                                      ? 'border-[#5F7D61] bg-[#5F7D61]'
                                      : 'border-[#1B3022]/20 hover:border-[#5F7D61]'
                                  }`}
                                >
                                  {done && (
                                    <svg
                                      className="w-3 h-3 text-white"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="3"
                                        d="M5 13l4 4L19 7"
                                      />
                                    </svg>
                                  )}
                                </button>

                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="text-xs text-[#1B3022]/30 font-bold">
                                      {si + 1}.
                                    </span>
                                    <Link
                                      to="/wiki/video/$id"
                                      params={{ id: step.videoId }}
                                      className={`text-sm font-medium transition-colors ${
                                        done
                                          ? 'text-[#1B3022]/40 line-through'
                                          : 'text-[#1B3022] hover:text-[#5F7D61]'
                                      }`}
                                    >
                                      {step.title}
                                    </Link>
                                    {step.hasDetail && (
                                      <svg className="w-3.5 h-3.5 text-[#E76F51] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-label="Has wiki summary">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                      </svg>
                                    )}
                                    <span className="text-[10px] text-[#5F7D61] font-semibold flex-shrink-0">
                                      {fmtViews(step.views)}
                                    </span>
                                  </div>

                                  {step.summary && (
                                    <p className="text-xs text-[#1B3022]/50 mb-2 line-clamp-2">
                                      {step.summary}
                                    </p>
                                  )}

                                  {step.takeaways.length > 0 && (
                                    <div className="text-[11px] text-[#1B3022]/40 mb-2">
                                      <span className="font-bold uppercase tracking-widest">
                                        Key insight:{' '}
                                      </span>
                                      {step.takeaways[0]}
                                    </div>
                                  )}

                                  {/* Topics or tags */}
                                  {(step.topics.length > 0 || step.tags.length > 0) && (
                                    <div className="flex flex-wrap gap-1">
                                      {(step.topics.length > 0
                                        ? step.topics.slice(0, 4)
                                        : step.tags.slice(0, 4)
                                      ).map((t) => (
                                        <span
                                          key={t}
                                          className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-[#E9C46A]/10 text-[#1B3022]/40"
                                        >
                                          {t}
                                        </span>
                                      ))}
                                    </div>
                                  )}
                                </div>

                                {/* Play button */}
                                <button
                                  onClick={() =>
                                    setPlayingVideoId(step.videoId)
                                  }
                                  className="flex-shrink-0 w-7 h-7 rounded-full bg-[#E76F51]/10 text-[#E76F51] flex items-center justify-center hover:bg-[#E76F51]/20 transition-colors"
                                  aria-label={`Play ${step.title}`}
                                >
                                  <svg
                                    className="w-3 h-3 ml-0.5"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M8 5v14l11-7z" />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>

        {filteredModules.length === 0 && (
          <div className="text-center py-16 text-[#1B3022]/40">
            <p className="font-serif italic text-lg">
              No modules found with video details.
            </p>
            <p className="text-xs mt-2">
              Run <code>task wiki:details</code> to generate video summaries.
            </p>
          </div>
        )}
      </div>

      <VideoModal
        videoId={playingVideoId}
        onClose={() => setPlayingVideoId(null)}
      />
    </div>
  )
}
