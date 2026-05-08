"use client";

import { useState, useRef, useEffect } from "react";
import { Lightbox } from "./Lightbox";

interface MediaItem {
  src: string;
  type: "image" | "gif" | "video";
}

interface MediaGalleryProps {
  media: MediaItem[];
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
        className="relative w-full cursor-pointer group"
        onClick={onClick}
      >
        <video
          ref={videoRef}
          src={item.src}
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full h-auto rounded-lg transition-transform duration-300 group-hover:scale-[1.01]"
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
      className="relative w-full cursor-pointer group"
      onClick={onClick}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.src}
        alt=""
        loading="lazy"
        className="w-full h-auto rounded-lg transition-transform duration-300 group-hover:scale-[1.01]"
      />
      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
    </div>
  );
}

export function MediaGallery({ media }: MediaGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      <div className="space-y-4 md:space-y-6">
        {media.map((item, i) => (
          <MediaCard
            key={`${item.src}-${i}`}
            item={item}
            onClick={() => setLightboxIndex(i)}
          />
        ))}
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
