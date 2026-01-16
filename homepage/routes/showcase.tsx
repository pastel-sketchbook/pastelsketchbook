import { createFileRoute } from "@tanstack/react-router"
import { useState, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { VideoGallery } from "../src/components/VideoGallery"
import { VideoModal } from "../src/components/VideoModal"
import { VideoSkeleton } from "../src/components/VideoSkeleton"
import { VideoSearch } from "../src/components/VideoSearch"
import { ChunkErrorBoundary } from "../src/components/ui/ChunkErrorBoundary"
import { motion, AnimatePresence } from "framer-motion"
import { allVideoIds, videoCategories } from "../src/config/videos"
import { logger, MetricsLogger } from "../src/lib/logger"

const metricsLogger = MetricsLogger.getInstance()

export const Route = createFileRoute("/showcase")({
    component: ShowcaseWithErrorBoundary,
});

function ShowcaseWithErrorBoundary() {
  return (
    <ChunkErrorBoundary chunkName="showcase">
      <Showcase />
    </ChunkErrorBoundary>
  )
}

interface MetadataResult {
    videos: any[]
    source: 'api' | 'fallback' | 'placeholder'
    error?: string
}

async function fetchVideoMetadata(): Promise<MetadataResult> {
    const ids = allVideoIds.join(',')

    try {
        // 1. Try Vercel serverless API (server-side YouTube API call with caching)
        const apiResponse = await fetch(`/api/videos/metadata?ids=${ids}`)

        if (apiResponse.ok) {
            const data = await apiResponse.json()
            logger.info('Fetched metadata from API', {
                videoCount: data.videos.length,
                source: 'api'
            })
            return { videos: data.videos, source: 'api' }
        }

        if (apiResponse.status === 429) {
            throw new Error('API rate limited - too many requests')
        }

        throw new Error(`API returned ${apiResponse.status}`)
    } catch (error) {
        const errorMsg = error instanceof Error ? error.message : String(error)
        logger.warn('API route failed, falling back to static metadata', {
            error: errorMsg
        })

        // 2. Fallback: static JSON file
        try {
            const fallbackResponse = await fetch('/videos-metadata.json')
            if (fallbackResponse.ok) {
                const data = await fallbackResponse.json()
                logger.info('Using fallback metadata', {
                    videoCount: data.videos.length,
                    source: 'fallback'
                })
                return { videos: data.videos, source: 'fallback', error: errorMsg }
            }
        } catch (fallbackError) {
            const fallbackErrorMsg =
                fallbackError instanceof Error ? fallbackError.message : String(fallbackError)
            logger.error('Fallback metadata also failed', fallbackErrorMsg)
        }

        // 3. Last resort: return placeholder data
        return {
            videos: allVideoIds.map((videoId) => ({
                id: videoId,
                title: 'Metadata unavailable',
                views: 0,
                date: new Date().toISOString()
            })),
            source: 'placeholder',
            error: 'No metadata source available'
        }
    }
}

function formatYouTubeDate(dateString: string): string {
    const parsed = new Date(dateString);
    return isNaN(parsed.getTime()) ? new Date().toISOString() : parsed.toISOString();
}

function Showcase() {
    const [activeTab, setActiveTab] = useState<"korea" | "finance" | "kubernetes" | "development" | "programming" | "all">("all")
    const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null)
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set())
    const [sortBy, setSortBy] = useState<"date" | "views">("date")
    const [showAlert, setShowAlert] = useState(true)

    interface VideoItem {
        id: string
        title: string
        views: number
        date: string
        category?: string
        tags?: string[]
    }

    const { data: result, isLoading } = useQuery({
        queryKey: ['videoMetadata'],
        queryFn: fetchVideoMetadata,
        staleTime: 3600000
    })

    const videoMetadata = result?.videos || []
    const metadataSource = result?.source || 'unknown'
    const metadataError = result?.error

    // Auto-dismiss alert after 30 seconds
    useEffect(() => {
        if (metadataError && showAlert) {
            const timer = setTimeout(() => setShowAlert(false), 30000)
            return () => clearTimeout(timer)
        }
    }, [metadataError, showAlert])

    const allItems: VideoItem[] = videoMetadata.map((item: any) => ({
        ...item,
        date: formatYouTubeDate(item.date),
        category: videoCategories[item.id]
    }));

    // Extract all unique tags from videos
    const availableTags = Array.from(
        new Set(allItems.flatMap(item => item.tags || []))
    ).sort();

    const filteredItems = (activeTab === "all"
        ? allItems
        : allItems.filter(item => item.category === activeTab)
    ).filter(item => {
        // Filter by title search
        const titleMatch = item.title.toLowerCase().includes(searchQuery.toLowerCase())
        
        // Filter by selected tags: if any tags selected, video must have at least one
        const tagsMatch = selectedTags.size === 0 
            ? true 
            : item.tags?.some(tag => selectedTags.has(tag)) ?? false
        
        return titleMatch && tagsMatch
    }).sort((a, b) => {
        if (sortBy === "date") {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        }
        return b.views - a.views;
    });

    const tabs = [
        { id: "all", label: "All Seeds" },
        { id: "korea", label: "Viaje a Corea" },
        { id: "finance", label: "Finance" },
        { id: "kubernetes", label: "Kubernetes" },
        { id: "development", label: "Development" },
        { id: "programming", label: "프로그래밍" },
    ];

    return (
        <div className="bg-[#FAF9F6] min-h-screen pt-32 pb-24 px-6">
            <AnimatePresence>
                {metadataError && showAlert && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="max-w-6xl mx-auto mb-6"
                    >
                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-900 flex justify-between items-center">
                            <div>
                                {metadataSource === 'fallback' && (
                                    <>
                                        <strong>⚠️ Limited data:</strong> Using cached metadata. Some view counts may be outdated.
                                    </>
                                )}
                                {metadataSource === 'placeholder' && (
                                    <>
                                        <strong>⚠️ Metadata unavailable:</strong> Videos are loading but detailed information is
                                        currently unavailable. Please refresh the page.
                                    </>
                                )}
                            </div>
                            <button
                                onClick={() => setShowAlert(false)}
                                className="ml-4 text-amber-600 hover:text-amber-800 transition-colors flex-shrink-0"
                                aria-label="Dismiss alert"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <div className="max-w-6xl mx-auto">
                <header className="text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl mb-6 text-[#1B3022] tracking-tighter leading-none font-serif italic"
                    >
                        Showcase
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl md:text-2xl text-[#1B3022]/60 font-serif italic max-w-2xl mx-auto mb-12"
                    >
                        A peak into the content creations seeded in the garden.
                    </motion.p>

                    {/* Tabs now under title/desc */}
                    <div className="flex justify-center mb-12 overflow-x-auto pb-4 scrollbar-hide md:max-w-6xl md:mx-auto md:w-full">
                        <div className="bg-white/50 backdrop-blur-sm p-1 rounded-full sketch-border border-[#1B3022]/5 flex flex-wrap md:flex-nowrap gap-1 md:gap-2 md:w-full md:justify-center">
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as any)}
                                    className={`px-4 md:px-8 py-2 md:py-3 rounded-full text-xs md:text-sm font-bold uppercase tracking-widest transition-all duration-300 ${activeTab === tab.id
                                        ? "bg-[#1B3022] text-white shadow-lg scale-105"
                                        : "text-[#1B3022]/40 hover:text-[#1B3022] hover:bg-white/50"
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row items-center justify-between gap-6 max-w-6xl mx-auto w-full px-0">
                        <VideoSearch
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                            className="flex-1 w-full"
                        />
                        <div className="flex items-center gap-3 bg-white/50 backdrop-blur-sm p-1.5 rounded-full sketch-border border-[#1B3022]/5 h-[58px] flex-shrink-0">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-[#1B3022]/40 pl-6">Sort by:</span>
                            <button
                                onClick={() => setSortBy("date")}
                                className={`px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${sortBy === "date" ? "bg-[#1B3022] text-white shadow-sm" : "text-[#1B3022]/40 hover:text-[#1B3022]"}`}
                            >
                                Date
                            </button>
                            <button
                                onClick={() => setSortBy("views")}
                                className={`px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${sortBy === "views" ? "bg-[#1B3022] text-white shadow-sm" : "text-[#1B3022]/40 hover:text-[#1B3022]"}`}
                            >
                                Watches
                            </button>
                        </div>
                    </div>

                    {availableTags.length > 0 && (
                        <div className="max-w-6xl mx-auto w-full px-0 pt-6">
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#1B3022]/40">Filter by tags:</span>
                                    {selectedTags.size > 0 && (
                                        <button
                                            onClick={() => setSelectedTags(new Set())}
                                            className="text-[10px] font-bold uppercase tracking-widest text-[#5F7D61] hover:text-[#1B3022] transition-colors"
                                        >
                                            Clear tags
                                        </button>
                                    )}
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {availableTags.map((tag) => {
                                        const isSelected = selectedTags.has(tag)
                                        return (
                                            <motion.button
                                                key={tag}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => {
                                                    const newTags = new Set(selectedTags)
                                                    if (isSelected) {
                                                        newTags.delete(tag)
                                                    } else {
                                                        newTags.add(tag)
                                                    }
                                                    setSelectedTags(newTags)
                                                }}
                                                className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all sketch-border ${
                                                    isSelected
                                                        ? "bg-[#5F7D61] text-white border-[#5F7D61]"
                                                        : "bg-white/50 border border-[#5F7D61]/20 text-[#5F7D61] hover:bg-white hover:border-[#5F7D61]/40"
                                                }`}
                                            >
                                                {tag}
                                            </motion.button>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    )}
                </header>

                <div className="min-h-[500px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab + searchQuery + Array.from(selectedTags).join(',')}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {isLoading ? (
                                <VideoSkeleton count={6} />
                            ) : filteredItems.length > 0 ? (
                                <VideoGallery
                                    items={filteredItems}
                                    onVideoSelect={setSelectedVideoId}
                                    title={tabs.find(t => t.id === activeTab)?.label || ""}
                                    description={
                                        searchQuery
                                            ? `Found ${filteredItems.length} results for "${searchQuery}"`
                                            : activeTab === "all"
                                                ? "Our complete collection of knowledge seeds, grouped by area of study."
                                                : activeTab === "korea"
                                                    ? "A collection of sketches, journals, and moments from a journey through South Korea."
                                                    : activeTab === "finance"
                                                        ? "A journey through markets, assets, and the art of wealth accumulation."
                                                        : activeTab === "kubernetes"
                                                            ? "Mastering the art of container orchestration. Scalable, resilient, and automated infrastructure."
                                                            : activeTab === "programming"
                                                                ? "Explorations in programming, TypeScript, and the craft of writing clean, maintainable code."
                                                                : "Deep dives into development practices, toolsets, and the creative process of building software."
                                    }
                                />
                            ) : (
                                <div className="text-center py-20">
                                    <div className="text-6xl mb-6 opacity-20">🍂</div>
                                    <h3 className="text-2xl font-serif italic text-[#1B3022]/40">No seeds found for your search...</h3>
                                    <button
                                        onClick={() => setSearchQuery("")}
                                        className="mt-6 text-[#D4A373] font-bold hover:underline"
                                    >
                                        Clear search
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            <VideoModal
                videoId={selectedVideoId}
                onClose={() => setSelectedVideoId(null)}
            />
        </div>
    );
}
