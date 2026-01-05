import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface VideoItem {
    id: string;
    title: string;
    date?: string;
    views?: number;
}

interface VideoGalleryProps {
    items: VideoItem[];
    onVideoSelect: (id: string) => void;
    title: string;
    description: string;
}

export function VideoGallery({ items, onVideoSelect, title, description }: VideoGalleryProps) {
    const formatViews = (views?: number) => {
        if (!views) return "0";
        if (views >= 1000) return `${(views / 1000).toFixed(1)}k`;
        return views.toString();
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-12"
        >
            <div className="text-center space-y-6 max-w-3xl mx-auto">
                <h2 className="text-4xl md:text-5xl text-[#1B3022] font-serif italic leading-tight">
                    {title}
                </h2>
                <p className="text-lg text-[#1B3022]/60 leading-relaxed font-serif">
                    {description}
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
                {items.map((item, i) => (
                    <motion.button
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        whileHover={{ y: -5 }}
                        onClick={() => onVideoSelect(item.id)}
                        className="text-left bg-white p-4 sketch-border border-[#1B3022]/5 hover:shadow-lg transition-all group/card overflow-hidden w-full relative"
                    >
                        <div className="aspect-video mb-4 overflow-hidden rounded-lg bg-[#1B3022]/5 relative">
                            <img
                                src={`https://img.youtube.com/vi/${item.id}/mqdefault.jpg`}
                                alt={item.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-110"
                            />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity bg-[#1B3022]/20">
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
                                    <svg className="w-6 h-6 text-[#1B3022]" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/60 backdrop-blur-sm text-white text-[8px] font-bold rounded uppercase tracking-tighter">
                                {formatViews(item.views)} watches
                            </div>
                        </div>
                        <div className="flex justify-between items-start gap-4">
                            <h4 className="font-bold text-[#1B3022] text-[10px] uppercase tracking-widest line-clamp-2 leading-relaxed flex-1">
                                {item.title}
                            </h4>
                            {item.date && (
                                <span className="text-[8px] text-[#1B3022]/30 font-serif italic whitespace-nowrap pt-0.5">
                                    {new Date(item.date).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}
                                </span>
                            )}
                        </div>
                    </motion.button>
                ))}
            </div>
        </motion.div>
    );
}
