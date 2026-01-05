import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface VideoModalProps {
    videoId: string | null
    onClose: () => void
}

export function VideoModal({ videoId, onClose }: VideoModalProps) {
    const [scale, setScale] = useState(1)
    const MIN_SCALE = 0.6
    const MAX_SCALE = 1.4
    const SCALE_STEP = 0.1

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose()
        }
        window.addEventListener("keydown", handleEsc)
        return () => window.removeEventListener("keydown", handleEsc)
    }, [onClose])

    const handleZoomIn = () => {
        setScale((prev) => Math.min(prev + SCALE_STEP, MAX_SCALE))
    }

    const handleZoomOut = () => {
        setScale((prev) => Math.max(prev - SCALE_STEP, MIN_SCALE))
    }

    return (
        <AnimatePresence>
            {videoId && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
                    onClick={onClose}
                >
                    <div className="absolute inset-0 bg-[#1B3022]/40 backdrop-blur-xl"></div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-5xl aspect-video bg-white sketch-border border-[#1B3022]/10 shadow-2xl overflow-hidden rounded-2xl transition-transform"
                        style={{ transform: `scale(${scale})` }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="absolute top-4 right-4 z-10 p-2 bg-white/50 backdrop-blur-md rounded-full text-[#1B3022] hover:bg-white transition-colors shadow-sm"
                            onClick={onClose}
                            aria-label="Close video"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="absolute bottom-4 left-4 z-10 flex gap-2 items-center">
                            <motion.button
                                whileHover={{ rotate: -3 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleZoomOut}
                                disabled={scale <= MIN_SCALE}
                                className="w-12 h-12 flex items-center justify-center bg-white text-[#1B3022] shadow-lg hover:shadow-xl transition-all sketch-border border-[#1B3022]/10 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                                aria-label="Decrease video size"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M20 12H4" />
                                </svg>
                            </motion.button>

                            <div className="text-sm font-semibold text-[#1B3022] bg-white/70 px-3 py-1 rounded-full backdrop-blur-sm">
                                {Math.round(scale * 100)}%
                            </div>

                            <motion.button
                                whileHover={{ rotate: 3 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleZoomIn}
                                disabled={scale >= MAX_SCALE}
                                className="w-12 h-12 flex items-center justify-center bg-white text-[#1B3022] shadow-lg hover:shadow-xl transition-all sketch-border border-[#1B3022]/10 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                                aria-label="Increase video size"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                                </svg>
                            </motion.button>
                        </div>

                        <iframe
                            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
