import { useEffect, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { motion, AnimatePresence } from 'framer-motion'
import { VIDEO_MODAL_CONFIG } from '../config/modal'

interface VideoModalProps {
    videoId: string | null
    onClose: () => void
}

export function VideoModal({ videoId, onClose }: VideoModalProps) {
    const [scale, setScale] = useState<number>(VIDEO_MODAL_CONFIG.scale.INITIAL)
    const [isHoveringControls, setIsHoveringControls] = useState(false)
    const [copied, setCopied] = useState(false)
    const navigate = useNavigate()

    const handleGoToWiki = () => {
        if (!videoId) return
        onClose()
        navigate({ to: '/wiki/video/$id', params: { id: videoId } })
    }

    const handleCopyUrl = async () => {
        if (!videoId) return
        try {
            await navigator.clipboard.writeText(`https://www.youtube.com/watch?v=${videoId}`)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error('Failed to copy URL:', err)
        }
    }
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
                        <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
                            <button
                                className="p-2 bg-white rounded-full text-pastel-dark hover:bg-white transition-colors shadow-sm"
                                onClick={handleGoToWiki}
                                aria-label="View wiki page"
                                title="View wiki page"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                                </svg>
                            </button>
                            <button
                                className="p-2 bg-white rounded-full text-pastel-dark hover:bg-white transition-colors shadow-sm"
                                onClick={handleCopyUrl}
                                aria-label="Copy YouTube URL"
                                title="Copy YouTube URL"
                            >
                                {copied ? (
                                    <svg className="w-5 h-5 text-[#5F7D61]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.193-9.193a4.5 4.5 0 00-6.364 0l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                                    </svg>
                                )}
                            </button>
                            <button
                                className="p-2 bg-white rounded-full text-pastel-dark hover:bg-white transition-colors shadow-sm"
                                onClick={onClose}
                                aria-label="Close video"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <motion.div
                            className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10 flex gap-1.5 items-center pb-2"
                            onHoverStart={() => setIsHoveringControls(true)}
                            onHoverEnd={() => setIsHoveringControls(false)}
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: isHoveringControls ? 1 : 0, y: isHoveringControls ? 0 : 4 }}
                            transition={{ duration: 0.2 }}
                            style={{ pointerEvents: isHoveringControls ? 'auto' : 'none' }}
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
