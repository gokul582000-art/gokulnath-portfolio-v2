"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SplitTextProps {
  text: string;
  className?: string;
  type?: "chars" | "words";
  wrapper?: "span" | "div" | "p";
}

export function SplitText({
  text,
  className = "",
  type = "words",
  wrapper: Wrapper = "div",
}: SplitTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = container.children;

    gsap.fromTo(
      elements,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: type === "chars" ? 0.04 : 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [text, type]);

  const renderSplitContent = () => {
    if (type === "chars") {
      return text.split("").map((char, i) => (
        <span key={i} className="inline-block">
          {char === " " ? "\u00A0" : char}
        </span>
      ));
    }

    return text.split(" ").map((word, i) => (
      <span key={i} className="inline-block mr-2">
        {word}
      </span>
    ));
  };

  return (
    <Wrapper ref={containerRef} className={className}>
      {renderSplitContent()}
    </Wrapper>
  );
}