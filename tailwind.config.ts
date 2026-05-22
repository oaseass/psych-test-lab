import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: "#FAF7F2",
          surface: "#FFFFFF",
          text: "#171717",
          muted: "#737373",
          border: "#E7E0D8",
          purple: "#7C3AED",
          pink: "#EC4899",
          orange: "#F97316",
          green: "#10B981",
          card: "#FFFFFF",
          // category colors
          daily: "#7C3AED",
          tests: "#EC4899",
          quizzes: "#2563EB",
          choices: "#EA580C",
          brain: "#059669",
          together: "#7C3AED",
          lucky: "#D97706",
          generators: "#0891B2",
          experiments: "#111827",
          explore: "#0284C7",
          community: "#D97706",
        },
      },
      fontFamily: {
        sans: ["Pretendard", "Apple SD Gothic Neo", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-out",
        "slide-up": "slideUp 0.4s ease-out",
        "slide-down": "slideDown 0.3s ease-out",
        "pop-in": "popIn 0.2s ease-out",
        "bounce-once": "bounceOnce 0.5s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        popIn: {
          "0%": { opacity: "0", transform: "scale(0.85)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        bounceOnce: {
          "0%": { transform: "scale(1)" },
          "40%": { transform: "scale(1.12)" },
          "70%": { transform: "scale(0.95)" },
          "100%": { transform: "scale(1)" },
        },
      },
      boxShadow: {
        card: "0 2px 12px 0 rgba(0,0,0,0.06)",
        "card-hover": "0 6px 24px 0 rgba(0,0,0,0.10)",
        "pop": "0 8px 32px 0 rgba(124,58,237,0.18)",
      },
    },
  },
  plugins: [],
};

export default config;
