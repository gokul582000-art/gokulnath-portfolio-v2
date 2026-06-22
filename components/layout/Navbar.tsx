"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import ShinyText from "@/components/animations/ShinyText";
import clsx from "clsx";
const navLinks = [
  { label: "Design", href: "/design" },
  { label: "Photography", href: "/photography" },
  { label: "About", href: "/about" },
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
        "fixed top-0 left-0 right-0 z-50 flex justify-center px-2 md:px-4 transition-all duration-300",
        isScrolled ? "pt-2 md:pt-4" : "pt-4 md:pt-6"
      )}
    >
      <nav
        className={clsx(
          "flex items-center justify-between w-full max-w-5xl px-3 md:px-6 py-2 md:py-3 transition-all duration-300 rounded-full",
          "bg-bg-primary/70 backdrop-blur-md border shadow-glass",
          isScrolled ? "border-glass-border" : "border-transparent"
        )}
      >
        {/* Logo */}
        <Link href="/" className="flex-shrink-0 group mr-2 md:mr-0">
          <ShinyText
            text="GOKULNATH"
            color="#C9A84C"
            shineColor="#ffffff"
            speed={4}
            spread={60}
            delay={0.5}
            className="font-display text-lg md:text-2xl tracking-widest group-hover:scale-105 transition-transform"
          />
        </Link>

        {/* Links - Scrollable on mobile */}
        <div className="flex items-center space-x-1 overflow-x-auto no-scrollbar scroll-smooth flex-nowrap" style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {navLinks.map((link) => {
            const isActive = pathname === link.href || pathname?.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "whitespace-nowrap px-3 md:px-4 py-1.5 md:py-2 rounded-full font-ui text-xs md:text-sm tracking-wide transition-all duration-300 relative",
                  isActive
                    ? "text-gold-light bg-glass-bg"
                    : "text-text-secondary hover:text-white hover:bg-glass-bg/50"
                )}
              >
                {link.label}
              </Link>
            );
          })}
          
          {/* CTA on Mobile inside the scrollable area */}
          <Link
            href="/contact"
            className="md:hidden whitespace-nowrap px-4 py-1.5 rounded-full font-ui text-xs font-medium tracking-wide border border-gold-light/30 text-gold-light hover:bg-gold-light hover:text-bg-primary transition-all duration-300 ml-1"
          >
            Talk
          </Link>
        </div>

        {/* CTA on Desktop */}
        <div className="hidden md:flex flex-shrink-0 ml-2">
          <Link
            href="/contact"
            className="px-6 py-2 rounded-full font-ui text-sm font-medium tracking-wide border border-gold-light/30 text-gold-light hover:bg-gold-light hover:text-bg-primary transition-all duration-300"
          >
            Let&apos;s Talk
          </Link>
        </div>
      </nav>
    </header>
  );
}
