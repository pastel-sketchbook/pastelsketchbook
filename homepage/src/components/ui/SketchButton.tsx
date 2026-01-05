import React from "react";
import { motion } from "framer-motion";

interface SketchButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline";
}

export function SketchButton({ children, className = "", variant = "primary", ...props }: SketchButtonProps) {
    const variants = {
        primary: "bg-[#1B3022] text-white hover:bg-[#2D4536] shadow-xl",
        secondary: "bg-[#D4A373] text-white hover:bg-[#C39262] shadow-lg",
        outline: "border-2 border-[#D4A373]/40 text-[#D4A373] hover:bg-[#D4A373] hover:text-white"
    };

    return (
        <motion.button
            className={`
        px-12 py-6 rounded-full transition-all duration-300 disabled:opacity-50 
        font-bold flex items-center justify-center gap-3 uppercase tracking-widest text-xs
        ${variants[variant]}
        ${className}
      `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            {...props}
        >
            {children}
        </motion.button>
    );
}
