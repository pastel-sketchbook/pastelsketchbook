import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";

interface VideoItem {
    id: string;
    title: string;
    date?: string;
    views?: number;
    tags?: string[];
    hasWiki?: boolean;
}

interface VideoGalleryProps {
    items: VideoItem[];
    onVideoSelect: (id: string) => void;
    title: string;
    description: string;
}

export function VideoGallery({ items, onVideoSelect, title, description }: VideoGalleryProps) {
    const [copiedId, setCopiedId] = useState<string | null>(null);

    const formatViews = (views?: number) => {
        if (!views) return "0";
        if (views >= 1000) return `${(views / 1000).toFixed(1)}k`;
        return views.toString();
    };

    const handleCopyUrl = async (e: React.MouseEvent, videoId: string) => {
        e.stopPropagation();
        const url = `https://www.youtube.com/watch?v=${videoId}`;
        try {
            await navigator.clipboard.writeText(url);
            setCopiedId(videoId);
            setTimeout(() => setCopiedId(null), 2000);
        } catch (err) {
            console.error('Failed to copy URL:', err);
        }
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
                <h2 className="text-4xl md:text-5xl text-pastel-dark font-serif italic leading-tight">
                    {title}
                </h2>
                <p className="text-lg text-pastel-dark/60 leading-relaxed font-serif">
                    {description}
                </p>
            </div>
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
                {items.map((item, i) => (
                    <motion.button
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        whileHover={{ y: -5 }}
                        onClick={() => onVideoSelect(item.id)}
                        className="text-left bg-white p-4 sketch-border border-pastel-dark/5 hover:shadow-lg transition-all group/card overflow-hidden w-full relative"
                    >
                        <div className="aspect-video mb-4 overflow-hidden rounded-lg bg-pastel-dark/5 relative">
                            <img
                                src={`https://img.youtube.com/vi/${item.id}/mqdefault.jpg`}
                                alt={item.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-110"
                            />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity bg-pastel-dark/20">
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
                                    <svg className="w-6 h-6 text-pastel-dark" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </div>
                            </div>
                            <button
                                onClick={(e) => handleCopyUrl(e, item.id)}
                                className="absolute top-2 right-2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm opacity-0 group-hover/card:opacity-100 transition-all hover:bg-white hover:scale-110 sketch-border border-pastel-dark/10"
                                aria-label="Copy YouTube URL"
                                title="Copy YouTube URL"
                            >
                                {copiedId === item.id ? (
                                    <svg className="w-4 h-4 text-[#5F7D61]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                ) : (
                                    <svg className="w-4 h-4 text-pastel-dark" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.193-9.193a4.5 4.5 0 00-6.364 0l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                                    </svg>
                                )}
                            </button>
                            <div className="absolute bottom-2 right-2 px-2 py-1 bg-white/90 backdrop-blur-sm text-pastel-dark text-[10px] font-bold rounded shadow-sm uppercase tracking-wider sketch-border border-pastel-dark/10">
                                {formatViews(item.views)} watches
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between items-start gap-4">
                                <h4 className="font-bold text-pastel-dark text-[10px] uppercase tracking-widest line-clamp-2 leading-relaxed flex-1">
                                    {item.title}
                                    {item.hasWiki && (
                                        <Link
                                            to="/wiki/video/$id"
                                            params={{ id: item.id }}
                                            onClick={(e) => e.stopPropagation()}
                                            className="inline-flex items-center align-middle ml-1.5 hover:scale-125 transition-transform"
                                            title="View wiki detail"
                                        >
                                            <svg
                                                className="w-3.5 h-3.5 text-[#E76F51] align-middle"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                viewBox="0 0 24 24"
                                                aria-label="Wiki detail available"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                            </svg>
                                        </Link>
                                    )}
                                </h4>
                                {item.date && (
                                    <span className="text-[12px] text-pastel-tan font-semibold font-serif italic whitespace-nowrap pt-0.5">
                                        {new Date(item.date).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}
                                    </span>
                                )}
                            </div>
                            {item.tags && item.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1.5">
                                    {item.tags.slice(0, 3).map((tag) => (
                                        <span
                                            key={tag}
                                            className="inline-block px-2 py-0.5 bg-[#5F7D61]/10 border border-[#5F7D61]/30 text-[#5F7D61] text-[8px] font-bold uppercase tracking-wider rounded-full sketch-border"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </motion.button>
                ))}
            </div>
        </motion.div>
    );
}
