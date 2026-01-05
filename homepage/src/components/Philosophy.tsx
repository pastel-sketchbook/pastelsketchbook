import { SketchBox } from "./ui/SketchBox";
import { motion } from "framer-motion";

const steps = [
    { title: "Learn & Explore", color: "bg-pastel-terracotta/10", icon: "🧠", desc: "A member pursues a personal interest (e.g., learning Spanish)." },
    { title: "Create & Share", color: "bg-pastel-tan/10", icon: "🎬", desc: "They produce content based on their learning and publish it to the community's shared platform." },
    { title: "Grow Audience", color: "bg-pastel-yellow/10", icon: "👥", desc: "As a collective, we build a subscriber base, generating revenue from the shared content." },
    { title: "Invest Collectively", color: "bg-pastel-medium/10", icon: "🌱", desc: "The revenue is 'seeded' into the organization's professionally managed ETF investment account." },
    { title: "Compound Wealth", color: "bg-pastel-dark/10", icon: "🌳", desc: "The investment grows over time, creating a durable, shared financial asset for all members." },
];

const SectionDivider = ({ className = "" }) => (
    <div className={`flex justify-center py-12 ${className}`}>
        <svg width="200" height="20" viewBox="0 0 200 20" fill="none" className="text-pastel-dark/10">
            <path d="M0 10 Q50 0 100 10 T200 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M10 15 Q60 5 110 15 T210 15" stroke="currentColor" strokeWidth="1" strokeLinecap="round" fill="none" className="opacity-50" />
        </svg>
    </div>
);

