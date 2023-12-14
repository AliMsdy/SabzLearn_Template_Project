/** @type {import('tailwindcss').Config} */
import type { Config } from "tailwindcss";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-color": "#2bce56",
        "white-color": "#fff",
        "dark-color": "#464749",
      },
      backgroundImage: {
        "landing-pattern":
          "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),url('/src/assets/images/background_landing.jfif')",
      },
      fontSize: {
        'xs': '0.75rem',    // Extra small screen sizes
        'sm': '0.875rem',   // Small screen sizes
        'base': '1rem',     // Default size
        'lg': '1.125rem',   // Large screen sizes
        'xl': '1.25rem',    // Extra large screen sizes
        '2xl': '1.5rem',    // 2 extra large screen sizes
        '3xl': '1.875rem',  // 3 extra large screen sizes
        '4xl': '2.25rem',   // 4 extra large screen sizes
        '5xl': '3rem',      // 5 extra large screen sizes
      },
    },
  },
  plugins: [],
}satisfies Config;
