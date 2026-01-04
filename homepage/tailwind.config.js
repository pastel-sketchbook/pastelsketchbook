/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
      colors: {
        'pastel-dark': '#1B3022',
        'pastel-medium': '#5F7D61',
        'pastel-tan': '#D4A373',
        'pastel-terracotta': '#E76F51',
        'pastel-yellow': '#E9C46A',
        'pastel-bg': '#FAF9F6',
      },
    },
  },
  plugins: [],
}
