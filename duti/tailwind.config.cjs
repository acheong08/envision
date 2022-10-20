/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/routes/**/*.{svelte,js,ts,html}'],
  theme: {
    extend: {
      transitionDuration: {
        '0': '0ms',
        '1000': '1000ms',
      }
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
}