export function Philosophy() {
    return (
        <>
            <section id="vision" className="py-32 px-6 bg-pastel-bg">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center"
                >
                    <div className="order-2 md:order-1">
                        <h2 className="text-5xl md:text-6xl mb-10 leading-tight text-pastel-dark font-serif">
                            What if our study hours could build more than knowledge?
                        </h2>
                        <div className="space-y-8 text-xl text-pastel-dark/70 leading-relaxed font-sans">
                            <p>
                                We spend countless hours learning, exploring new skills, and diving into our passions. It's a deeply personal investment.
                            </p>
                            <p className="font-bold text-pastel-dark border-l-4 border-pastel-tan pl-6 py-2 bg-pastel-tan/5">
                                But the value created often remains invisible, locked away in our notebooks and minds.
                            </p>
                        </div>
                    </div>
                    <div className="order-1 md:order-2 flex justify-center">
                        <div className="relative group">
                            <SketchBox className="w-full max-w-xs aspect-[3/4] sm:w-80 sm:h-96 bg-white p-8 flex flex-col justify-end group-hover:bg-pastel-bg -rotate-1 group-hover:rotate-0 border-pastel-dark/20 group-hover:border-pastel-dark/40">
                                <div className="absolute top-10 right-10 w-24 h-24 bg-pastel-yellow/10 rounded-full blur-xl"></div>
                                <div className="space-y-5">
                                    <div className="h-3 w-full bg-pastel-dark/10 rounded-full"></div>
                                    <div className="h-3 w-3/4 bg-pastel-dark/10 rounded-full"></div>
                                    <div className="h-3 w-5/6 bg-pastel-dark/10 rounded-full"></div>
                                </div>
                                <div className="mt-16 text-pastel-tan transform transition-transform group-hover:scale-110">
                                    <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                </div>
                            </SketchBox>
                        </div>
                    </div>
                </motion.div>
            </section>

            <SectionDivider />

            <section id="problem" className="py-32 px-6 bg-pastel-bg">
                <div className="max-w-6xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-7xl text-center mb-24 font-serif italic text-pastel-dark"
                    >
                        Learning is valuable.<br />Monetizing it is <span className="text-pastel-terracotta">lonely.</span>
                    </motion.h2>

                    <div className="grid md:grid-cols-2 gap-12 items-stretch">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="h-full"
                        >
                            <SketchBox className="bg-white p-8 md:p-12 h-full flex flex-col">
                                <div className="aspect-video mb-12 flex items-center justify-center">
                                    <svg className="w-48 h-48 text-pastel-dark/80" viewBox="0 0 100 100">
                                        <circle cx="50" cy="40" r="20" fill="hsl(var(--a))" fillOpacity="0.1" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
                                        <path d="M20 80 L80 80" stroke="currentColor" strokeWidth="1.5" />
                                        <path d="M20 80 L40 60" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                        <circle cx="40" cy="55" r="2.5" fill="currentColor" />
                                    </svg>
                                </div>
                                <h3 className="text-3xl font-bold mb-6 text-pastel-dark">Solitary Effort</h3>
                                <p className="text-pastel-dark/60 text-lg leading-relaxed font-sans flex-grow">Our learning journeys are often isolated, limiting the potential for collaboration and shared growth.</p>
                            </SketchBox>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="h-full"
                        >
                            <SketchBox className="bg-white p-8 md:p-12 h-full flex flex-col">
                                <div className="aspect-video mb-12 flex items-center justify-center">
                                    <svg className="w-48 h-48 text-pastel-dark/80" viewBox="0 0 100 100">
                                        <circle cx="60" cy="40" r="25" fill="hsl(var(--p))" fillOpacity="0.1" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
                                        <path d="M20 80 L80 80" stroke="currentColor" strokeWidth="1.5" />
                                        <path d="M30 80 L50 60" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                        <path d="M35 80 L55 60" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                        <path d="M40 80 L60 60" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                    </svg>
                                </div>
                                <h3 className="text-3xl font-bold mb-6 text-pastel-dark">The Creator Treadmill</h3>
                                <p className="text-pastel-dark/60 text-lg leading-relaxed font-sans flex-grow">Turning passion into income requires building a personal brand, an audience, and a business from scratch—a monumental task for one person.</p>
                            </SketchBox>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section className="py-32 px-6 overflow-hidden bg-pastel-bg">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-5xl md:text-6xl mb-16 italic font-serif text-pastel-dark">We're building a digital community garden.</h2>

                    <SketchBox className="relative mb-20 p-6 md:p-12 bg-white inline-block w-full max-w-4xl shadow-sm rotate-1">
                        <div className="flex flex-wrap justify-center gap-8 md:gap-16 py-8">
                             {[
                                    { icon: "🎨", label: "Art" },
                                    { icon: "🧬", label: "Science" },
                                    { icon: "🌍", label: "Languages" },
                                    { icon: "🎵", label: "Music" },
                                    { icon: "💡", label: "Philosophy" }
                                ].map((item, i) => (
                                 <motion.div
                                     key={i}
                                     whileHover={{ y: -10 }}
                                     className="flex flex-col items-center gap-6 group"
                                 >
                                     <span className="text-5xl transform transition-transform group-hover:scale-125 duration-300">{item.icon}</span>
                                     <span className="text-xs font-bold uppercase tracking-[0.3em] text-pastel-dark/40 group-hover:text-pastel-dark transition-colors">{item.label}</span>
                                </motion.div>
                            ))}
                        </div>
                    </SketchBox>

                    <p className="max-w-3xl mx-auto text-2xl text-pastel-dark/60 leading-relaxed font-serif italic">
                        Pastel Sketchbook is a mission-driven space where every member's contribution—every new skill learned, every piece of content created—is a seed.
                        <br /><br />
                        <span className="font-bold text-pastel-dark not-italic border-b-2 border-pastel-tan/30 pb-1">We plant these seeds together, and we all share in the long-term harvest.</span>
                    </p>
                </div>
            </section>

            <SectionDivider />

            <section id="cycle" className="py-32 px-6 bg-pastel-bg">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-5xl md:text-6xl mb-6 italic font-serif text-pastel-dark">A Virtuous Cycle</h2>
                    <p className="text-2xl text-pastel-dark/50 mb-20 font-serif italic">From Curiosity to Collective Capital</p>

                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12">
                        {steps.map((step, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.15, duration: 0.6 }}
                                className="relative group"
                            >
                                <motion.div
                                    initial={{ scale: 0, rotate: -180 }}
                                    whileInView={{ scale: 1, rotate: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.15 + 0.1, duration: 0.5, type: 'spring', stiffness: 100 }}
                                    className={`aspect-square rounded-full ${step.color} flex items-center justify-center mb-8 transition-all group-hover:scale-110 duration-500 sketch-border border-pastel-dark/10 group-hover:border-pastel-dark/30 shadow-sm`}
                                >
                                    <motion.span
                                        className="text-5xl transform transition-transform group-hover:rotate-12 inline-block"
                                        whileHover={{ rotate: 12, scale: 1.1 }}
                                    >
                                        {step.icon}
                                    </motion.span>
                                </motion.div>
                                <motion.h4
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.15 + 0.2, duration: 0.4 }}
                                    className="font-serif italic text-pastel-dark mb-4 text-lg md:text-xl"
                                >
                                    {step.title}
                                </motion.h4>
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.15 + 0.3, duration: 0.4 }}
                                    className="text-sm text-pastel-dark/60 leading-relaxed font-sans"
                                >
                                    {step.desc}
                                </motion.p>
                                {idx < steps.length - 1 && (
                                    <div className="hidden md:block absolute top-1/4 -right-10 text-pastel-dark/10">
                                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                                        </svg>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>

                    <p className="mt-24 text-pastel-dark/40 italic font-serif text-lg">Each step strengthens the next, creating a self-sustaining engine for community growth.</p>
                </div>
            </section>
        </>
    );
}
