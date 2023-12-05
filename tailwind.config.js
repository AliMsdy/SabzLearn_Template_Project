/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-color": "#2bce56",
        "white-color": "#fff",
        "dark-color": "#464749",
      },
    },
  },
  plugins: [],
};
