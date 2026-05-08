"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import gsap from "gsap";

interface ProjectCardData {
  slug: string;
  title: string;
  category: string;
  thumbnail: string;
}

interface ProjectGridProps {
  projects: ProjectCardData[];
  basePath: string; // "/design" or "/photography"
  maxInitialItems?: number;
}

function ThumbnailMedia({ src, title }: { src: string; title: string }) {
  const isVideo = /\.(mp4|mov|webm)$/i.test(src);

  if (isVideo) {
    return (
      <video
        src={src}
        muted
        loop
        playsInline
        autoPlay
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    );
  }

  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={src}
      alt={title}
      loading="lazy"
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
    />
  );
}

export function ProjectGrid({ projects, basePath, maxInitialItems }: ProjectGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(maxInitialItems || projects.length);
  const displayedProjects = projects.slice(0, visibleCount);
  const hasMore = visibleCount < projects.length;

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll("[data-card]:not(.animated)");
    if (cards.length === 0) return;

    gsap.fromTo(
      cards,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.06, ease: "power3.out", onComplete: () => {
        cards.forEach(c => c.classList.add("animated"));
      }}
    );
  }, [visibleCount]);

  return (
    <div className="flex flex-col items-center">
      <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 w-full">
        {displayedProjects.map((project) => (
        <Link
          key={project.slug}
          href={`${basePath}/${project.slug}`}
          data-card
          className="group relative flex flex-col h-full"
        >
          {/* Thumbnail container — 4:5 ratio */}
          <div className="relative w-full aspect-[4/5] shrink-0 overflow-hidden rounded-2xl glass hover:glass-hover transition-all duration-300">
            <ThumbnailMedia src={project.thumbnail} title={project.title} />

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/90 via-bg-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 md:p-6">
              <p className="font-mono text-[10px] text-gold-light uppercase tracking-widest mb-1">
                {project.category}
              </p>
              <h3 className="font-ui font-bold text-base md:text-lg text-white leading-tight">
                {project.title}
              </h3>
            </div>
          </div>

          {/* Title text below card */}
          <div className="pt-4 flex flex-col">
            <p className="font-ui text-sm text-white/90 truncate group-hover:text-gold-light transition-colors duration-300">{project.title}</p>
            <p className="font-mono text-[10px] text-text-muted uppercase tracking-wider mt-1">
              {project.category}
            </p>
          </div>
        </Link>
      ))}
      </div>
      
      {hasMore && (
        <div className="mt-12 flex justify-center w-full">
          <button
            onClick={() => setVisibleCount((prev: number) => prev + 6)}
            className="px-8 py-3 rounded-full border border-white/10 hover:border-gold-light text-sm font-ui text-text-muted hover:text-white uppercase tracking-widest transition-all duration-300 hover:scale-105 bg-white/5 backdrop-blur-sm"
          >
            Load More Projects
          </button>
        </div>
      )}
    </div>
  );
}
