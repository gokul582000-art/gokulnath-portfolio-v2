"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const outerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    // Don't render on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const outer = outerRef.current;
    const dot = dotRef.current;
    if (!outer || !dot) return;

    // Hide the native cursor
    document.documentElement.style.cursor = "none";

    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    const LERP = 0.12;

    // Track mouse position
    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      outer.style.opacity = "1";
    };

    // Hover state — interactive elements
    const onMouseOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const interactive =
        el.tagName === "A" ||
        el.tagName === "BUTTON" ||
        !!el.closest("a") ||
        !!el.closest("button") ||
        el.classList.contains("cursor-pointer");

      const isInput = el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable;

      if (interactive) {
        outer.style.width = "60px";
        outer.style.height = "60px";
        outer.style.borderColor = "rgba(201,168,76,0.3)";
        outer.style.backgroundColor = "rgba(201,168,76,0.12)";
        outer.style.borderRadius = "50%";
      } else if (isInput) {
        outer.style.width = "2px";
        outer.style.height = "24px";
        outer.style.borderColor = "#C9A84C";
        outer.style.backgroundColor = "#C9A84C";
        outer.style.borderRadius = "1px";
      } else {
        outer.style.width = "40px";
        outer.style.height = "40px";
        outer.style.borderColor = "rgba(201,168,76,0.5)";
        outer.style.backgroundColor = "transparent";
        outer.style.borderRadius = "50%";
      }
    };

    // Click pulse
    const onMouseDown = () => {
      outer.style.transform = "translate(-50%, -50%) scale(0.6)";
    };
    const onMouseUp = () => {
      outer.style.transform = "translate(-50%, -50%) scale(1)";
    };

    // Hide when leaving window
    const onMouseLeave = () => { outer.style.opacity = "0"; };
    const onMouseEnter = () => { outer.style.opacity = "1"; };

    document.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseover", onMouseOver, { passive: true });
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    // Animation loop — lerp toward target, write directly to DOM (no setState)
    const animate = () => {
      currentX += (targetX - currentX) * LERP;
      currentY += (targetY - currentY) * LERP;

      // Move the outer ring (lerped — trails slightly)
      outer.style.left = `${currentX}px`;
      outer.style.top = `${currentY}px`;

      // Move the dot exactly at mouse position (instant)
      dot.style.left = `${targetX}px`;
      dot.style.top = `${targetY}px`;

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.documentElement.style.cursor = "";
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      {/* Outer ring — lerped, trails behind */}
      <div
        ref={outerRef}
        className="fixed pointer-events-none z-[9999] rounded-full border opacity-0 hidden md:block"
        style={{
          width: 40,
          height: 40,
          top: -100,
          left: -100,
          transform: "translate(-50%, -50%) scale(1)",
          border: "1.5px solid rgba(201,168,76,0.5)",
          backgroundColor: "transparent",
          transition:
            "width 200ms ease, height 200ms ease, background-color 200ms ease, border-color 200ms ease, transform 150ms ease, opacity 300ms ease",
        }}
      />

      {/* Inner dot — snaps instantly to exact mouse position */}
      <div
        ref={dotRef}
        className="fixed pointer-events-none z-[9999] rounded-full hidden md:block"
        style={{
          width: 6,
          height: 6,
          top: -100,
          left: -100,
          transform: "translate(-50%, -50%)",
          backgroundColor: "#ffffff",
        }}
      />
    </>
  );
}