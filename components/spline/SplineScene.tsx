"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const Spline = dynamic(() => import("@splinetool/react-spline").then((mod) => mod.default), {
  ssr: false,
  loading: () => <SplineSkeleton />,
});

interface SplineSceneProps {
  scene?: string;
  className?: string;
}

function SplineSkeleton() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-gold-dark/20 to-transparent animate-pulse rounded-2xl" />
  );
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  if (!scene) {
    return <SplineSkeleton />;
  }

  return (
    <div className={className}>
      {!isLoaded && <SplineSkeleton />}
      <Spline
        scene={scene}
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full ${isLoaded ? "opacity-100" : "opacity-0"} transition-opacity duration-500`}
      />
    </div>
  );
}