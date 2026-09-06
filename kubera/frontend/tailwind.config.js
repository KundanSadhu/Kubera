/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: { 500: '#f59e0b', 600: '#d97706', 700: '#b45309' },
        kubera: { dark: '#0f172a', gold: '#f59e0b' }
      }
    }
  },
  plugins: []
}
