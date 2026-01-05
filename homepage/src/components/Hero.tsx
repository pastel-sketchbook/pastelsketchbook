import { motion } from "framer-motion";

export function Hero() {
    return (
        <section id="hero" className="min-h-screen flex flex-col items-center justify-center pt-24 px-6 text-center relative overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: 'radial-gradient(hsl(var(--n)) 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}></div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-4xl mx-auto relative z-10"
            >
                <motion.h1
                    initial={{ scale: 0.95, filter: "blur(4px)" }}
                    animate={{ scale: 1, filter: "blur(0px)" }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl mb-8 text-pastel-dark tracking-tighter leading-none"
                >
                    Pastel Sketchbook
                </motion.h1>

                <motion.div
                    animate={{
                        rotate: [1, -2, 1],
                        scale: [1, 1.02, 1]
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="relative w-full max-w-sm mx-auto aspect-square mb-12 flex items-center justify-center"
                >
                    <div className="absolute inset-0 bg-pastel-tan/5 rounded-full blur-3xl -z-10"></div>
                    <svg className="w-72 h-72 text-pastel-dark" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 70C20 65 30 60 50 60C70 60 80 65 80 70V30C80 25 70 20 50 20C30 20 20 25 20 30V70Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                        <path d="M50 20V60" stroke="currentColor" strokeWidth="1" />
                        <path d="M50 45C50 35 45 30 40 35M50 45C50 30 55 25 60 30M50 60V35" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                        <path d="M55 50L65 40L75 45L85 30" stroke="hsl(var(--s))" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M80 30H85V35" stroke="hsl(var(--s))" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.8 }}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="text-2xl md:text-4xl font-serif text-pastel-dark/80 max-w-2xl mx-auto italic leading-relaxed"
                >
                    Where Collective Learning <br className="hidden md:block" /> Seeds Lasting Wealth.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="mt-16"
                >
                    <a href="#vision" className="inline-block animate-bounce text-pastel-dark/30 hover:text-pastel-tan transition-colors">
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                        </svg>
                    </a>
                </motion.div>
            </motion.div>
        </section>
    );
}
