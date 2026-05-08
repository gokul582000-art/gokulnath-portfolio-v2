"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface PreloaderProps {
  onComplete?: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const loaderRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const loader = loaderRef.current;
    const logo = logoRef.current;

    if (!loader || !logo) return;

    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      },
    });

    const pathLength = logo.getTotalLength();
    logo.style.strokeDasharray = `${pathLength}`;
    logo.style.strokeDashoffset = `${pathLength}`;

    tl.to(logo, {
      strokeDashoffset: 0,
      duration: 0.8,
      ease: "power2.inOut",
    }).to(
      loader,
      {
        clipPath: "inset(0 0 100% 0)",
        duration: 0.6,
        ease: "power3.inOut",
      },
      "+=0.2"
    );

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[10000] bg-bg-primary flex items-center justify-center"
      style={{
        clipPath: "inset(0 0 0% 0)",
      }}
    >
      <svg
        width="120"
        height="120"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          ref={logoRef}
          d="M60 10 L100 40 L100 80 L60 110 L20 80 L20 40 Z"
          stroke="url(#goldGradient)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <text
          x="60"
          y="70"
          textAnchor="middle"
          className="font-display text-4xl fill-white"
          style={{ fontFamily: "var(--font-bebas)" }}
        >
          GN
        </text>
        <defs>
          <linearGradient
            id="goldGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#C9A84C" />
            <stop offset="50%" stopColor="#A07830" />
            <stop offset="100%" stopColor="#6B4F1A" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}