/** @type {import('tailwindcss').Config} */
import type { Config } from "tailwindcss";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-color": "#2bce56",
        "dark-color": "#464749",
        "gray-color": "#f0f2f7",
        "secondary-color":"#7b868a",
        "slate":"#4A4B6D",
        "white-color": "#fff",
        "dark-theme-primary": "#1C1C28",
        "dark-theme-secondary":"#28293D"
      },
      backgroundImage: {
        "landing-pattern":
          "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),url('/src/assets/images/background_landing.jfif')",
      },
      fontSize: {
        xs: "0.75rem", // Extra small screen sizes
        sm: "0.875rem", // Small screen sizes
        base: "1rem", // Default size
        lg: "1.125rem", // Large screen sizes
        xl: "1.25rem", // Extra large screen sizes
        "2xl": "1.5rem", // 2 extra large screen sizes
        "3xl": "1.875rem", // 3 extra large screen sizes
        "4xl": "2.25rem", // 4 extra large screen sizes
        "5xl": "3rem", // 5 extra large screen sizes
      },
      boxShadow:{
        "custom": "0 0 13px 1px rgba(70, 72, 77, 0.2)",
        "dark-theme": "0 0 13px 1px rgb(47 56 81 / 50%)"
      },
    },
  },
  plugins: [],
  important: true,
  darkMode: "class",
} satisfies Config;
