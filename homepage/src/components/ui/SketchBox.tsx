import React, { forwardRef } from "react";

interface SketchBoxProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    as?: React.ElementType;
}

export const SketchBox = forwardRef<HTMLDivElement, SketchBoxProps>(
    ({ children, className = "", as: Component = "div", ...props }, ref) => {
        return (
            <Component
                ref={ref}
                className={`sketch-border border-pastel-dark/10 group hover:shadow-lg transition-all animate-scribble ${className}`}
                {...props}
            >
                {children}
            </Component>
        );
    }
);

SketchBox.displayName = "SketchBox";
