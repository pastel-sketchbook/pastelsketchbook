import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { VideoGallery } from "../src/components/VideoGallery";
import { VideoModal } from "../src/components/VideoModal";
import { motion, AnimatePresence } from "framer-motion";

export const Route = createFileRoute("/showcase")({
    component: Showcase,
});

const koreaItems = [
    { id: "V2cZl5s4EKU", title: "스페인어 A2 레벨을 도달하기 위한 12주 학습의 시작", date: "2024-12-26", views: 17 },
    { id: "L9sxbq8ugoU", title: "Tu Viaje al Corazón de Corea", date: "2025-01-01", views: 3 },
    { id: "vNHblhm9oQo", title: "Mi Cuaderno de Busan", date: "2025-01-01", views: 6 },
    { id: "4h84JgKkt94", title: "Gyeongju: El Museo Sin Muros", date: "2025-01-02", views: 7 },
    { id: "CASZX56r-tk", title: "Mi Cuaderno de Viaje: Andong", date: "2025-01-03", views: 9 },
    { id: "EvcUSPWkOA8", title: "Jeonju y Gochang: Apuntes de Corea", date: "2025-01-04", views: 3 },
    { id: "JlPl9MskqJM", title: "Mi Cuaderno de Viaje: Yeosu", date: "2025-01-04", views: 6 },
    { id: "drVBXipEOAs", title: "Jinju y Jirisan: el Valor a la Sabiduría", date: "2025-01-04", views: 4 },
];

const financeItems = [
    { id: "tPDFgVAp4c4", title: "Breakout Stars and Dominant Titans", date: "2024-12-26", views: 44 },
    { id: "nnL78ZVifZU", title: "Reading the Market's Story", date: "2024-12-27", views: 15 },
    { id: "MDNRiJN7aEg", title: "An Ambitious Ascent", date: "2024-12-29", views: 10 },
    { id: "KBfVy5-M-5k", title: "The Retirement Red Zone", date: "2024-12-31", views: 15 },
    { id: "EMXUbohWsWs", title: "The 2026 Lifecycle ETF Playbook", date: "2025-01-03", views: 5 },
];

const kubernetesItems = [
    { id: "8ycnldvJmuA", title: "The Blueprint for Enterprise AI on Azure", date: "2025-01-03", views: 7 },
    { id: "ftODZr2_V5Q", title: "Kubernetes Version Upgrade Strategy", date: "2024-12-26", views: 25 },
];

const developmentItems = [
    { id: "Xhq99-YHXCY", title: "Professional Al Agent Usage via the CLI", date: "2025-01-02", views: 18 },
    { id: "PNFlYx8HiOM", title: "The Art of Git Gardening", date: "2024-12-31", views: 3 },
    { id: "pzVOjl6mOD4", title: "The Architect's Guide to Modern Token Security", date: "2024-12-30", views: 21 },
    { id: "olsB3bJxA2A", title: "Let's check about Zig", date: "2024-12-28", views: 308 },
    { id: "IF5sNQH-01c", title: "NotebookLM's Intelligence Flow", date: "2024-12-28", views: 40 },
    { id: "2kvYb2pVe5o", title: "From Blueprint to Battlefield", date: "2024-12-27", views: 30 },
    { id: "TLqdeHlAo3A", title: "From Bottlenecks to Breakthroughs:", date: "2024-12-27", views: 22 },
];

import { VideoSearch } from "../src/components/VideoSearch";

function Showcase() {
    const [activeTab, setActiveTab] = useState<"korea" | "finance" | "kubernetes" | "development" | "all">("all");
    const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState<"date" | "views">("date");

    const allItems = [
        ...koreaItems.map(item => ({ ...item, category: "korea" })),
        ...financeItems.map(item => ({ ...item, category: "finance" })),
        ...kubernetesItems.map(item => ({ ...item, category: "kubernetes" })),
        ...developmentItems.map(item => ({ ...item, category: "development" })),
    ];

    const filteredItems = (activeTab === "all"
        ? allItems
        : allItems.filter(item => item.category === activeTab)
    ).filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
    ).sort((a, b) => {
        if (sortBy === "date") {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
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
                            {filteredItems.length > 0 ? (
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
