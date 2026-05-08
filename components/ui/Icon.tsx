"use client";

import { cn } from "@/lib/utils/cn";
import { LucideIcon } from "lucide-react";

interface IconProps {
  name: LucideIcon;
  className?: string;
}

export function Icon({ name: IconComponent, className }: IconProps) {
  return <IconComponent className={cn("w-5 h-5", className)} />;
}