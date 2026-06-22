"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import ShinyText from "@/components/animations/ShinyText";
import CardNav from "@/components/animations/CardNav";
import clsx from "clsx";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Design", href: "/design" },
  { label: "Photography", href: "/photography" },
  { label: "About", href: "/about" },
];

const navItems = [
  {
    label: "Work",
    bgColor: "rgba(255, 255, 255, 0.03)",
    textColor: "#fff",
    links: [
      { label: "Graphic Design", href: "/design", ariaLabel: "Graphic Design" },
      { label: "Photography", href: "/photography", ariaLabel: "Photography" }
    ]
  },
  {
    label: "Info", 
    bgColor: "rgba(255, 255, 255, 0.03)",
    textColor: "#fff",
    links: [
      { label: "Home", href: "/", ariaLabel: "Home Page" },
      { label: "About Gokulnath", href: "/about", ariaLabel: "About Gokulnath" }
    ]
  },
  {
    label: "Reach Out",
    bgColor: "rgba(255, 255, 255, 0.03)", 
    textColor: "#fff",
    links: [
      { label: "Contact Form", href: "/contact", ariaLabel: "Contact us" },
      { label: "Send Email", href: "mailto:gokul582000@gmail.com", ariaLabel: "Email" }
    ]
  }
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logoNode = (
    <div className="font-display text-2xl tracking-widest cursor-pointer" onClick={() => router.push('/')}>
      <ShinyText
        text="GOKULNATH"
        color="#C9A84C"
        shineColor="#ffffff"
        speed={4}
        spread={60}
        delay={0.5}
        className="font-display text-2xl tracking-widest"
      />
    </div>
  );

  return (
    <>
      {/* Mobile Navbar: Old CardNav version */}
      <div className="md:hidden block">
        <CardNav
          logoNode={logoNode}
          items={navItems}
          baseColor="rgba(255, 255, 255, 0.04)"
          menuColor="#C9A84C"
          buttonBgColor="transparent"
          buttonTextColor="#C9A84C"
          ctaText="Let's Talk"
          onCtaClick={() => router.push('/contact')}
          ease="power3.out"
        />
      </div>

      {/* Desktop Navbar: New Pill version */}
      <header
        className={clsx(
          "hidden md:flex fixed top-0 left-0 right-0 z-50 justify-center px-4 transition-all duration-300",
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
          <div className="flex items-center space-x-1">
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
          <div className="flex flex-shrink-0">
            <Link
              href="/contact"
              className="px-6 py-2 rounded-full font-ui text-sm font-medium tracking-wide border border-gold-light/30 text-gold-light hover:bg-gold-light hover:text-bg-primary transition-all duration-300"
            >
              Let&apos;s Talk
            </Link>
          </div>
        </nav>
      </header>
    </>
  );
}
