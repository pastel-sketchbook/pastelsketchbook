import { useState, useEffect } from "react";
import type { SparkResult, SavedSpark } from "../../types";
import { SketchBox } from "./ui/SketchBox";
import { SketchButton } from "./ui/SketchButton";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "pastel_sketchbook_sparks";

export function SparkAI() {
    const [topic, setTopic] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<SparkResult | null>(null);
    const [savedSparks, setSavedSparks] = useState<SavedSpark[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isTyping, setIsTyping] = useState(false);
    const [showSaveSuccess, setShowSaveSuccess] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                setSavedSparks(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse saved sparks", e);
            }
        }
    }, []);

    useEffect(() => {
        if (topic.length > 0) {
            setIsTyping(true);
            const timer = setTimeout(() => setIsTyping(false), 300);
            return () => clearTimeout(timer);
        }
    }, [topic]);

    const generateSpark = async () => {
        if (!topic.trim()) return;
        setLoading(true);
        setError(null);
        setResult(null);
        setShowSaveSuccess(false);

        try {
            // Dynamic import to reduce initial bundle size
            const { GoogleGenAI, Type } = await import("@google/genai");
            const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_API_KEY });
            const response = await ai.models.generateContent({
                model: import.meta.env.VITE_API_MODEL || "gemini-3-flash-preview",
                contents: `I want to learn about: ${topic}. Based on the 'Pastel Sketchbook' model, describe:
1. A specific content piece (Creation) I could make.
2. Where it would be shared (Platform).
3. The collective impact (Impact) it would have.`,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.OBJECT,
                        properties: {
                            topic: { type: Type.STRING },
                            creation: { type: Type.STRING },
                            platform: { type: Type.STRING },
                            impact: { type: Type.STRING },
                        },
                        required: ["topic", "creation", "platform", "impact"],
                    },
                },
            });

            const text = response.text;
            if (text) {
                const data = JSON.parse(text);
                setResult(data as SparkResult);
            }
        } catch (err) {
            console.error(err);
            setError("The garden is resting. Please try again in a moment.");
        } finally {
            setLoading(false);
        }
    };

    const handleClear = () => {
        setTopic("");
        setResult(null);
        setError(null);
        setShowSaveSuccess(false);
    };

    const saveSpark = () => {
        if (!result) return;
        const newSpark: SavedSpark = {
            ...result,
            id: crypto.randomUUID(),
            date: Date.now(),
        };
        const updated = [newSpark, ...savedSparks];
        setSavedSparks(updated);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        setShowSaveSuccess(true);
        setTimeout(() => setShowSaveSuccess(false), 3000);
    };

    const removeSavedSpark = (id: string) => {
        const updated = savedSparks.filter((s) => s.id !== id);
        setSavedSparks(updated);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    };

    return (
        <section id="spark" className="py-32 px-6 bg-[#FAF9F6] border-y border-[#1B3022]/5">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="max-w-4xl mx-auto"
            >
                <div className="text-center mb-16">
                    <h2 className="text-5xl italic mb-6 font-serif text-[#1B3022]">Let's follow an idea...</h2>
                    <p className="text-[#1B3022]/50 text-xl font-serif">Enter something you're curious about, and let's see how it seeds the garden.</p>
                </div>

                <div className="flex flex-col md:flex-row gap-6 mb-20 items-center">
                    <div className="relative flex-1 w-full group">
                        <input
                            type="text"
                            value={topic}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTopic(e.target.value)}
                            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && generateSpark()}
                            placeholder="e.g. Learning Spanish, Quantum Physics, Vegan Baking..."
                            className={`
                w-full px-10 py-6 rounded-full bg-white border-2 border-[#1B3022]/5
                outline-none transition-all duration-300 shadow-sm
                sketch-hover sketch-focus text-xl text-[#1B3022] placeholder-[#1B3022]/20
                ${isTyping ? "animate-pop" : ""}
                ${topic.length > 0 ? "bg-white pr-16" : "bg-white/50"}
              `}
                        />
                        {(topic || result) && (
                            <button
                                onClick={handleClear}
                                className="absolute right-6 top-1/2 -translate-y-1/2 p-2 text-[#1B3022]/20 hover:text-[#E76F51] transition-colors"
                                aria-label="Clear current spark"
                                title="Clear current spark"
                            >
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        )}
                    </div>
                    <SketchButton
                        onClick={generateSpark}
                        disabled={loading}
                        className="min-w-[240px] w-full md:w-auto"
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Planting...
                            </>
                        ) : "Spark an Idea"}
                    </SketchButton>
                </div>

                {error && <p className="text-center text-[#E76F51] mb-12 animate-fade-in font-serif italic text-lg">{error}</p>}

                <div className="min-h-[200px] mb-20">
                    <AnimatePresence mode="wait">
                        {loading ? (
                            <motion.div
                                key="loading"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12"
                            >
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="text-center">
                                        <div className="w-20 h-20 mx-auto rounded-full mb-6 border-2 border-[#1B3022]/5 shimmer"></div>
                                        <div className="h-4 w-20 mx-auto bg-[#1B3022]/5 mb-3 rounded shimmer"></div>
                                        <div className="space-y-3">
                                            <div className="h-2.5 w-full bg-[#1B3022]/5 rounded shimmer"></div>
                                            <div className="h-2.5 w-2/3 mx-auto bg-[#1B3022]/5 rounded shimmer"></div>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        ) : result ? (
                            <motion.div
                                key="result"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="animate-fade-in"
                            >
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-12 mb-12">
                                    {[
                                        { icon: "💡", title: "The Spark", desc: `Learns ${result.topic}`, color: "text-[#E76F51]", bg: "bg-[#E76F51]/5", border: "border-[#E76F51]/20" },
                                        { icon: "🎨", title: "The Creation", desc: result.creation, color: "text-[#D4A373]", bg: "bg-[#D4A373]/5", border: "border-[#D4A373]/20" },
                                        { icon: "📺", title: "The Platform", desc: result.platform, color: "text-[#E9C46A]", bg: "bg-[#E9C46A]/5", border: "border-[#E9C46A]/20" },
                                        { icon: "📈", title: "The Impact", desc: result.impact, color: "text-[#5F7D61]", bg: "bg-[#5F7D61]/5", border: "border-[#5F7D61]/20" }
                                    ].map((item, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            className="text-center group"
                                        >
                                            <div className={`w-20 h-20 mx-auto ${item.bg} rounded-full flex items-center justify-center mb-6 text-3xl sketch-border ${item.border} transition-all group-hover:scale-110 group-hover:shadow-md duration-300 transform ${i % 2 === 0 ? 'rotate-3' : '-rotate-3'}`}>{item.icon}</div>
                                            <h4 className={`font-bold text-xs uppercase ${item.color} mb-3 tracking-[0.2em]`}>{item.title}</h4>
                                            <p className="text-sm text-[#1B3022]/70 leading-relaxed font-serif italic">{item.desc}</p>
                                        </motion.div>
                                    ))}
                                </div>

                                <div className="flex justify-center">
                                    <SketchButton
                                        variant="outline"
                                        onClick={saveSpark}
                                        className={`
                      px-10 py-3 duration-500
                      ${showSaveSuccess ? "bg-[#5F7D61] !border-[#5F7D61] !text-white" : ""}
                    `}
                                    >
                                        {showSaveSuccess ? (
                                            <><span>✓</span> Seeded to Sketchbook</>
                                        ) : (
                                            <><span>🌱</span> Save to Sketchbook</>
                                        )}
                                    </SketchButton>
                                </div>
                            </motion.div>
                        ) : null}
                    </AnimatePresence>
                </div>

                {savedSparks.length > 0 && (
                    <div className="mt-20 border-t border-[#5F7D61]/10 pt-16">
                        <div className="flex justify-between items-center mb-10">
                            <h3 className="text-2xl italic text-[#1B3022]">Your Sketchbook Seeds</h3>
                            <span className="text-xs font-bold text-[#5F7D61]/40 uppercase tracking-widest">{savedSparks.length} SEEDS PLANTED</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {savedSparks.map((spark, idx) => (
                                <SketchBox
                                    key={spark.id}
                                    className="bg-white p-6 relative"
                                >
                                    <button
                                        onClick={() => removeSavedSpark(spark.id)}
                                        className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center rounded-full bg-red-50 text-red-300 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 hover:text-white"
                                        title="Remove seed"
                                    >
                                        ×
                                    </button>
                                    <div className="mb-4">
                                        <span className="text-xs font-bold uppercase tracking-widest text-[#E76F51]">Topic</span>
                                        <p className="text-sm font-serif text-[#1B3022] line-clamp-1">{spark.topic}</p>
                                    </div>
                                    <div className="mb-4">
                                        <span className="text-xs font-bold uppercase tracking-widest text-[#D4A373]">Creation</span>
                                        <p className="text-xs text-[#5F7D61] line-clamp-2">{spark.creation}</p>
                                    </div>
                                    <div>
                                        <span className="text-xs font-bold uppercase tracking-widest text-[#5F7D61]">Platform</span>
                                        <p className="text-xs text-[#5F7D61] italic">{spark.platform}</p>
                                    </div>
                                </SketchBox>
                            ))}
                        </div>
                    </div>
                )}
            </motion.div>
        </section>
    );
}
