"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GSAPProvider } from "@/components/animations/GSAPProvider";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { CountUp } from "@/components/animations/CountUp";
import ShinyText from "@/components/animations/ShinyText";
import ScrollFade from "@/components/animations/ScrollFade";
import { ClientsStrip } from "@/components/sections/ClientsStrip";

const stats = [
  { end: 4, suffix: "+", label: "Years Experience" },
  { end: 80, suffix: "+", label: "Projects Completed" },
  { end: 30, suffix: "+", label: "Happy Clients" },
];

export default function AboutPage() {
  const portraitRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!portraitRef.current) return;
    
    gsap.fromTo(portraitRef.current, 
      { y: "-10%", scale: 1.1 },
      {
        y: "10%",
        ease: "none",
        scrollTrigger: {
          trigger: portraitRef.current.parentElement,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <GSAPProvider>
      <div className="min-h-screen bg-bg-primary">
        <Navbar />
        <main className="pt-20">
          <section className="section-padding relative">
            <div className="container-custom">
              <div className="grid md:grid-cols-2 gap-16 items-start">
                <ScrollReveal>
                  <div>
                    <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight">
                      Hi, I&apos;m <br />
                      <span className="font-cursive text-7xl md:text-8xl lg:text-9xl text-gold-light tracking-wide inline-block mt-4 -rotate-2">
                        Gokul
                      </span>
                    </h1>
                    <p className="font-body text-base text-text-secondary leading-relaxed mb-8">
                      I create visuals that blend creativity, emotion, and purpose. <br className="hidden md:block" />
                      From photography to design, I focus on crafting work that feels clean, meaningful, and timeless.
                    </p>
                    <div className="flex flex-col items-start gap-5">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                        <a
                          href="/design"
                          className="inline-flex items-center gap-2 font-ui text-sm text-gold-light uppercase tracking-widest hover:gap-4 transition-all"
                        >
                          DESIGN PORTFOLIO
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </a>
                        <span className="hidden sm:block text-white/20">|</span>
                        <a
                          href="/photography"
                          className="inline-flex items-center gap-2 font-ui text-sm text-gold-light uppercase tracking-widest hover:gap-4 transition-all"
                        >
                          PHOTOGRAPHY PORTFOLIO
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </a>
                      </div>
                      <a
                        href="/Gokul_Resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 font-ui text-sm text-text-muted hover:text-gold-light uppercase tracking-widest transition-all hover:translate-x-2"
                      >
                        VIEW RESUME
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={0.2}>
                  <div className="relative aspect-[4/5] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      ref={portraitRef}
                      src="/assets/about/profile.png" 
                      alt="Gokulnath" 
                      className="absolute inset-0 w-full h-full object-cover object-top will-change-transform"
                    />
                    {/* Black fade at the bottom */}
                    <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-bg-primary via-bg-primary/60 to-transparent" />
                  </div>
                </ScrollReveal>
              </div>
            </div>
            <ScrollFade position="bottom" height="10rem" />
          </section>

          <section className="py-16 border-t border-white/10">
            <div className="container-custom">
              <div className="glass p-8 md:p-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                  {stats.map((stat, index) => (
                    <ScrollReveal key={stat.label} delay={index * 0.1}>
                      <div>
                        <CountUp
                          end={stat.end}
                          suffix={stat.suffix}
                          className="font-display text-5xl md:text-6xl gold-gradient-text mb-2"
                        />
                        <p className="font-mono text-xs text-text-muted uppercase tracking-widest">
                          {stat.label}
                        </p>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="section-padding border-t border-white/10">
            <div className="container-custom">
              <div className="grid md:grid-cols-12 gap-12">
                <div className="md:col-span-4">
                  <ScrollReveal>
                    <h2 className="font-heading text-3xl md:text-4xl sticky top-32">
                      <ShinyText
                        text="The Story"
                        color="#C9A84C"
                        shineColor="#ffffff"
                        speed={3.5}
                        spread={70}
                        className="font-heading text-3xl md:text-4xl"
                      />
                    </h2>
                  </ScrollReveal>
                </div>
                <div className="md:col-span-8 space-y-12">
                  <ScrollReveal>
                    <p className="font-body text-base text-text-secondary leading-relaxed">
                      My creative journey started during my Visual Communication college days, where curiosity quickly turned into obsession. I was always experimenting — taking photos, designing posters, editing videos, and learning every creative skill I could get my hands on. What started as passion soon became the path I wanted to build my life around.
                    </p>
                  </ScrollReveal>
                  <ScrollReveal delay={0.1}>
                    <p className="font-body text-base text-text-secondary leading-relaxed">
                      From college projects to real client work, I kept pushing myself to create better visuals and stronger stories. I started working on photoshoots, branding, social media creatives, event coverage, and digital content — constantly learning through every project and every challenge.
                    </p>
                  </ScrollReveal>
                  <ScrollReveal delay={0.2}>
                    <p className="font-body text-base text-text-secondary leading-relaxed">
                      Over the years, I’ve worked with brands, events, artists, and creative teams across different industries, combining photography, design, and storytelling to create visuals that feel bold, modern, and impactful.
                    </p>
                  </ScrollReveal>
                  <ScrollReveal delay={0.3}>
                    <p className="font-body text-base text-text-secondary leading-relaxed">
                      For me, creativity is all about energy, emotion, and connection. I love building visuals that grab attention, tell stories, and leave a lasting impression — and this journey is only getting started.
                    </p>
                  </ScrollReveal>
                </div>
              </div>
            </div>
          </section>

          <ClientsStrip />

          <section className="section-padding border-t border-white/10">
            <div className="container-custom">
              <ScrollReveal>
                <h2 className="font-heading text-3xl md:text-4xl mb-12 text-center">
                  <ShinyText
                    text="Words from Collaborators"
                    color="#C9A84C"
                    shineColor="#ffffff"
                    speed={3.5}
                    spread={70}
                    className="font-heading text-3xl md:text-4xl"
                  />
                </h2>
              </ScrollReveal>
              <div className="grid md:grid-cols-2 gap-6">
                <ScrollReveal delay={0.1}>
                  <div className="glass p-8 relative">
                    <span className="font-heading text-7xl text-gold-light/10 absolute top-4 left-6">
                      &quot;
                    </span>
                    <p className="font-body text-lg text-white italic relative z-10 mb-6">
                      Working with Gokul was an absolute pleasure. His attention
                      to detail and creative vision transformed our brand identity
                      completely.
                    </p>
                    <div>
                      <p className="font-ui font-semibold text-sm text-white">
                        Sarah Chen
                      </p>
                      <p className="font-mono text-xs text-gold-light">
                        Creative Director, Uber
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
                <ScrollReveal delay={0.2}>
                  <div className="glass p-8 relative">
                    <span className="font-heading text-7xl text-gold-light/10 absolute top-4 left-6">
                      &quot;
                    </span>
                    <p className="font-body text-lg text-white italic relative z-10 mb-6">
                      Exceptional talent and professionalism. Gokul brought a
                      level of artistry to our editorial work that elevated the
                      entire publication.
                    </p>
                    <div>
                      <p className="font-ui font-semibold text-sm text-white">
                        Michael Torres
                      </p>
                      <p className="font-mono text-xs text-gold-light">
                        Editor in Chief, AGNI Magazine
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </GSAPProvider>
  );
}