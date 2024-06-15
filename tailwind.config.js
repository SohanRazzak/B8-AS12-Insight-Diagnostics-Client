/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        "party-main" : "#E94560",
        "party-hover" : "#e62f4b",
        "party-btn" : "#a729a1",
        "party-text" : "#363c41",
      }
    },
  },
  plugins: [require("daisyui")],
}

