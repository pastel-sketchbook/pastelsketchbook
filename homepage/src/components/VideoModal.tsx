import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { VIDEO_MODAL_CONFIG } from '../config/modal'

interface VideoModalProps {
    videoId: string | null
    onClose: () => void
}

export function VideoModal({ videoId, onClose }: VideoModalProps) {
    const [scale, setScale] = useState(VIDEO_MODAL_CONFIG.scale.INITIAL)
    const [isHoveringControls, setIsHoveringControls] = useState(false)
    const { MIN: MIN_SCALE, MAX: MAX_SCALE, STEP: SCALE_STEP } = VIDEO_MODAL_CONFIG.scale
    const { MIN: MIN_OPACITY, MAX: MAX_OPACITY } = VIDEO_MODAL_CONFIG.opacity

    // Calculate background opacity based on scale
    // Smaller window = more transparent (less opaque = more blur visible)
    // Larger window = more opaque (darker overlay)
    const backgroundOpacity = MIN_OPACITY + ((scale - MIN_SCALE) / (MAX_SCALE - MIN_SCALE)) * (MAX_OPACITY - MIN_OPACITY)

    const handleZoomIn = () => {
        setScale((prev) => Math.min(prev + SCALE_STEP, MAX_SCALE))
    }

    const handleZoomOut = () => {
        setScale((prev) => Math.max(prev - SCALE_STEP, MIN_SCALE))
    }

    useEffect(() => {
        const handleKeydown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose()
                return
            }
            // Keyboard shortcuts for zoom
            if (e.key === '+' || e.key === '=') {
                e.preventDefault()
                handleZoomIn()
            }
            if (e.key === '-' || e.key === '_') {
                e.preventDefault()
                handleZoomOut()
            }
        }
        window.addEventListener('keydown', handleKeydown)
        return () => window.removeEventListener('keydown', handleKeydown)
    }, [onClose])

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
                    <motion.div
                        className="absolute inset-0 backdrop-blur-xl"
                        animate={{ backgroundColor: `rgba(27, 48, 34, ${backgroundOpacity})` }}
                        transition={{ duration: VIDEO_MODAL_CONFIG.animations.DURATION_MS / 1000 }}
                    ></motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: scale, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ duration: VIDEO_MODAL_CONFIG.animations.DURATION_MS / 1000 }}
                        className="relative w-full max-w-5xl aspect-video bg-white sketch-border border-pastel-dark/10 shadow-2xl overflow-hidden rounded-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="absolute top-4 right-4 z-10 p-2 bg-white/50 backdrop-blur-md rounded-full text-pastel-dark hover:bg-white transition-colors shadow-sm"
                            onClick={onClose}
                            aria-label="Close video"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <motion.div
                            className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10 flex gap-1.5 items-center pb-2"
                            onHoverStart={() => setIsHoveringControls(true)}
                            onHoverEnd={() => setIsHoveringControls(false)}
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: isHoveringControls ? 1 : 0, y: isHoveringControls ? 0 : 4 }}
                            transition={{ duration: 0.2 }}
                            pointerEvents={isHoveringControls ? 'auto' : 'none'}
                            role="group"
                            aria-label="Video player zoom controls"
                        >
                            <motion.button
                                whileHover={{ rotate: -3 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleZoomOut}
                                disabled={scale <= MIN_SCALE}
                                className="w-7 h-7 flex items-center justify-center bg-white text-pastel-dark shadow-sm hover:shadow-md transition-all sketch-border border-pastel-dark/10 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                                aria-label="Decrease video size (Press Minus key)"
                            >
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M20 12H4" />
                                </svg>
                            </motion.button>

                            <motion.div
                                animate={{ scale: scale >= 1 ? 1.05 : 0.95 }}
                                className="text-[10px] font-black text-pastel-dark bg-white px-2.5 py-1 rounded-full shadow-sm border border-pastel-dark/20"
                            >
                                {Math.round(scale * 100)}%
                            </motion.div>

                            <motion.button
                                whileHover={{ rotate: 3 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleZoomIn}
                                disabled={scale >= MAX_SCALE}
                                className="w-7 h-7 flex items-center justify-center bg-white text-pastel-dark shadow-sm hover:shadow-md transition-all sketch-border border-pastel-dark/10 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                                aria-label="Increase video size (Press Plus key)"
                            >
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                                </svg>
                            </motion.button>
                        </motion.div>

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
