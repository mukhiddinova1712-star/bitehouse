import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["Cormorant Garamond", "Playfair Display", "Georgia", "serif"],
        sans: ["Montserrat", "Inter", "sans-serif"],
        display: ["Cinzel", "Cormorant Garamond", "serif"],
      },
      colors: {
        navy: {
          50:  "#e8edf5",
          100: "#c5d0e6",
          200: "#9fb0d5",
          300: "#7890c4",
          400: "#5a76b8",
          500: "#3c5cac",
          600: "#2d4a8e",
          700: "#1e3570",
          800: "#112052",
          900: "#0a1628",
          950: "#060d1a",
        },
        silver: {
          50:  "#f8f8f8",
          100: "#f0f0f0",
          200: "#e4e4e4",
          300: "#d0d0d0",
          400: "#b8b8b8",
          500: "#a0a0a0",
          600: "#888888",
          700: "#6e6e6e",
          800: "#545454",
          900: "#3a3a3a",
        },
        gold: {
          50:  "#fdf9ee",
          100: "#f9f0d0",
          200: "#f2e09e",
          300: "#e9cc6c",
          400: "#deba45",
          500: "#D4AF37",
          600: "#b8941e",
          700: "#967518",
          800: "#745814",
          900: "#523d10",
        },
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease forwards",
        "fade-up": "fadeUp 0.8s ease forwards",
        "fade-left": "fadeLeft 0.8s ease forwards",
        "fade-right": "fadeRight 0.8s ease forwards",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
        "spin-slow": "spin 8s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeLeft: {
          "0%": { opacity: "0", transform: "translateX(-30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        fadeRight: {
          "0%": { opacity: "0", transform: "translateX(30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-15px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #D4AF37 0%, #f2e09e 50%, #D4AF37 100%)",
        "navy-gradient": "linear-gradient(135deg, #0a1628 0%, #1e3570 100%)",
        "silver-gradient": "linear-gradient(135deg, #a0a0a0 0%, #f0f0f0 50%, #a0a0a0 100%)",
      },
      boxShadow: {
        "gold": "0 4px 24px rgba(212, 175, 55, 0.3)",
        "gold-lg": "0 8px 40px rgba(212, 175, 55, 0.4)",
        "navy": "0 4px 24px rgba(10, 22, 40, 0.5)",
        "luxury": "0 20px 60px rgba(0, 0, 0, 0.4)",
      },
    },
  },
  plugins: [],
  safelist: [
    "text-yellow-400", "bg-yellow-400/10", "border-yellow-400/30",
    "text-green-400",  "bg-green-400/10",  "border-green-400/30",
    "text-blue-400",   "bg-blue-400/10",   "border-blue-400/30",
    "text-red-400",    "bg-red-400/10",    "border-red-400/30",
    "text-purple-400", "bg-purple-400/10", "border-purple-400/30",
  ],
};

export default config;
