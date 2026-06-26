"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Lightbox } from "./Lightbox";
import clsx from "clsx";

interface MediaItem {
  src: string;
  type: "image" | "gif" | "video";
}

interface MediaGalleryProps {
  media: MediaItem[];
  layout?: "default" | "single" | "hotmale" | "masonry";
}

function MediaCard({ item, onClick }: { item: MediaItem; onClick: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // IntersectionObserver for video autoplay
  useEffect(() => {
    if (item.type !== "video" || !videoRef.current) return;
    const el = videoRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => { });
        } else {
          el.pause();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [item.type]);

  if (item.type === "video") {
    return (
      <div
        ref={containerRef}
        className="relative block w-full cursor-pointer group"
        onClick={onClick}
      >
        <video
          ref={videoRef}
          src={item.src}
          muted
          loop
          playsInline
          preload="none"
          className="block w-full h-auto rounded-lg transition-transform duration-300 group-hover:scale-[1.01]"
        />
        {/* Play icon overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm">
            <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>
    );
  }

  // Images and GIFs — use native img to preserve GIF animation
  return (
    <div
      className="relative block w-full cursor-pointer group"
      onClick={onClick}
    >
      <Image
        src={item.src}
        alt=""
        width={0}
        height={0}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        style={{ width: '100%', height: 'auto' }}
        className="block rounded-lg transition-transform duration-300 group-hover:scale-[1.01]"
        unoptimized={item.type === 'gif'}
      />
      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
    </div>
  );
}

export function MediaGallery({ media, layout = "default" }: MediaGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      <div className={clsx(
        "w-full",
        layout === "single" 
          ? "flex flex-col gap-8 md:gap-12 max-w-5xl mx-auto" 
          : layout === "hotmale"
          ? "grid grid-cols-1 sm:grid-cols-6 gap-4 md:gap-6"
          : layout === "masonry" || layout === "default"
          ? "columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-6"
          : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
      )}>
        {media.map((item, i) => {
          let itemClass = "w-full";
          if (layout === "hotmale") {
            if (item.src.includes("OUT-1")) {
              itemClass = "w-full sm:col-span-3 lg:col-span-3";
            } else if (item.src.includes("REELS")) {
              itemClass = "w-full sm:col-span-2 lg:col-span-2";
            } else {
              itemClass = "w-full sm:col-span-3 lg:col-span-2";
            }
          }
          
          return (
            <div key={`${item.src}-${i}`} className={clsx(
              "w-full",
              layout === "hotmale" ? itemClass : "",
              (layout === "masonry" || layout === "default") ? "block w-full break-inside-avoid mb-4 md:mb-6" : ""
            )}>
              <MediaCard
                item={item}
                onClick={() => setLightboxIndex(i)}
              />
            </div>
          );
        })}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          media={media}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </>
  );
}
