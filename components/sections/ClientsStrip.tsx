"use client";

import { LogoStrip } from "@/components/animations/LogoStrip";

const clients = [
  "CII",
  "TNTDPC",
  "Chennai Liver Foundation",
  "Meiyal Masala",
  "Aachi Masala",
  "JCS",
  "OKJ",
  "Duggar Homes",
  "OHI",
  "IKN",
  "Comfort Point",
  "Nest builders",
  "Prateek",
  "Vels Medical College & Hospital",
  "Rajalakshmi Business School",
  "RIT",
  "Mast Bazar",
  "Vayu Drones",
  "Young Indians",
  "Indian Gaming Summit",
  "SEAIRO",
  "Umagine",
  "Global Fintech Fest",
  "CII thrive",
  "A2B USA",
  "SALEM RR USA",
  "ARAM SEI",
  "MAGILHUB",
  "UTSAV USA"
];

export function ClientsStrip() {
  return (
    <section className="py-16 border-t border-white/10 overflow-hidden">
      <div className="container-custom">
        <p className="font-mono text-xs text-gold-light uppercase tracking-widest text-center mb-8">
          Projects
        </p>
      </div>
      <LogoStrip
        logos={clients.map((name) => ({ name }))}
        speed={40}
      />
    </section>
  );
}