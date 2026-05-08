"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
import ShinyText from "@/components/animations/ShinyText";
import DotGrid from "@/components/animations/DotGrid";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function CTASection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const heading = headingRef.current;
    if (!heading) return;

    const words = heading.querySelectorAll(".word");

    gsap.fromTo(
      words,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="section-padding border-t border-white/10 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <DotGrid
          dotSize={6}
          gap={24}
          baseColor="#333"
          activeColor="#C9A84C"
          proximity={120}
          shockRadius={250}
          shockStrength={5}
          resistance={750}
          returnDuration={1.5}
        />
      </div>
      <div className="container-custom relative z-10 pointer-events-none">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pointer-events-auto">
          <h2
            ref={headingRef}
            className="font-display text-4xl md:text-6xl lg:text-7xl text-center md:text-left"
          >
            <span className="word inline-block mr-3">
              <ShinyText text="LET'S" color="#C9A84C" shineColor="#ffffff" speed={3} spread={70} className="font-display text-4xl md:text-6xl lg:text-7xl" />
            </span>
            <span className="word inline-block mr-3">
              <ShinyText text="WORK" color="#C9A84C" shineColor="#ffffff" speed={3} spread={70} delay={0.3} className="font-display text-4xl md:text-6xl lg:text-7xl" />
            </span>
            <br className="md:hidden" />
            <span className="word inline-block mr-3">
              <ShinyText text="TOGETHER" color="#C9A84C" shineColor="#ffffff" speed={3} spread={70} delay={0.6} className="font-display text-4xl md:text-6xl lg:text-7xl" />
            </span>
          </h2>
          <Link href="/contact" className="flex-shrink-0 relative z-10">
            <Button
              variant="ghost"
              size="lg"
              className="glass hover:glass-hover text-gold-light hover:text-gold-light w-full"
              iconPosition="right"
            >
              Start a Project
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}