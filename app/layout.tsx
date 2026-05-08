import {
  Bebas_Neue,
  DM_Serif_Display,
  Syne,
  Instrument_Sans,
  DM_Mono,
  Sacramento,
} from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/animations/CustomCursor";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "block",
});

const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dm-serif",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

const dmMono = DM_Mono({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-dm-mono",
  display: "swap",
});

const sacramento = Sacramento({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-cursive",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GOKULNATH | Photographer & Designer",
  description:
    "Portfolio of Gokul Nath, a professional photographer and graphic designer specializing in art direction, UI/UX design, and editorial photography.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${dmSerif.variable} ${syne.variable} ${instrumentSans.variable} ${dmMono.variable} ${sacramento.variable}`}
    >
      <body className="bg-bg-primary text-text-primary antialiased min-h-screen">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";