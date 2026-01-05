import { useState, useEffect } from "react";
import type { SparkResult, SavedSpark } from "../../types";
import { SketchBox } from "./ui/SketchBox";
import { SketchButton } from "./ui/SketchButton";
import { motion, AnimatePresence } from "framer-motion";
import { useLocalStorage } from "../hooks/useLocalStorage";

const STORAGE_KEY = "pastel_sketchbook_sparks";

export function SparkAI() {
    const [topic, setTopic] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<SparkResult | null>(null);
    const [savedSparks, setSavedSparks] = useLocalStorage<SavedSpark[]>(STORAGE_KEY, []);
    const [error, setError] = useState<string | null>(null);
    const [isTyping, setIsTyping] = useState(false);
    const [showSaveSuccess, setShowSaveSuccess] = useState(false);

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
            // Log error for debugging but don't expose details to user
            const errorMessage = err instanceof Error ? err.message : String(err);
            console.error('SparkAI generation error:', errorMessage);
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
        setSavedSparks([newSpark, ...savedSparks]);
        setShowSaveSuccess(true);
        setTimeout(() => setShowSaveSuccess(false), 3000);
    };

    const removeSavedSpark = (id: string) => {
        setSavedSparks(savedSparks.filter((s) => s.id !== id));
    };

    const copyToClipboard = () => {
        if (!result) return;
        const text = `Topic: ${result.topic}\nCreation: ${result.creation}\nPlatform: ${result.platform}\nImpact: ${result.impact}`;
        navigator.clipboard.writeText(text);
    };

    return (
        <section id="spark" className="py-32 px-6 bg-pastel-bg border-y border-pastel-dark/5">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="max-w-4xl mx-auto"
            >
                <div className="text-center mb-16">
                    <h2 className="text-5xl italic mb-6 font-serif text-pastel-dark">Let's follow an idea...</h2>
                    <p className="text-pastel-dark/50 text-xl font-serif">Enter something you're curious about, and let's see how it seeds the garden.</p>
                </div>

                <div className="flex flex-col md:flex-row gap-6 mb-20 items-center">
                    <motion.div 
                        className="relative flex-1 w-full group"
                        whileFocus={{ scale: 1.01 }}
                    >
                        <motion.input
                            type="text"
                            value={topic}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTopic(e.target.value)}
                            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && generateSpark()}
                            placeholder="e.g. Learning Spanish, Quantum Physics, Vegan Baking..."
                            whileFocus={{ boxShadow: "0 0 0 3px rgba(95, 125, 97, 0.1)" }}
                            className={`
                w-full px-10 py-6 rounded-full bg-white border-2 border-pastel-dark/5
                outline-none transition-all duration-300 shadow-sm
                sketch-hover sketch-focus text-xl text-pastel-dark placeholder-pastel-dark/20
                ${isTyping ? "animate-pop" : ""}
                ${topic.length > 0 ? "bg-white pr-16" : "bg-white/50"}
              `}
                        />
                        <AnimatePresence>
                            {(topic || result) && (
                                <motion.button
                                    onClick={handleClear}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    whileHover={{ rotate: 90 }}
                                    className="absolute right-6 top-1/2 -translate-y-1/2 p-2 text-pastel-dark/20 hover:text-pastel-terracotta transition-colors"
                                    aria-label="Clear current spark"
                                    title="Clear current spark"
                                >
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </motion.button>
                            )}
                        </AnimatePresence>
                    </motion.div>
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

                {error && <p className="text-center text-pastel-terracotta mb-12 animate-fade-in font-serif italic text-lg">{error}</p>}

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
                                        <div className="w-20 h-20 mx-auto rounded-full mb-6 border-2 border-pastel-dark/5 shimmer"></div>
                                        <div className="h-4 w-20 mx-auto bg-pastel-dark/5 mb-3 rounded shimmer"></div>
                                        <div className="space-y-3">
                                            <div className="h-2.5 w-full bg-pastel-dark/5 rounded shimmer"></div>
                                            <div className="h-2.5 w-2/3 mx-auto bg-pastel-dark/5 rounded shimmer"></div>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        ) : result ? (
                            <motion.div
                                key="result"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="animate-fade-in relative"
                            >
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-12 mb-12">
                                    {[
                                        { icon: "💡", title: "The Spark", desc: `Learns ${result.topic}`, color: "text-pastel-terracotta", bg: "bg-pastel-terracotta/5", border: "border-pastel-terracotta/20" },
                                        { icon: "🎨", title: "The Creation", desc: result.creation, color: "text-pastel-tan", bg: "bg-pastel-tan/5", border: "border-pastel-tan/20" },
                                        { icon: "📺", title: "The Platform", desc: result.platform, color: "text-pastel-yellow", bg: "bg-pastel-yellow/5", border: "border-pastel-yellow/20" },
                                        { icon: "📈", title: "The Impact", desc: result.impact, color: "text-pastel-medium", bg: "bg-pastel-medium/5", border: "border-pastel-medium/20" }
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
                                            <p className="text-sm text-pastel-dark/70 leading-relaxed font-serif italic">{item.desc}</p>
                                        </motion.div>
                                    ))}
                                </div>

                                <div className="flex flex-col sm:flex-row justify-center gap-4">
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <SketchButton
                                            variant="outline"
                                            onClick={saveSpark}
                                            className={`
                            px-10 py-3 duration-500
                            ${showSaveSuccess ? "bg-pastel-medium !border-pastel-medium !text-white" : ""}
                          `}
                                        >
                                            {showSaveSuccess ? (
                                                <motion.span
                                                    key="success"
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    transition={{ type: "spring", stiffness: 300 }}
                                                    className="inline-flex items-center gap-2"
                                                >
                                                    <span>✓</span> Seeded to Sketchbook
                                                </motion.span>
                                            ) : (
                                                <span>🌱 Save to Sketchbook</span>
                                            )}
                                        </SketchButton>
                                    </motion.div>

                                    <button
                                        onClick={copyToClipboard}
                                        className="text-pastel-dark/40 hover:text-pastel-dark text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-colors px-6"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
                                        Copy Details
                                    </button>
                                </div>
                            </motion.div>
                        ) : null}
                    </AnimatePresence>
                </div>

                {savedSparks.length > 0 && (
                    <div className="mt-20 border-t border-pastel-dark/5 pt-16">
                        <div className="flex justify-between items-center mb-10">
                            <div>
                                <h3 className="text-3xl italic text-pastel-dark mb-2">The Seed Collection</h3>
                                <p className="text-sm text-pastel-dark/40 font-serif lowercase italic">Ideas planted for future growth.</p>
                            </div>
                            <div className="text-right">
                                <span className="text-[10px] font-bold text-pastel-medium/40 uppercase tracking-[0.3em] block mb-1">Status</span>
                                <span className="text-xs font-bold text-pastel-medium uppercase tracking-widest">{savedSparks.length} SEEDS PLANTED</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {savedSparks.map((spark, idx) => (
                                <SketchBox
                                    key={spark.id}
                                    className={`bg-white p-8 relative transition-all hover:-translate-y-1 hover:shadow-xl group ${idx % 2 === 0 ? 'rotate-1' : '-rotate-1'}`}
                                >
                                    <button
                                        onClick={() => removeSavedSpark(spark.id)}
                                        className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-red-50 text-red-300 opacity-0 group-hover:opacity-100 transition-all hover:bg-pastel-terracotta hover:text-white"
                                        title="Remove seed"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                    </button>

                                    <div className="mb-6">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="w-2 h-2 rounded-full bg-pastel-terracotta"></span>
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-pastel-terracotta/60">Subject of Interest</span>
                                        </div>
                                        <p className="text-lg font-serif italic text-pastel-dark leading-tight">{spark.topic}</p>
                                    </div>

                                    <div className="space-y-4 pt-4 border-t border-pastel-dark/5">
                                        <div>
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-pastel-tan/60 block mb-1">Proposed Creation</span>
                                            <p className="text-xs text-pastel-dark/70 leading-relaxed italic">{spark.creation}</p>
                                        </div>
                                        <div className="flex justify-between items-end">
                                            <div>
                                                <span className="text-[10px] font-bold uppercase tracking-widest text-pastel-medium/60 block mb-1">Platform</span>
                                                <p className="text-[10px] text-pastel-medium font-bold uppercase tracking-tighter">{spark.platform}</p>
                                            </div>
                                            <span className="text-[10px] text-pastel-dark/20 font-serif italic">
                                                {new Date(spark.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                            </span>
                                        </div>
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
