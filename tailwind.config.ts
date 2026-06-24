import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        base: {
          900: "#05080a",
          800: "#0a0e12",
          700: "#0e1418",
          600: "#131b20",
        },
        accent: {
          DEFAULT: "#00ffae",
          dim: "#19e6a0",
          soft: "#0bcf90",
        },
        mint: {
          DEFAULT: "#2fe3a0",
          dark: "#22c98a",
        },
        danger: "#ff5d73",
        cyan2: "#7df9ff",
        card: "#0d1318",
        ink: {
          DEFAULT: "#d7e0e0",
          dim: "#8a9a98",
          faint: "#5a6b6b",
        },
        line: "rgba(0,255,170,0.12)",
      },
      fontFamily: {
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(0,255,170,0.25), 0 0 24px -4px rgba(0,255,170,0.35)",
        "glow-lg": "0 0 0 1px rgba(0,255,170,0.35), 0 0 48px -6px rgba(0,255,170,0.45)",
        inset: "inset 0 0 60px -20px rgba(0,255,170,0.18)",
      },
      backgroundImage: {
        grid: "linear-gradient(rgba(0,255,170,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,170,0.05) 1px, transparent 1px)",
      },
      keyframes: {
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        flicker: {
          "0%, 100%": { opacity: "1" },
          "92%": { opacity: "1" },
          "93%": { opacity: "0.6" },
          "94%": { opacity: "1" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        radar: {
          to: { transform: "rotate(360deg)" },
        },
        radarPing: {
          "0%": { transform: "scale(0.25)", opacity: "0.7" },
          "100%": { transform: "scale(1.05)", opacity: "0" },
        },
        breathe: {
          "0%, 100%": { boxShadow: "0 0 20px -5px rgba(47,227,160,0.3), 0 0 60px -15px rgba(47,227,160,0.15)" },
          "50%": { boxShadow: "0 0 40px -5px rgba(47,227,160,0.65), 0 0 100px -15px rgba(47,227,160,0.35)" },
        },
        ringPulse: {
          "0%, 100%": { opacity: "0.7" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        blink: "blink 1.1s step-end infinite",
        scan: "scan 6s linear infinite",
        flicker: "flicker 5s linear infinite",
        pulseGlow: "pulseGlow 2.4s ease-in-out infinite",
        ticker: "ticker 30s linear infinite",
        radar: "radar 3s linear infinite",
        radarPing: "radarPing 2.6s ease-out infinite",
        breathe: "breathe 3s ease-in-out infinite",
        ringPulse: "ringPulse 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
