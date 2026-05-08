"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GSAPProvider } from "@/components/animations/GSAPProvider";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import ShinyText from "@/components/animations/ShinyText";
import { MediaGallery } from "@/components/gallery/MediaGallery";
import { photographyProjects } from "@/lib/data/photography-projects";

export default function PhotographyProjectPage() {
  const params = useParams<{ slug: string }>();
  const project = photographyProjects.find((p) => p.slug === params.slug);

  if (!project) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl text-white mb-4">Project Not Found</h1>
          <Link href="/photography" className="font-ui text-sm text-gold-light hover:underline">
            ← Back to Photography
          </Link>
        </div>
      </div>
    );
  }

  const idx = photographyProjects.findIndex((p) => p.slug === params.slug);
  const prev = idx > 0 ? photographyProjects[idx - 1] : null;
  const next = idx < photographyProjects.length - 1 ? photographyProjects[idx + 1] : null;

  return (
    <GSAPProvider>
      <div className="min-h-screen bg-bg-primary">
        <Navbar />
        <main className="pt-20">
          <article>
            <section className="section-padding pb-8 md:pb-12">
              <div className="container-custom">
                <ScrollReveal>
                  <Link
                    href="/photography"
                    className="inline-flex items-center gap-2 font-ui text-xs text-text-muted uppercase tracking-widest hover:text-gold-light transition-colors mb-8"
                  >
                    <ArrowLeft className="w-3 h-3" />
                    Back to Photography
                  </Link>
                </ScrollReveal>

                <ScrollReveal delay={0.1}>
                  <h1 className="font-display text-4xl md:text-6xl lg:text-[80px] leading-[0.95] tracking-tight mb-6">
                    <ShinyText
                      text={project.title}
                      color="#C9A84C"
                      shineColor="#ffffff"
                      speed={3}
                      spread={70}
                      className="font-display text-4xl md:text-6xl lg:text-[80px] leading-[0.95] tracking-tight"
                    />
                  </h1>
                </ScrollReveal>

                <ScrollReveal delay={0.15}>
                  <div className="flex flex-wrap gap-8 mb-8 pb-8 border-b border-white/10">
                    <div>
                      <p className="font-mono text-[10px] text-gold-light uppercase tracking-widest mb-1">Category</p>
                      <p className="font-ui text-sm text-white">{project.category}</p>
                    </div>
                    <div>
                      <p className="font-mono text-[10px] text-gold-light uppercase tracking-widest mb-1">Year</p>
                      <p className="font-ui text-sm text-white">{project.year}</p>
                    </div>
                    <div>
                      <p className="font-mono text-[10px] text-gold-light uppercase tracking-widest mb-1">Photos</p>
                      <p className="font-ui text-sm text-white">{project.media.length} images</p>
                    </div>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={0.2}>
                  <p className="font-body text-base md:text-lg text-text-secondary leading-relaxed max-w-3xl mb-16">
                    {project.description}
                  </p>
                </ScrollReveal>
              </div>
            </section>

            <section className="pb-16 md:pb-24">
              <div className="container-custom max-w-[960px]">
                <MediaGallery media={project.media} />
              </div>
            </section>

            <nav className="container-custom pb-12 flex justify-between items-center pt-8 border-t border-white/10">
              {prev ? (
                <Link
                  href={`/photography/${prev.slug}`}
                  className="flex items-center gap-2 text-text-muted hover:text-gold-light transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <div>
                    <span className="font-ui text-xs uppercase tracking-wider block">Previous</span>
                    <span className="font-ui text-sm text-white">{prev.title}</span>
                  </div>
                </Link>
              ) : <div />}
              {next && (
                <Link
                  href={`/photography/${next.slug}`}
                  className="flex items-center gap-2 text-text-muted hover:text-gold-light transition-colors text-right"
                >
                  <div>
                    <span className="font-ui text-xs uppercase tracking-wider block">Next</span>
                    <span className="font-ui text-sm text-white">{next.title}</span>
                  </div>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </nav>
          </article>
        </main>
        <Footer />
      </div>
    </GSAPProvider>
  );
}