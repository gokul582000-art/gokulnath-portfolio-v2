"use client";

import { useEffect, useRef } from "react";
import { ChevronDown, Diamond, Camera } from "lucide-react";
import ShinyText from "@/components/animations/ShinyText";
import ScrollFade from "@/components/animations/ScrollFade";
import GradientBlinds from "@/components/animations/GradientBlinds";

export function HeroSection() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const heading = headingRef.current;
    const subtitle = subtitleRef.current;
    const scroll = scrollRef.current;

    if (!heading || !subtitle || !scroll) return;
    import("gsap").then((gsapModule) => {
      const gsap = gsapModule.gsap;
      const tl = gsap.timeline();

      tl.fromTo(
        heading,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      )
        .to(
          subtitle,
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.4"
        )
        .to(
          scroll,
          { opacity: 1, duration: 0.6 },
          "-=0.2"
        );
    });
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center pb-20 overflow-hidden">
      {/* Dynamic Background Blinds */}
      <div className="absolute inset-0 w-full h-full z-0 opacity-80">
        <GradientBlinds
          dpr={1}
          gradientColors={['#1F1A0D', '#C9A84C', '#4A3B18', '#DFCA8A']}
          angle={45}
          noise={0.15}
          blindCount={12}
          spotlightRadius={0.9}
          spotlightSoftness={0.7}
          spotlightOpacity={0.8}
          mixBlendMode="screen"
        />
      </div>

      <div className="container-custom relative z-10 flex flex-col items-center text-center">
        <div className="max-w-4xl flex flex-col items-center">
          <h1
            ref={headingRef}
            className="font-display text-6xl md:text-8xl lg:text-[110px] leading-[0.9] tracking-tight mb-6 opacity-0"
          >
            <ShinyText
              text="GOKULNATH"
              color="#C9A84C"
              shineColor="#ffffff"
              speed={3}
              spread={70}
              delay={0.5}
              className="font-display text-6xl md:text-8xl lg:text-[96px] leading-[0.9] tracking-tight"
            />
          </h1>
          <div
            ref={subtitleRef}
            className="font-mono text-xs md:text-sm uppercase tracking-[0.15em] flex items-center justify-center gap-4 opacity-0"
          >
            <span className="w-8 md:w-12 h-px bg-gold-light opacity-60" />
            <ShinyText
              text="Photographer & Designer"
              color="rgba(255,255,255,0.6)"
              shineColor="#C9A84C"
              speed={4}
              spread={60}
              delay={1}
              className="font-mono text-xs md:text-sm uppercase tracking-[0.15em]"
            />
            <span className="w-8 md:w-12 h-px bg-gold-light opacity-60" />
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0 z-30"
      >
        <span className="font-mono text-xs text-white/70 uppercase tracking-widest">
          Scroll
        </span>
        <ChevronDown className="w-5 h-5 text-white/80 animate-bounce" />
      </div>

      <div className="absolute right-0 top-0 w-1/2 h-full hidden lg:block z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-l from-bg-primary via-bg-primary/50 to-transparent z-10" />
      </div>

      {/* Scroll-down fade hint */}
      <ScrollFade position="bottom" height="12rem" />
    </section>
  );
}

interface PortfolioEntryProps {
  title: string;
  description: string;
  href: string;
  icon: "design" | "photography";
}

export function PortfolioEntry({ title, description, href, icon }: PortfolioEntryProps) {
  return (
    <a
      href={href}
      className="group glass p-8 w-full h-full flex flex-col items-center text-center transition-all duration-300 hover:glass-hover"
    >
      <div className="w-16 h-16 mb-6 flex items-center justify-center rounded-full glass">
        {icon === "design" ? (
          <Diamond className="w-8 h-8 text-gold-light" />
        ) : (
          <Camera className="w-8 h-8 text-gold-light" />
        )}
      </div>
      <h3 className="font-heading text-2xl mb-2">
        <ShinyText
          text={title}
          color="#ffffff"
          shineColor="#C9A84C"
          speed={4}
          spread={80}
          delay={0.5}
          className="font-heading text-2xl"
        />
      </h3>
      <p className="font-body text-sm text-text-secondary">
        {description}
      </p>
      <span className="mt-4 font-ui text-xs text-gold-light uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">
        Explore
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </span>
    </a>
  );
}