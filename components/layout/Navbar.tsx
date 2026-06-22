"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import ShinyText from "@/components/animations/ShinyText";
import clsx from "clsx";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Design", href: "/design" },
  { label: "Photography", href: "/photography" },
  { label: "About", href: "/about" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-gold-light hover:text-white transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      <div
        className={clsx(
          "absolute top-full left-4 right-4 mt-2 p-4 rounded-2xl bg-bg-secondary/95 backdrop-blur-xl border border-glass-border shadow-glass-hover transition-all duration-300 flex flex-col space-y-2 origin-top md:hidden",
          mobileMenuOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0 pointer-events-none"
        )}
      >
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setMobileMenuOpen(false)}
            className="px-4 py-3 rounded-xl font-ui text-base text-text-secondary hover:text-white hover:bg-glass-bg transition-colors"
          >
            {link.label}
          </Link>
        ))}
        <div className="pt-2 mt-2 border-t border-glass-border">
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-center w-full px-4 py-3 rounded-xl font-ui text-base font-medium bg-gold-light/10 text-gold-light hover:bg-gold-light hover:text-bg-primary transition-colors"
          >
            Let&apos;s Talk
          </Link>
        </div>
      </div>
    </header>
  );
}
