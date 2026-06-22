"use client";

import { useEffect, useCallback, useState } from "react";
import Image from "next/image";

interface MediaItem {
  src: string;
  type: "image" | "gif" | "video";
}

interface LightboxProps {
  media: MediaItem[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function Lightbox({ media, currentIndex, onClose, onNavigate }: LightboxProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const item = media[currentIndex];

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && currentIndex > 0) {
        setIsLoaded(false);
        onNavigate(currentIndex - 1);
      }
      if (e.key === "ArrowRight" && currentIndex < media.length - 1) {
        setIsLoaded(false);
        onNavigate(currentIndex + 1);
      }
    },
    [currentIndex, media.length, onClose, onNavigate]
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    setIsLoaded(false);
  }, [currentIndex]);

  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < media.length - 1;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/95 backdrop-blur-sm" />

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
        aria-label="Close"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Counter */}
      <div className="absolute top-4 left-4 z-50 font-mono text-xs text-white/50">
        {currentIndex + 1} / {media.length}
      </div>

      {/* Prev */}
      {hasPrev && (
        <button
          onClick={(e) => { e.stopPropagation(); setIsLoaded(false); onNavigate(currentIndex - 1); }}
          className="absolute left-4 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
          aria-label="Previous"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Next */}
      {hasNext && (
        <button
          onClick={(e) => { e.stopPropagation(); setIsLoaded(false); onNavigate(currentIndex + 1); }}
          className="absolute right-4 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
          aria-label="Next"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Media */}
      <div
        className="relative z-10 w-full px-4 md:px-[5%] h-[100vh] pt-[80px] pb-[120px] flex items-center justify-center pointer-events-none"
      >
        {item.type === "video" ? (
          <video
            key={item.src}
            src={item.src}
            controls
            autoPlay
            playsInline
            className="max-w-full max-h-full object-contain rounded-lg pointer-events-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <div className="relative w-full h-full pointer-events-auto" onClick={(e) => e.stopPropagation()}>
            <Image
              key={item.src}
              src={item.src}
              alt=""
              fill
              sizes="92vw"
              unoptimized={item.type === "gif"}
              onLoad={() => setIsLoaded(true)}
              className={`object-contain rounded-lg transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}
            />
          </div>
        )}
      </div>

      {/* Thumbnail Strip */}
      <div className="absolute bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-t from-black/80 to-transparent">
        <div className="flex gap-2 max-w-5xl mx-auto overflow-x-auto pb-2 scrollbar-hide items-center justify-center sm:justify-start lg:justify-center">
          {media.map((m, idx) => {
            const isVideo = m.type === "video";
            return (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsLoaded(false);
                  onNavigate(idx);
                }}
                className={`relative w-12 h-12 md:w-16 md:h-16 shrink-0 rounded-md overflow-hidden transition-all duration-300 ${
                  currentIndex === idx
                    ? "ring-2 ring-gold-light opacity-100 scale-105"
                    : "opacity-40 hover:opacity-100"
                }`}
              >
                {isVideo ? (
                  <video src={m.src} className="w-full h-full object-cover pointer-events-none" preload="metadata" />
                ) : (
                  <Image src={m.src} alt="" fill sizes="(max-width: 768px) 48px, 64px" unoptimized={m.type === "gif"} className="object-cover pointer-events-none" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
