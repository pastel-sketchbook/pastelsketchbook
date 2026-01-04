import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { VideoGallery } from "../src/components/VideoGallery";
import { VideoModal } from "../src/components/VideoModal";
import { motion, AnimatePresence } from "framer-motion";

export const Route = createFileRoute("/showcase")({
    component: Showcase,
});

const koreaItems = [
    { id: "drVBXipEOAs", title: "Jinju y Jirisan: el Valor a la Sabiduría" },
    { id: "JlPl9MskqJM", title: "Mi Cuaderno de Viaje: Yeosu" },
    { id: "EvcUSPWkOA8", title: "Jeonju y Gochang: Apuntes de Corea" },
    { id: "CASZX56r-tk", title: "Mi Cuaderno de Viaje: Andong" },
    { id: "4h84JgKkt94", title: "Gyeongju: El Museo Sin Muros" },
    { id: "vNHblhm9oQo", title: "Mi Cuaderno de Busan" },
    { id: "L9sxbq8ugoU", title: "Tu Viaje al Corazón de Corea" },
];

const financeItems = [
    { id: "tPDFgVAp4c4", title: "Breakout Stars and Dominant Titans" },
    { id: "nnL78ZVifZU", title: "Reading the Market's Story" },
    { id: "MDNRiJN7aEg", title: "An Ambitious Ascent" },
    { id: "KBfVy5-M-5k", title: "The Retirement Red Zone" },
    { id: "EMXUbohWsWs", title: "The 2026 Lifecycle ETF Playbook" },
];

function Showcase() {
    const [activeTab, setActiveTab] = useState<"korea" | "finance">("korea");
    const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);

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
                        className="text-xl md:text-2xl text-[#1B3022]/60 font-serif italic max-w-2xl mx-auto"
                    >
                        A peak into the content creations seeded in the garden.
                    </motion.p>
                </header>

                <div className="flex justify-center mb-16">
                    <div className="bg-white/50 backdrop-blur-sm p-1 rounded-full sketch-border border-[#1B3022]/5 flex gap-2">
                        <button
                            onClick={() => setActiveTab("korea")}
                            className={`px-8 py-3 rounded-full text-sm font-bold uppercase tracking-widest transition-all duration-300 ${activeTab === "korea"
                                ? "bg-[#1B3022] text-white shadow-lg scale-105"
                                : "text-[#1B3022]/40 hover:text-[#1B3022] hover:bg-white/50"
                                }`}
                        >
                            Viaje a Corea
                        </button>
                        <button
                            onClick={() => setActiveTab("finance")}
                            className={`px-8 py-3 rounded-full text-sm font-bold uppercase tracking-widest transition-all duration-300 ${activeTab === "finance"
                                ? "bg-[#1B3022] text-white shadow-lg scale-105"
                                : "text-[#1B3022]/40 hover:text-[#1B3022] hover:bg-white/50"
                                }`}
                        >
                            Finance
                        </button>
                    </div>
                </div>

                <div className="min-h-[500px]">
                    <AnimatePresence mode="wait">
                        {activeTab === "korea" ? (
                            <VideoGallery
                                key="korea"
                                items={koreaItems}
                                onVideoSelect={setSelectedVideoId}
                                title="Exploring the Soul of Korea"
                                description="A collection of sketches, journals, and moments from a journey through South Korea. From the quiet temples of Gyeongju to the bustling streets of Seoul."
                            />
                        ) : (
                            <VideoGallery
                                key="finance"
                                items={financeItems}
                                onVideoSelect={setSelectedVideoId}
                                title="Financial Gardening"
                                description="A journey through markets, assets, and the art of wealth accumulation. Visualizing the compounding growth of our shared future."
                            />
                        )}
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
