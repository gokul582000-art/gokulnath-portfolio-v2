"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GSAPProvider } from "@/components/animations/GSAPProvider";
import { Preloader } from "@/components/animations/Preloader";
import { HeroSection, PortfolioEntry } from "@/components/sections/HeroSection";
import { AboutSnapshot } from "@/components/sections/AboutSnapshot";
import DomeGallery from "@/components/animations/DomeGallery";
import { ClientsStrip } from "@/components/sections/ClientsStrip";
import { CTASection } from "@/components/sections/CTASection";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <GSAPProvider>
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      <div className="min-h-screen bg-bg-primary">
        <Navbar />
        <main>
          <HeroSection />
          <AboutSnapshot />
          <section className="w-full h-[80vh] md:h-screen relative overflow-hidden bg-bg-primary">
            <DomeGallery
              fit={1.0}
              fitBasis="max"
              minRadius={700}
              dragDampening={3}
            />
          </section>
          <section className="section-padding">
            <div className="container-custom">
              <div className="grid md:grid-cols-2 gap-6">
                <PortfolioEntry
                  title="Graphic Design"
                  description="Explore UI/UX & Art Direction"
                  href="/design"
                  icon="design"
                />
                <PortfolioEntry
                  title="Photography"
                  description="Explore Editorial & Architecture"
                  href="/photography"
                  icon="photography"
                />
              </div>
            </div>
          </section>
          <ClientsStrip />
          <CTASection />
        </main>
        <Footer />
      </div>
    </GSAPProvider>
  );
}