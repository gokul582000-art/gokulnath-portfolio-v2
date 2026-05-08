"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GSAPProvider } from "@/components/animations/GSAPProvider";
import { ContactForm, SocialChips } from "@/components/sections/ContactForm";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import ShinyText from "@/components/animations/ShinyText";
import ScrollFade from "@/components/animations/ScrollFade";

export default function ContactPage() {
  return (
    <GSAPProvider>
      <div className="min-h-screen bg-bg-primary">
        <Navbar />
        <main className="pt-20">
          <section className="section-padding relative">
            <div className="container-custom max-w-[640px] mx-auto">
              <ScrollReveal>
                <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl mb-4">
                  <ShinyText
                    text="Let's Create"
                    color="#C9A84C"
                    shineColor="#ffffff"
                    speed={3}
                    spread={70}
                    className="font-heading text-4xl md:text-5xl lg:text-6xl"
                  />
                  <br />
                  <ShinyText
                    text="Something."
                    color="#C9A84C"
                    shineColor="#ffffff"
                    speed={3}
                    spread={70}
                    delay={0.4}
                    className="font-heading text-4xl md:text-5xl lg:text-6xl"
                  />
                </h1>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <p className="font-body text-base text-text-secondary mb-12">
                  Available for freelance projects and full-time opportunities.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.4}>
                <ContactForm />
              </ScrollReveal>
              <ScrollReveal delay={0.6}>
                <div className="mt-12">
                  <SocialChips />
                </div>
              </ScrollReveal>
            </div>
            <ScrollFade position="bottom" height="10rem" />
          </section>
        </main>
        <Footer />
      </div>
    </GSAPProvider>
  );
}