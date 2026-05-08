import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatAspectRatio(width: number, height: number): string {
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
  const divisor = gcd(width, height);
  return `${width / divisor}:${height / divisor}`;
}

export function getAspectRatioClass(width: number, height: number): string {
  const ratio = width / height;
  if (ratio > 1.5) return "aspect-video";
  if (ratio > 1.2) return "aspect-[4/3]";
  if (ratio > 0.8) return "aspect-square";
  if (ratio > 0.6) return "aspect-[3/4]";
  return "aspect-[2/3]";
}