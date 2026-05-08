"use client";

import { cn } from "@/lib/utils/cn";
import { ReactNode } from "react";

interface GlassCardProps {
  hover?: boolean;
  accent?: boolean;
  padding?: "sm" | "md" | "lg";
  children: ReactNode;
  className?: string;
}

const paddingSizes = {
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export function GlassCard({
  hover = false,
  accent = false,
  padding = "md",
  children,
  className,
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass rounded-2xl transition-all duration-300",
        hover && "cursor-pointer hover:glass-hover",
        paddingSizes[padding],
        accent && "border-t-2 border-t-gold-light",
        className
      )}
    >
      {children}
    </div>
  );
}