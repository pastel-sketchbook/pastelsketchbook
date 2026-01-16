import { motion } from "framer-motion";

interface VideoSearchProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    className?: string;
}

export function VideoSearch({ searchQuery, setSearchQuery, className = "" }: VideoSearchProps) {
    return (
        <div className={`relative group ${className}`}>
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-pastel-dark/30 group-focus-within:text-pastel-tan transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title or tags..."
                className="w-full pl-12 pr-6 py-4 rounded-full bg-white/50 backdrop-blur-sm border-2 border-pastel-dark/5 outline-none transition-all focus:border-pastel-tan/30 focus:bg-white sketch-border shadow-sm text-pastel-dark"
            />
            {searchQuery && (
                <button
                    onClick={() => setSearchQuery("")}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-pastel-dark/20 hover:text-pastel-terracotta transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            )}
        </div>
    );
}
