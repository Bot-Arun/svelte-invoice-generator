/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
// const {themeColors} = require('./src/store/SettingsStore')
export default {
  content: [
    "./index.html",
    "./src/**/*.{svelte,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 'primary-fg': $themeColors.primaryFg,
        'primary-bg': '#221148',
        'secondary-fg': '#556172',
        'secondary-bg': '#F8FAFF',
      },
    },
  },
  plugins: [require("daisyui")],
}