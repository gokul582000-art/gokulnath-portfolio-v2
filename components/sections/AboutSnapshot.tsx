"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import ShinyText from "@/components/animations/ShinyText";

const skills = [
  "Art Direction",
  "UI/UX Design",
  "Editorial Photography",
  "Brand Identity",
  "Visual Design",
  "Creative Strategy",
];

export function AboutSnapshot() {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="grid md:grid-cols-5 gap-12 items-start">
          <ScrollReveal className="md:col-span-2">
            <h2 className="font-heading text-4xl md:text-5xl">
              <ShinyText
                text="About"
                color="#C9A84C"
                shineColor="#ffffff"
                speed={3}
                spread={70}
                className="font-heading text-4xl md:text-5xl"
              />
            </h2>
          </ScrollReveal>

          <ScrollReveal className="md:col-span-3" delay={0.2}>
            <p className="font-body text-base text-text-secondary leading-relaxed mb-8">
              A creative professional with over a decade of experience in visual
              storytelling, brand identity, and digital design. My work bridges
              the gap between artistic vision and strategic communication,
              creating experiences that resonate with audiences and drive results.
            </p>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 rounded-full text-xs font-ui text-gold-light glass border border-glass-border"
                >
                  {skill}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}