import Link from "next/link";
import { Mail, Globe, User } from "lucide-react";
import ShinyText from "@/components/animations/ShinyText";

const socialLinks = [
  { icon: Mail, href: "mailto:gokul582000@gmail.com", label: "Email" },
  { icon: Globe, href: "https://www.instagram.com/_gsm_photography/", label: "Instagram" },
  { icon: User, href: "https://www.linkedin.com/in/gokul-nath-49ba4b221/", label: "LinkedIn" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-12">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <Link href="/" className="font-display text-3xl tracking-widest">
              <ShinyText
                text="GOKULNATH"
                color="#C9A84C"
                shineColor="#ffffff"
                speed={4}
                spread={60}
                delay={0.5}
                className="font-display text-3xl tracking-widest"
              />
            </Link>
            <p className="font-mono text-xs text-text-muted mt-2">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-4">
            <span className="font-mono text-xs text-gold-light uppercase tracking-widest">
              Connect
            </span>
            <div className="flex items-center gap-6">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-ui text-sm text-text-muted hover:text-gold-light transition-colors hover:translate-y-[-2px] flex items-center gap-2"
                >
                  <social.icon className="w-4 h-4" />
                  {social.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}