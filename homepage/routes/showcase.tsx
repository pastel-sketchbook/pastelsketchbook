import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { VideoGallery } from "../src/components/VideoGallery";
import { VideoModal } from "../src/components/VideoModal";
import { motion, AnimatePresence } from "framer-motion";

export const Route = createFileRoute("/showcase")({
    component: Showcase,
});

const koreaVideos = [
    "V2cZl5s4EKU", "L9sxbq8ugoU", "vNHblhm9oQo", "4h84JgKkt94",
    "CASZX56r-tk", "EvcUSPWkOA8", "JlPl9MskqJM", "drVBXipEOAs"
];

const financeVideos = [
    "tPDFgVAp4c4", "nnL78ZVifZU", "MDNRiJN7aEg", "KBfVy5-M-5k", "EMXUbohWsWs"
];

const kubernetesVideos = [
    "8ycnldvJmuA", "ftODZr2_V5Q"
];

const developmentVideos = [
    "Xhq99-YHXCY", "PNFlYx8HiOM", "pzVOjl6mOD4", "olsB3bJxA2A",
    "IF5sNQH-01c", "2kvYb2pVe5o", "TLqdeHlAo3A"
];

const videoCategories: Record<string, string> = {};

koreaVideos.forEach(id => videoCategories[id] = "korea");
financeVideos.forEach(id => videoCategories[id] = "finance");
kubernetesVideos.forEach(id => videoCategories[id] = "kubernetes");
developmentVideos.forEach(id => videoCategories[id] = "development");

const allVideoIds = [...koreaVideos, ...financeVideos, ...kubernetesVideos, ...developmentVideos];

import { VideoSearch } from "../src/components/VideoSearch";

async function fetchVideoMetadata() {
    const videos = [];

    for (const videoId of allVideoIds) {
        try {
            const response = await fetch(`https://noembed.com/embed?url=https://www.youtube.com/watch?v=${videoId}`);
            if (!response.ok) throw new Error(`Failed to fetch video ${videoId}`);
            const data = await response.json();

            videos.push({
                id: videoId,
                title: data.title || "",
                views: 0,
                date: data.published_at || new Date().toISOString()
            });
        } catch (error) {
            console.error(`Error fetching video ${videoId}:`, error);
            videos.push({
                id: videoId,
                title: `Video ${videoId}`,
                views: 0,
                date: new Date().toISOString()
            });
        }
    }

    return videos;
}

function formatYouTubeDate(dateString: string): string {
    const parsed = new Date(dateString);
    return isNaN(parsed.getTime()) ? new Date().toISOString() : parsed.toISOString();
}

function Showcase() {
    const [activeTab, setActiveTab] = useState<"korea" | "finance" | "kubernetes" | "development" | "all">("all");
    const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState<"date" | "views">("date");

    const { data: videoMetadata = [], isLoading } = useQuery({
        queryKey: ["videoMetadata"],
        queryFn: fetchVideoMetadata,
        staleTime: 3600000,
    });

    const allItems = videoMetadata.map((item: any) => ({
        ...item,
        date: formatYouTubeDate(item.date),
        category: videoCategories[item.id]
    }));

    const filteredItems = (activeTab === "all"
        ? allItems
        : allItems.filter(item => item.category === activeTab)
    ).filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
    ).sort((a, b) => {
        if (sortBy === "date") {
            return new Date((b as any).date).getTime() - new Date((a as any).date).getTime();
        }
        return (b as any).views - (a as any).views;
    });

    const tabs = [
        { id: "all", label: "All Seeds" },
        { id: "korea", label: "Viaje a Corea" },
        { id: "finance", label: "Finance" },
        { id: "kubernetes", label: "Kubernetes" },
        { id: "development", label: "Development" },
    ];

    return (
        <div className="bg-[#FAF9F6] min-h-screen pt-32 pb-24 px-6">
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
                    <div className="flex justify-center mb-12 overflow-x-auto pb-4 scrollbar-hide">
                        <div className="bg-white/50 backdrop-blur-sm p-1 rounded-full sketch-border border-[#1B3022]/5 flex gap-1 md:gap-2 whitespace-nowrap">
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

                    <div className="flex flex-col lg:flex-row items-center justify-center gap-6 max-w-5xl mx-auto">
                        <VideoSearch
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                            className="flex-1 w-full max-w-2xl"
                        />
                        <div className="flex items-center gap-3 bg-white/50 backdrop-blur-sm p-1.5 rounded-full sketch-border border-[#1B3022]/5 h-[58px]">
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
                </header>

                <div className="min-h-[500px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab + searchQuery}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {isLoading ? (
                                <div className="text-center py-20">
                                    <div className="text-6xl mb-6 animate-pulse">🌱</div>
                                    <p className="text-xl font-serif italic text-[#1B3022]/40">Growing knowledge seeds...</p>
                                </div>
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
