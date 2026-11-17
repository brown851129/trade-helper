import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#07080A",
        panel: "#0E1013",
        line: "rgba(255,255,255,0.08)",
        neon: "#B6FF3B",
        mute: "#8A9099",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "var(--font-tc)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.06em",
      },
    },
  },
  plugins: [],
};

export default config;
