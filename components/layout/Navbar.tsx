"use client";

import CardNav from "@/components/animations/CardNav";
import ShinyText from "@/components/animations/ShinyText";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

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
  );
}
