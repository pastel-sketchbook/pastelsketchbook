import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface VideoModalProps {
    videoId: string | null;
    onClose: () => void;
}

export function VideoModal({ videoId, onClose }: VideoModalProps) {
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

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
                    <div className="absolute inset-0 bg-[#FAF9F6]/80 backdrop-blur-xl"></div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-5xl aspect-video bg-white sketch-border border-[#1B3022]/10 shadow-2xl overflow-hidden rounded-2xl"
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
