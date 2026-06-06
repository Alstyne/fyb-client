/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      colors: {
        cream: '#F5F0E8',
        ink: '#1A1A2E',
        gold: '#C9A84C',
        muted: '#8B8B8B',
        card: '#FFFFFF',
      }
    },
  },
  plugins: [],
}