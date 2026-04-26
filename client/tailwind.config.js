/** @type {import('tailwindcss').Config} */

export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: "12px",
        xl: "16px",
        "2xl": "20px"
      },
      boxShadow: {
        card: "0 4px 20px rgba(0,0,0,0.05)"
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
};