/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
// const {themeColors} = require('./src/store/SettingsStore')
export default {
  
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{svelte,js,ts,jsx,tsx}",
  ],
  theme: {
    
  },
  plugins: [require("daisyui")],
}