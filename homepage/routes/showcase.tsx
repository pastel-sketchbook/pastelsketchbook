import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export const Route = createFileRoute("/showcase")({
    component: Showcase,
});

const financeData = [
    { month: "Jan", savings: 2000, target: 1500 },
    { month: "Feb", savings: 2500, target: 1500 },
    { month: "Mar", savings: 2100, target: 1500 },
    { month: "Apr", savings: 3000, target: 1500 },
    { month: "May", savings: 3500, target: 1500 },
    { month: "Jun", savings: 4200, target: 1500 },
];

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
                    <h1 className="text-5xl md:text-7xl mb-6 text-[#1B3022] tracking-tighter leading-none font-serif italic">
                        Showcase
                    </h1>
                    <p className="text-xl md:text-2xl text-[#1B3022]/60 font-serif italic max-w-2xl mx-auto">
                        A peak into the content creations seeded in the garden.
                    </p>
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

                <div className="animate-fade-in min-h-[500px]">
                    {activeTab === "korea" ? (
                        <div className="space-y-12">
                            <div className="text-center space-y-6 max-w-3xl mx-auto">
                                <h2 className="text-4xl md:text-5xl text-[#1B3022] font-serif italic leading-tight">
                                    Exploring the Soul of Korea
                                </h2>
                                <p className="text-lg text-[#1B3022]/60 leading-relaxed font-serif">
                                    A collection of sketches, journals, and moments from a journey through South Korea. From the quiet temples of Gyeongju to the bustling streets of Seoul.
                                </p>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
                                {koreaItems.map((item, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setSelectedVideoId(item.id)}
                                        className="text-left bg-white p-4 sketch-border border-[#1B3022]/5 hover:shadow-lg transition-all group/card overflow-hidden w-full"
                                    >
                                        <div className="aspect-video mb-4 overflow-hidden rounded-lg bg-[#1B3022]/5 relative">
                                            <img
                                                src={`https://img.youtube.com/vi/${item.id}/mqdefault.jpg`}
                                                alt={item.title}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-110"
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity bg-[#1B3022]/20">
                                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
                                                    <svg className="w-6 h-6 text-[#1B3022]" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M8 5v14l11-7z" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                        <h4 className="font-bold text-[#1B3022] text-[10px] uppercase tracking-widest line-clamp-2 leading-relaxed">
                                            {item.title}
                                        </h4>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-12">
                            <div className="text-center space-y-6 max-w-3xl mx-auto">
                                <h2 className="text-4xl md:text-5xl text-[#1B3022] font-serif italic leading-tight">
                                    Financial Gardening
                                </h2>
                                <p className="text-lg text-[#1B3022]/60 leading-relaxed font-serif">
                                    A journey through markets, assets, and the art of wealth accumulation. Visualizing the compounding growth of our shared future.
                                </p>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
                                {financeItems.map((item, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setSelectedVideoId(item.id)}
                                        className="text-left bg-white p-4 sketch-border border-[#1B3022]/5 hover:shadow-lg transition-all group/card overflow-hidden w-full"
                                    >
                                        <div className="aspect-video mb-4 overflow-hidden rounded-lg bg-[#1B3022]/5 relative">
                                            <img
                                                src={`https://img.youtube.com/vi/${item.id}/mqdefault.jpg`}
                                                alt={item.title}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-110"
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity bg-[#1B3022]/20">
                                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
                                                    <svg className="w-6 h-6 text-[#1B3022]" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M8 5v14l11-7z" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                        <h4 className="font-bold text-[#1B3022] text-[10px] uppercase tracking-widest line-clamp-2 leading-relaxed">
                                            {item.title}
                                        </h4>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Video Modal */}
            {selectedVideoId && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-fade-in"
                    onClick={() => setSelectedVideoId(null)}
                >
                    <div className="absolute inset-0 bg-[#FAF9F6]/80 backdrop-blur-xl"></div>
                    <div
                        className="relative w-full max-w-5xl aspect-video bg-white sketch-border border-[#1B3022]/10 shadow-2xl overflow-hidden rounded-2xl animate-scale-up"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="absolute top-4 right-4 z-10 p-2 bg-white/50 backdrop-blur-md rounded-full text-[#1B3022] hover:bg-white transition-colors shadow-sm"
                            onClick={() => setSelectedVideoId(null)}
                            aria-label="Close video"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <iframe
                            src={`https://www.youtube.com/embed/${selectedVideoId}?autoplay=1`}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            )}
        </div>
    );
}
