import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#10151C",
        panel: "#161D26",
        panel2: "#1B2330",
        paper: "#EDEFEA",
        ink: "#E7EAEE",
        muted: "#8B93A1",
        line: "rgba(231,234,238,0.12)",
        amber: {
          DEFAULT: "#E3A34E",
          soft: "#F0C084",
        },
        teal: {
          DEFAULT: "#55C8B8",
          soft: "#8FDDD1",
        },
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
      },
      maxWidth: {
        content: "72rem",
      },
      backgroundImage: {
        grain: "radial-gradient(circle at 1px 1px, rgba(231,234,238,0.05) 1px, transparent 0)",
      },
    },
  },
  plugins: [],
};
export default config;
