"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GSAPProvider } from "@/components/animations/GSAPProvider";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import ShinyText from "@/components/animations/ShinyText";
import ScrollFade from "@/components/animations/ScrollFade";
import { ProjectGrid } from "@/components/gallery/ProjectGrid";
import { photographyProjects } from "@/lib/data/photography-projects";

export default function PhotographyPage() {
  return (
    <GSAPProvider>
      <div className="min-h-screen bg-bg-primary">
        <Navbar />
        <main className="pt-20">
          <section className="section-padding relative">
            <div className="container-custom">
              <ScrollReveal>
                <h1 className="font-display text-5xl md:text-7xl lg:text-[96px] leading-[0.9] tracking-tight mb-4">
                  <ShinyText
                    text="CAPTURING"
                    color="#C9A84C"
                    shineColor="#ffffff"
                    speed={3}
                    spread={70}
                    className="font-display text-5xl md:text-7xl lg:text-[96px] leading-[0.9] tracking-tight"
                  />
                  <br />
                  <ShinyText
                    text="THE UNSEEN."
                    color="#C9A84C"
                    shineColor="#ffffff"
                    speed={3}
                    spread={70}
                    delay={0.4}
                    className="font-display text-5xl md:text-7xl lg:text-[96px] leading-[0.9] tracking-tight"
                  />
                </h1>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <p className="font-body text-base text-text-secondary max-w-md mb-16">
                  A visual journey through portraits, events, and editorial
                  photography that captures authentic moments and emotions.
                </p>
              </ScrollReveal>
              <ProjectGrid projects={photographyProjects} basePath="/photography" maxInitialItems={6} />
            </div>
            <ScrollFade position="bottom" height="10rem" />
          </section>
        </main>
        <Footer />
      </div>
    </GSAPProvider>
  );
}