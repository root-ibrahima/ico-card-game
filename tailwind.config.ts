import type { Config } from "tailwindcss";

export default {
  darkMode: "class", // Permet de basculer entre les thèmes clair/sombre
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          light: "#ffffff",
          dark: "#0a0a0a",
        },
        foreground: {
          light: "#171717",
          dark: "#ededed",
        },
      },
      fontFamily: {
        sans: ["Inter", "Arial", "Helvetica", "sans-serif"],
      },
      animation: {
        fadeIn: "fadeIn 1s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      boxShadow: {
        glow: "0 4px 15px rgba(59, 130, 246, 0.5)", // Ajoute un effet lumineux
      },
    },
  },
  plugins: [],
} satisfies Config;
