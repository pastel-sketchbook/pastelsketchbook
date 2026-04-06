import React, { forwardRef } from "react";

export interface SketchBoxProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
}

export const SketchBox = forwardRef<HTMLDivElement, SketchBoxProps>(
    ({ children, className = "", ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={`sketch-border border-pastel-dark/10 group hover:shadow-lg transition-all animate-scribble ${className}`}
                {...props}
            >
                {children}
            </div>
        );
    }
);

SketchBox.displayName = "SketchBox";
