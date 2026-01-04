import { createFileRoute } from "@tanstack/react-router";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area } from "recharts";
import { GoogleGenAI, Type } from "@google/genai";
import { useState, useEffect, useRef } from "react";
import type { SparkResult } from "../types";

export const Route = createFileRoute("/")({
  component: Index,
});

const data = [
  { year: "Year 1", value: 1000 },
  { year: "Year 5", value: 18000 },
  { year: "Year 10", value: 45000 },
  { year: "Year 15", value: 78000 },
  { year: "Year 20", value: 120000 },
];

const steps = [
  { title: "Learn & Explore", color: "bg-[#E76F51]/10", icon: "🧠", desc: "A member pursues a personal interest (e.g., learning Spanish)." },
  { title: "Create & Share", color: "bg-[#D4A373]/10", icon: "🎬", desc: "They produce content based on their learning and publish it to the community's shared platform." },
  { title: "Grow Audience", color: "bg-[#E9C46A]/10", icon: "👥", desc: "As a collective, we build a subscriber base, generating revenue from the shared content." },
  { title: "Invest Collectively", color: "bg-[#5F7D61]/10", icon: "🌱", desc: "The revenue is 'seeded' into the organization's professionally managed ETF investment account." },
  { title: "Compound Wealth", color: "bg-[#1B3022]/10", icon: "🌳", desc: "The investment grows over time, creating a durable, shared financial asset for all members." },
];

interface SavedSpark extends SparkResult {
  id: string;
  date: number;
}

const STORAGE_KEY = "pastel_sketchbook_sparks";

function isSparkResult(data: unknown): data is SparkResult {
  return (
    typeof data === "object" &&
    data !== null &&
    "topic" in data &&
    typeof data.topic === "string" &&
    "creation" in data &&
    typeof data.creation === "string" &&
    "platform" in data &&
    typeof data.platform === "string" &&
    "impact" in data &&
    typeof data.impact === "string"
  );
}

