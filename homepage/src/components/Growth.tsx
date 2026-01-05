import { useState, useEffect, useRef, Suspense, lazy } from "react";
import { SketchBox } from "./ui/SketchBox";
import { motion, useScroll, useTransform } from "framer-motion";

// Lazy load Recharts to reduce initial bundle size
const Recharts = lazy(() => import("recharts").then(mod => ({
    default: ({ width, height, data }: any) => (
        <mod.AreaChart width={width} height={height} data={data}>
            <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D4A373" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#D4A373" stopOpacity={0} />
                </linearGradient>
            </defs>
            <mod.CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1B302211" />
            <mod.XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#1B302255', fontSize: 12, fontWeight: 'bold' }} />
            <mod.YAxis axisLine={false} tickLine={false} tick={{ fill: '#1B302255', fontSize: 12, fontWeight: 'bold' }} tickFormatter={(val) => `$${val / 1000}k`} />
            <mod.Tooltip
                contentStyle={{ borderRadius: '20px', border: '1.5px solid #1B302222', backgroundColor: '#FAF9F6', boxShadow: 'none' }}
                formatter={(value: any) => [`$${Number(value || 0).toLocaleString()}`, 'Fund Value']}
            />
            <mod.Area type="monotone" dataKey="value" stroke="#D4A373" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" strokeDasharray="5 5" />
        </mod.AreaChart>
    )
})));

const data = [
    { year: "Year 1", value: 1000 },
    { year: "Year 5", value: 18000 },
    { year: "Year 10", value: 45000 },
    { year: "Year 15", value: 78000 },
    { year: "Year 20", value: 120000 },
];

export function Growth() {
    const [hasDimensions, setHasDimensions] = useState(false);
    const chartRef = useRef<HTMLDivElement>(null);
    const investmentRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();
    const jarY = useTransform(scrollY, [0, 1000], [0, 50]);

    useEffect(() => {
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
            return () => observer.disconnect();
        }
    }, []);

    return (
        <>
            <section id="investment" className="py-32 px-6 bg-[#FAF9F6]" ref={investmentRef}>
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center"
                >
                    <div className="flex justify-center order-2 md:order-1">
                        <motion.div
                            style={{ y: jarY }}
                            className="relative w-full max-w-xs aspect-[3/4] sm:w-80 sm:h-96 transform -rotate-2 hover:rotate-0 transition-transform duration-500"
                        >
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
                        </motion.div>
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
                </motion.div>
            </section>

            <section id="growth" className="py-32 px-6 bg-[#FAF9F6]">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-24">
                        <h2 className="text-5xl md:text-6xl italic mb-6 font-serif text-[#1B3022]">The Power of Time</h2>
                        <p className="text-[#1B3022]/40 text-2xl font-serif italic">How Small Streams Become a River</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-center">
                        <SketchBox ref={chartRef} className="lg:col-span-2 bg-white p-4 sm:p-10 h-[300px] sm:h-[450px] min-h-[300px] relative shadow-sm overflow-hidden">
                            {hasDimensions ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1 }}
                                    className="w-full h-full"
                                >
                                    <Suspense fallback={<div className="w-full h-full flex items-center justify-center"><div className="w-16 h-16 rounded-full border-2 border-[#1B3022]/5 shimmer"></div></div>}>
                                        <Recharts
                                            width={chartRef.current?.clientWidth || 0}
                                            height={chartRef.current?.clientHeight || 0}
                                            data={data}
                                        />
                                    </Suspense>
                                </motion.div>
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-16 h-16 rounded-full border-2 border-[#1B3022]/5 shimmer"></div>
                                </div>
                            )}
                        </SketchBox>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="space-y-10"
                        >
                            <SketchBox className="p-8 bg-white shadow-sm">
                                <h4 className="font-bold text-[#1B3022] mb-6 uppercase tracking-widest text-xs">Model Assumptions</h4>
                                <ul className="text-sm space-y-4 text-[#1B3022]/60 font-serif italic">
                                    <li className="flex justify-between border-b border-[#1B3022]/5 pb-2"><span>Initial Seed:</span> <span className="font-bold not-italic text-[#1B3022]">$1,000</span></li>
                                    <li className="flex justify-between border-b border-[#1B3022]/5 pb-2"><span>Monthly Contribution:</span> <span className="font-bold not-italic text-[#1B3022]">$200</span></li>
                                    <li className="flex justify-between"><span>Avg. Annual Return:</span> <span className="font-bold not-italic text-[#1B3022]">7%</span></li>
                                </ul>
                                <p className="mt-8 text-[10px] uppercase tracking-wider text-[#1B3022]/30 font-bold">Hypothetical illustration only.</p>
                            </SketchBox>
                            <p className="text-[#1B3022]/50 italic leading-relaxed font-serif text-lg">
                                Compounding is our most powerful tool. By consistently reinvesting our collective earnings over years, the fund is designed to grow exponentially.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    );
}
