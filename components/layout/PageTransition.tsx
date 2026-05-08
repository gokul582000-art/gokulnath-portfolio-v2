"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface PageTransitionProps {
  children: React.ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    const tl = gsap.timeline();

    tl.fromTo(
      overlay,
      { clipPath: "inset(0 0 100% 0)" },
      { clipPath: "inset(0 0 0% 0)", duration: 0.4, ease: "power3.inOut" }
    ).to(
      overlay,
      {
        clipPath: "inset(100% 0 0% 0)",
        duration: 0.4,
        ease: "power3.inOut",
        delay: 0.1,
      }
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <>
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[9998] bg-bg-primary pointer-events-none"
        style={{ clipPath: "inset(0 0 100% 0)" }}
      />
      {children}
    </>
  );
}