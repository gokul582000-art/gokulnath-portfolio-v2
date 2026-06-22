"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import ShinyText from "@/components/animations/ShinyText";
import clsx from "clsx";
import { Camera, Palette, User, MessageSquare } from "lucide-react";

const navLinks = [
  { label: "Design", href: "/design" },
  { label: "Photography", href: "/photography" },
  { label: "About", href: "/about" },
];

const mobileNavLinks = [
  { label: "Design", href: "/design", icon: Palette },
  { label: "Photo", href: "/photography", icon: Camera },
  { label: "About", href: "/about", icon: User },
  { label: "Contact", href: "/contact", icon: MessageSquare },
];

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 flex justify-center px-4 transition-all duration-300",
        isScrolled ? "pt-4" : "pt-6"
      )}
    >
      <nav
        className={clsx(
          "flex items-center justify-between w-full max-w-5xl px-6 py-3 transition-all duration-300 rounded-full",
          "bg-bg-primary/70 backdrop-blur-md border shadow-glass",
          isScrolled ? "border-glass-border" : "border-transparent"
        )}
      >
        {/* Logo */}
        <Link href="/" className="flex-shrink-0 group">
          <ShinyText
            text="GOKULNATH"
            color="#C9A84C"
            shineColor="#ffffff"
            speed={4}
            spread={60}
            delay={0.5}
            className="font-display text-xl md:text-2xl tracking-widest group-hover:scale-105 transition-transform"
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || pathname?.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "px-4 py-2 rounded-full font-ui text-sm tracking-wide transition-all duration-300 relative",
                  isActive
                    ? "text-gold-light bg-glass-bg"
                    : "text-text-secondary hover:text-white hover:bg-glass-bg/50"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div className="hidden md:flex flex-shrink-0">
          <Link
            href="/contact"
            className="px-6 py-2 rounded-full font-ui text-sm font-medium tracking-wide border border-gold-light/30 text-gold-light hover:bg-gold-light hover:text-bg-primary transition-all duration-300"
          >
            Let&apos;s Talk
          </Link>
        </div>

      </nav>

      {/* Mobile Bottom Tab Bar */}
      <div className="md:hidden fixed bottom-4 left-4 right-4 z-50">
        <nav className="flex items-center justify-around w-full px-2 py-3 rounded-2xl bg-bg-primary/90 backdrop-blur-xl border border-glass-border shadow-glass-hover">
          {mobileNavLinks.map((link) => {
            const isActive = pathname === link.href || pathname?.startsWith(`${link.href}/`);
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "flex flex-col items-center justify-center space-y-1 transition-all duration-300",
                  isActive ? "text-gold-light" : "text-text-secondary hover:text-white"
                )}
              >
                <div className={clsx("p-1.5 rounded-full transition-all duration-300", isActive ? "bg-gold-light/10" : "")}>
                  <Icon size={20} className={isActive ? "drop-shadow-[0_0_8px_rgba(201,168,76,0.5)]" : ""} />
                </div>
                <span className="text-[10px] font-ui tracking-wider uppercase">{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
