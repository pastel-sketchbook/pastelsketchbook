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
        'pastel-dark': 'hsl(var(--n) / <alpha-value>)',
        'pastel-medium': 'hsl(var(--p) / <alpha-value>)',
        'pastel-tan': 'hsl(var(--s) / <alpha-value>)',
        'pastel-terracotta': 'hsl(var(--a) / <alpha-value>)',
        'pastel-yellow': 'hsl(var(--wa) / <alpha-value>)',
        'pastel-bg': 'hsl(var(--b1) / <alpha-value>)',
      },
    },
  },
  plugins: [require('daisyui')],
}
