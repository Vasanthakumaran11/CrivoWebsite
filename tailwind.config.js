/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Luxurious Roman', 'serif'],
        body: ['Inter', 'sans-serif'],
        heading: ['Outfit', 'sans-serif'],
        subheading: ['Roboto Condensed', 'sans-serif']
      },
    },
  },
  plugins: [],
}