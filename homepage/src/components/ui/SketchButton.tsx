import React from "react";
import { motion } from "framer-motion";

interface SketchButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline";
}

export function SketchButton({ children, className = "", variant = "primary", ...props }: SketchButtonProps) {
    const variants = {
        primary: "bg-pastel-dark text-white hover:bg-pastel-dark/85 shadow-xl",
        secondary: "bg-pastel-tan text-white hover:bg-pastel-tan/85 shadow-lg",
        outline: "border-2 border-pastel-tan/40 text-pastel-tan hover:bg-pastel-tan hover:text-white"
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
