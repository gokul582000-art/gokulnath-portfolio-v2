import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-primary": "#080808",
        "bg-secondary": "#0f0f0f",
        "bg-tertiary": "#151515",
        "gold-light": "#C9A84C",
        "gold-mid": "#A07830",
        "gold-dark": "#6B4F1A",
        "text-primary": "#FFFFFF",
        "text-secondary": "rgba(255,255,255,0.60)",
        "text-muted": "rgba(255,255,255,0.30)",
        "glass-bg": "rgba(255,255,255,0.04)",
        "glass-border": "rgba(201,168,76,0.15)",
      },
      fontFamily: {
        display: ["var(--font-bebas)", "sans-serif"],
        heading: ["var(--font-dm-serif)", "serif"],
        ui: ["var(--font-syne)", "sans-serif"],
        body: ["var(--font-instrument)", "sans-serif"],
        mono: ["var(--font-dm-mono)", "monospace"],
        cursive: ["var(--font-cursive)", "cursive"],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #C9A84C 0%, #A07830 50%, #6B4F1A 100%)",
      },
      boxShadow: {
        glass: "0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(201,168,76,0.10)",
        "glass-hover": "0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(201,168,76,0.20)",
      },
    },
  },
  plugins: [],
};
export default config;