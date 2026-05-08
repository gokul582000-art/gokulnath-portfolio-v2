"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils/cn";

interface LogoStripProps {
  logos: { name: string; href?: string }[];
  speed?: number;
  className?: string;
}

export function LogoStrip({ logos, speed = 30, className }: LogoStripProps) {
  const stripRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const strip = stripRef.current;
    const container = containerRef.current;
    if (!strip || !container) return;

    const totalWidth = strip.scrollWidth / 2;
    let animation: gsap.core.Tween;

    const animate = () => {
      animation = gsap.to(strip, {
        x: -totalWidth,
        duration: speed,
        ease: "none",
        repeat: -1,
        onRepeat: () => {
          gsap.set(strip, { x: 0 });
        },
      });
    };

    animate();

    return () => {
      animation?.kill();
    };
  }, [speed]);

  const duplicatedLogos = [...logos, ...logos];

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden bg-white/3 border-t border-b border-glass-border",
        className
      )}
    >
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(to right, #080808 0%, transparent 10%, transparent 90%, #080808 100%)",
        }}
      />
      <div ref={stripRef} className="flex items-center py-6 whitespace-nowrap">
        {duplicatedLogos.map((logo, index) => (
          <a
            key={`${logo.name}-${index}`}
            href={logo.href || "#"}
            className="mx-8 font-display text-3xl text-white/50 hover:text-white transition-all duration-300 hover:scale-105"
            onClick={(e) => e.preventDefault()}
          >
            {logo.name}
          </a>
        ))}
      </div>
    </div>
  );
}