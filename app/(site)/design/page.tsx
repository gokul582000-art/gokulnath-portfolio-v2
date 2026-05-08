"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GSAPProvider } from "@/components/animations/GSAPProvider";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import ShinyText from "@/components/animations/ShinyText";
import ScrollFade from "@/components/animations/ScrollFade";
import { ProjectGrid } from "@/components/gallery/ProjectGrid";
import { designProjects } from "@/lib/data/design-projects";

export default function DesignPage() {
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
                    text="PROOF OF CONCEPT"
                    color="#C9A84C"
                    shineColor="#ffffff"
                    speed={3}
                    spread={70}
                    className="font-display text-5xl md:text-7xl lg:text-[96px] leading-[0.9] tracking-tight"
                  />
                </h1>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <p className="font-ui text-text-muted text-base md:text-lg max-w-2xl mt-4 mb-16">
                  Where raw strategy meets refined execution. Explore a gallery of visual solutions designed to move the needle and define modern brands.
                </p>
              </ScrollReveal>
              <ProjectGrid projects={designProjects} basePath="/design" maxInitialItems={6} />
            </div>
            <ScrollFade position="bottom" height="10rem" />
          </section>
        </main>
        <Footer />
      </div>
    </GSAPProvider>
  );
}