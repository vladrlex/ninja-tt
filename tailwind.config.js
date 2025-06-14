/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      backgroundColor: {
        darkRed: "#891812"
      },
      colors: {
        darkRed: "#891812"
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
}

