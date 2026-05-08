"use client";

import { cn } from "@/lib/utils/cn";
import { LucideIcon } from "lucide-react";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  loading?: boolean;
}

export function Button({
  variant = "primary",
  size = "md",
  children,
  className,
  icon: Icon,
  iconPosition = "right",
  loading = false,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-ui font-semibold uppercase tracking-widest transition-all duration-300 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-gold-gradient text-bg-primary hover:brightness-110",
    outline:
      "border-2 border-gold-light text-gold-light hover:bg-gold-light hover:text-bg-primary",
    ghost: "text-text-primary hover:text-gold-light",
  };

  const sizes = {
    sm: "text-xs px-4 py-2 gap-1.5",
    md: "text-sm px-6 py-3 gap-2",
    lg: "text-base px-8 py-4 gap-2.5",
  };

  const IconToRender = Icon;

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled || loading}
      {...props}
    >
      {Icon && iconPosition === "left" && <Icon className="w-4 h-4" />}
      {loading ? "Loading..." : children}
      {Icon && !loading && iconPosition === "right" && IconToRender && <IconToRender className="w-4 h-4" />}
    </button>
  );
}