function Index() {
  const [mounted, setMounted] = useState(false);
  const [hasDimensions, setHasDimensions] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SparkResult | null>(null);
  const [savedSparks, setSavedSparks] = useState<SavedSpark[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 100);

    if (chartRef.current) {
      const observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          if (entry.contentRect.width > 0 && entry.contentRect.height > 0) {
            setHasDimensions(true);
            observer.disconnect();
          }
        }
      });
      observer.observe(chartRef.current);
      return () => {
        observer.disconnect();
        clearTimeout(timer);
      };
    }

    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setSavedSparks(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved sparks", e);
      }
    }
    return () => clearTimeout(timer);
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
      const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_API_KEY });
      const response = await ai.models.generateContent({
        model: import.meta.env.VITE_API_MODEL || "gemini-3-flash-preview",
        contents: `I want to learn about: ${topic}. Based on the 'Pastel Sketchbook' model, describe:
1. A specific content piece(Creation) I could make.
        2. Where it would be shared(Platform).
        3. The collective impact(Impact) it would have.`,
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
        if (isSparkResult(data)) {
          setResult(data);
        } else {
          throw new Error("Invalid response format");
        }
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
    <div className="bg-[#FAF9F6]">
      <section id="hero" className="min-h-screen flex flex-col items-center justify-center pt-24 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#1B3022 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl mb-8 text-[#1B3022] tracking-tighter leading-none">Pastel Sketchbook</h1>

          <div className="relative w-full max-w-sm mx-auto aspect-square mb-12 flex items-center justify-center">
            <div className="absolute inset-0 bg-[#D4A373]/5 rounded-full blur-3xl -z-10 animate-pulse"></div>
            <svg className="w-72 h-72 text-[#1B3022]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 70C20 65 30 60 50 60C70 60 80 65 80 70V30C80 25 70 20 50 20C30 20 20 25 20 30V70Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              <path d="M50 20V60" stroke="currentColor" strokeWidth="1" />
              <path d="M50 45C50 35 45 30 40 35M50 45C50 30 55 25 60 30M50 60V35" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
              <path d="M55 50L65 40L75 45L85 30" stroke="#D4A373" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M80 30H85V35" stroke="#D4A373" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <p className="text-2xl md:text-4xl font-serif text-[#1B3022]/80 max-w-2xl mx-auto italic leading-relaxed">
            Where Collective Learning <br className="hidden md:block" /> Seeds Lasting Wealth.
          </p>

          <div className="mt-16">
            <a href="#vision" className="inline-block animate-bounce text-[#1B3022]/30 hover:text-[#D4A373] transition-colors">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </a>
          </div>
        </div>
      </section>

      <section id="vision" className="py-32 px-6 bg-[#FAF9F6]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-5xl md:text-6xl mb-10 leading-tight text-[#1B3022] font-serif">
              What if our study hours could build more than knowledge?
            </h2>
            <div className="space-y-8 text-xl text-[#1B3022]/70 leading-relaxed font-sans">
              <p>
                We spend countless hours learning, exploring new skills, and diving into our passions. It's a deeply personal investment.
              </p>
              <p className="font-bold text-[#1B3022] border-l-4 border-[#D4A373] pl-6 py-2 bg-[#D4A373]/5">
                But the value created often remains invisible, locked away in our notebooks and minds.
              </p>
            </div>
          </div>
          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative group">
              <div className="w-full max-w-xs aspect-[3/4] sm:w-80 sm:h-96 bg-white sketch-border border-[#1B3022]/20 p-8 flex flex-col justify-end transition-all group-hover:bg-[#FAF9F6] group-hover:shadow-xl group-hover:border-[#1B3022]/40 -rotate-1 group-hover:rotate-0">
                <div className="absolute top-10 right-10 w-24 h-24 bg-[#E9C46A]/10 rounded-full blur-xl"></div>
                <div className="space-y-5">
                  <div className="h-3 w-full bg-[#1B3022]/10 rounded-full"></div>
                  <div className="h-3 w-3/4 bg-[#1B3022]/10 rounded-full"></div>
                  <div className="h-3 w-5/6 bg-[#1B3022]/10 rounded-full"></div>
                </div>
                <div className="mt-16 text-[#D4A373] transform transition-transform group-hover:scale-110">
                  <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="problem" className="py-32 px-6 bg-[#FAF9F6] border-y border-[#1B3022]/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl md:text-7xl text-center mb-24 font-serif italic text-[#1B3022]">
            Learning is valuable.<br />Monetizing it is <span className="text-[#E76F51]">lonely.</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-8 md:p-12 sketch-border border-[#1B3022]/10 group hover:shadow-lg transition-all">
              <div className="aspect-video mb-12 flex items-center justify-center">
                <svg className="w-48 h-48 text-[#1B3022]/80" viewBox="0 0 100 100">
                  <circle cx="50" cy="40" r="20" fill="#E76F51" fillOpacity="0.1" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
                  <path d="M20 80 L80 80" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M20 80 L40 60" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="40" cy="55" r="2.5" fill="currentColor" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold mb-6 text-[#1B3022]">Solitary Effort</h3>
              <p className="text-[#1B3022]/60 text-lg leading-relaxed">Our learning journeys are often isolated, limiting the potential for collaboration and shared growth.</p>
            </div>

            <div className="bg-white p-8 md:p-12 sketch-border border-[#1B3022]/10 group hover:shadow-lg transition-all">
              <div className="aspect-video mb-12 flex items-center justify-center">
                <svg className="w-48 h-48 text-[#1B3022]/80" viewBox="0 0 100 100">
                  <circle cx="60" cy="40" r="25" fill="#5F7D61" fillOpacity="0.1" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
                  <path d="M20 80 L80 80" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M30 80 L50 60" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M35 80 L55 60" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M40 80 L60 60" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold mb-6 text-[#1B3022]">The Creator Treadmill</h3>
              <p className="text-[#1B3022]/60 text-lg leading-relaxed font-sans">Turning passion into income requires building a personal brand, an audience, and a business from scratch—a monumental task for one person.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 px-6 overflow-hidden bg-[#FAF9F6]">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl mb-16 italic font-serif text-[#1B3022]">We're building a digital community garden.</h2>

          <div className="relative mb-20 p-6 md:p-12 sketch-border border-[#1B3022]/10 bg-white inline-block w-full max-w-4xl shadow-sm rotate-1">
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 py-8">
              {[
                { icon: "🎨", label: "Art" },
                { icon: "🧬", label: "Science" },
                { icon: "🌍", label: "Languages" },
                { icon: "🎵", label: "Music" },
                { icon: "💡", label: "Philosophy" }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-6 group">
                  <span className="text-5xl transform transition-transform group-hover:scale-125 duration-300">{item.icon}</span>
                  <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#1B3022]/40 group-hover:text-[#1B3022] transition-colors">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="max-w-3xl mx-auto text-2xl text-[#1B3022]/60 leading-relaxed font-serif italic">
            Pastel Sketchbook is a mission-driven space where every member's contribution—every new skill learned, every piece of content created—is a seed.
            <br /><br />
            <span className="font-bold text-[#1B3022] not-italic border-b-2 border-[#D4A373]/30 pb-1">We plant these seeds together, and we all share in the long-term harvest.</span>
          </p>
        </div>
      </section>

      <section id="cycle" className="py-32 px-6 bg-[#FAF9F6] border-t border-[#1B3022]/5">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl mb-6 italic font-serif text-[#1B3022]">A Virtuous Cycle</h2>
          <p className="text-2xl text-[#1B3022]/50 mb-20 font-serif italic">From Curiosity to Collective Capital</p>

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12">
            {steps.map((step, idx) => (
              <div key={idx} className="relative group">
                <div className={`aspect - square rounded - full ${step.color} flex items - center justify - center mb - 8 transition - all group - hover: scale - 110 duration - 500 sketch - border border - [#1B3022] / 10 group - hover: border - [#1B3022] / 30 shadow - sm`}>
                  <span className="text-5xl transform transition-transform group-hover:rotate-12">{step.icon}</span>
                </div>
                <h4 className="font-bold text-[#1B3022] mb-4 uppercase tracking-widest text-xs">{step.title}</h4>
                <p className="text-sm text-[#1B3022]/60 leading-relaxed font-sans">{step.desc}</p>
                {idx < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/4 -right-10 text-[#1B3022]/10">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>

          <p className="mt-24 text-[#1B3022]/40 italic font-serif text-lg">Each step strengthens the next, creating a self-sustaining engine for community growth.</p>
        </div>
      </section>

      <section id="spark" className="py-32 px-6 bg-[#FAF9F6] border-y border-[#1B3022]/5">
        <div className="max-w-4xl mx-auto">
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
w - full px - 10 py - 6 rounded - full bg - white border - 2 border - [#1B3022] / 5
outline - none transition - all duration - 300 shadow - sm
sketch - hover sketch - focus text - xl text - [#1B3022] placeholder - [#1B3022] / 20
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
            <button
              onClick={generateSpark}
              disabled={loading}
              className="px-12 py-6 bg-[#1B3022] text-white rounded-full hover:bg-[#2D4536] hover:scale-105 transition-all duration-300 disabled:opacity-50 font-bold shadow-xl flex items-center justify-center gap-3 min-w-[240px] w-full md:w-auto uppercase tracking-widest text-xs"
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
            </button>
          </div>

          {error && <p className="text-center text-[#E76F51] mb-12 animate-fade-in font-serif italic text-lg">{error}</p>}

          <div className="min-h-[200px] mb-20">
            {loading && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12">
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
              </div>
            )}

            {result && !loading && (
              <div className="animate-fade-in">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-12 mb-12">
                  {[
                    { icon: "💡", title: "The Spark", desc: `Learns ${result.topic} `, color: "text-[#E76F51]", bg: "bg-[#E76F51]/5", border: "border-[#E76F51]/20" },
                    { icon: "🎨", title: "The Creation", desc: result.creation, color: "text-[#D4A373]", bg: "bg-[#D4A373]/5", border: "border-[#D4A373]/20" },
                    { icon: "📺", title: "The Platform", desc: result.platform, color: "text-[#E9C46A]", bg: "bg-[#E9C46A]/5", border: "border-[#E9C46A]/20" },
                    { icon: "📈", title: "The Impact", desc: result.impact, color: "text-[#5F7D61]", bg: "bg-[#5F7D61]/5", border: "border-[#5F7D61]/20" }
                  ].map((item, i) => (
                    <div key={i} className="text-center group">
                      <div className={`w - 20 h - 20 mx - auto ${item.bg} rounded - full flex items - center justify - center mb - 6 text - 3xl sketch - border ${item.border} transition - all group - hover: scale - 110 group - hover: shadow - md duration - 300 transform ${i % 2 === 0 ? 'rotate-3' : '-rotate-3'} `}>{item.icon}</div>
                      <h4 className={`font - bold text - xs uppercase ${item.color} mb - 3 tracking - [0.2em]`}>{item.title}</h4>
                      <p className="text-sm text-[#1B3022]/70 leading-relaxed font-serif italic">{item.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="flex justify-center">
                  <button
                    onClick={saveSpark}
                    className={`
px - 10 py - 3 rounded - full border - 2 border - [#D4A373] / 40 text - [#D4A373] font - bold
hover: bg - [#D4A373] hover: text - white transition - all duration - 500 flex items - center gap - 3 uppercase tracking - widest text - xs
                      ${showSaveSuccess ? "bg-[#5F7D61] !border-[#5F7D61] !text-white" : ""}
`}
                  >
                    {showSaveSuccess ? (
                      <><span>✓</span> Seeded to Sketchbook</>
                    ) : (
                      <><span>🌱</span> Save to Sketchbook</>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {savedSparks.length > 0 && (
            <div className="mt-20 border-t border-[#5F7D61]/10 pt-16">
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-2xl italic text-[#1B3022]">Your Sketchbook Seeds</h3>
                <span className="text-xs font-bold text-[#5F7D61]/40 uppercase tracking-widest">{savedSparks.length} SEEDS PLANTED</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedSparks.map((spark) => (
                  <div
                    key={spark.id}
                    className="bg-white p-6 sketch-border border-[#5F7D61]/10 hover:border-[#5F7D61]/30 transition-all duration-300 group relative"
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
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section id="investment" className="py-32 px-6 bg-[#FAF9F6] border-y border-[#1B3022]/5">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div className="flex justify-center order-2 md:order-1">
            <div className="relative w-full max-w-xs aspect-[3/4] sm:w-80 sm:h-96 transform -rotate-2 hover:rotate-0 transition-transform duration-500">
              <svg className="w-full h-full text-[#1B3022]/20" viewBox="0 0 100 120" fill="none">
                <path d="M30 20C30 15 70 15 70 20V40C70 40 90 40 90 80C90 110 10 110 10 80C10 40 30 40 30 40V20Z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                <ellipse cx="50" cy="20" rx="20" ry="5" stroke="currentColor" strokeWidth="1" />
                <path d="M11 85C11 85 30 75 50 80C70 85 89 80 89 80C89 95 85 108 50 108C15 108 11 95 11 80" fill="#5F7D61" fillOpacity="0.05" />
                <path d="M50 105V70" stroke="#1B3022" strokeWidth="1" strokeLinecap="round" />
                <path d="M50 75C50 75 65 60 70 65C75 70 60 85 50 80" fill="#5F7D61" fillOpacity="0.1" stroke="#1B3022" strokeWidth="0.5" />
                <path d="M50 85C50 85 35 70 30 75C25 80 40 95 50 90" fill="#5F7D61" fillOpacity="0.1" stroke="#1B3022" strokeWidth="0.5" />
                <text x="50" y="98" textAnchor="middle" fontSize="3" fill="#1B3022" fontWeight="bold" className="uppercase tracking-widest opacity-40">COMMUNITY ETF FUND</text>
              </svg>
              <div className="absolute top-1/2 -left-20 animate-pulse opacity-20">
                <svg className="w-40 h-20 text-[#D4A373]" viewBox="0 0 100 50">
                  <path d="M0 25 Q25 0 50 25 Q75 50 100 25" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" fill="none" />
                </svg>
              </div>
            </div>
          </div>

          <div className="order-1 md:order-2">
            <h2 className="text-5xl md:text-6xl mb-10 leading-tight text-[#1B3022] font-serif">We don't just earn.<br /><span className="italic">We invest.</span></h2>
            <div className="space-y-8 text-[#1B3022]/60 text-xl font-serif leading-relaxed italic">
              <p>
                All revenue generated from our collective content is seeded into Pastel Sketchbook's investment account.
              </p>
              <p>
                We use a strategy focused on low-cost, diversified Exchange-Traded Funds (ETFs) to ensure stable, long-term growth.
              </p>
              <p className="font-bold text-[#1B3022] not-italic border-l-4 border-[#5F7D61]/30 pl-6 py-2 bg-[#5F7D61]/5">
                This isn't about short-term payouts; it's about cultivating a lasting financial resource for the community.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="growth" className="py-32 px-6 bg-[#FAF9F6]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-6xl italic mb-6 font-serif text-[#1B3022]">The Power of Time</h2>
            <p className="text-[#1B3022]/40 text-2xl font-serif italic">How Small Streams Become a River</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-center">
            <div ref={chartRef} className="lg:col-span-2 bg-white p-4 sm:p-10 sketch-border border-[#1B3022]/5 h-[300px] sm:h-[450px] min-h-[300px] relative shadow-sm">
              {mounted && hasDimensions ? (
                <div className="w-full h-full">
                  <AreaChart width="100%" height="100%" data={data}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#D4A373" stopOpacity={0.1} />
                        <stop offset="95%" stopColor="#D4A373" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1B302211" />
                    <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#1B302255', fontSize: 12, fontWeight: 'bold' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#1B302255', fontSize: 12, fontWeight: 'bold' }} tickFormatter={(val) => `$${val / 1000} k`} />
                    <Tooltip
                      contentStyle={{ borderRadius: '20px', border: '1.5px solid #1B302222', backgroundColor: '#FAF9F6', boxShadow: 'none' }}
                      formatter={(value: any) => [`$${Number(value || 0).toLocaleString()} `, 'Fund Value']}
                    />
                    <Area type="monotone" dataKey="value" stroke="#D4A373" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" strokeDasharray="5 5" />
                  </AreaChart>
                </div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full border-2 border-[#1B3022]/5 shimmer"></div>
                </div>
              )}
            </div>

            <div className="space-y-10">
              <div className="p-8 bg-white sketch-border border-[#1B3022]/5 shadow-sm">
                <h4 className="font-bold text-[#1B3022] mb-6 uppercase tracking-widest text-xs">Model Assumptions</h4>
                <ul className="text-sm space-y-4 text-[#1B3022]/60 font-serif italic">
                  <li className="flex justify-between border-b border-[#1B3022]/5 pb-2"><span>Initial Seed:</span> <span className="font-bold not-italic text-[#1B3022]">$1,000</span></li>
                  <li className="flex justify-between border-b border-[#1B3022]/5 pb-2"><span>Monthly Contribution:</span> <span className="font-bold not-italic text-[#1B3022]">$200</span></li>
                  <li className="flex justify-between"><span>Avg. Annual Return:</span> <span className="font-bold not-italic text-[#1B3022]">7%</span></li>
                </ul>
                <p className="mt-8 text-[10px] uppercase tracking-wider text-[#1B3022]/30 font-bold">Hypothetical illustration only.</p>
              </div>
              <p className="text-[#1B3022]/50 italic leading-relaxed font-serif text-lg">
                Compounding is our most powerful tool. By consistently reinvesting our collective earnings over years, the fund is designed to grow exponentially.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
