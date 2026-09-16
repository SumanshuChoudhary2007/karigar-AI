/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        craft: {
          50: '#fffbebe6',
          100: '#fef3c7',
          500: '#d97706', // Primary warm craft amber
          600: '#b45309',
          700: '#92400e',
          900: '#78350f',
        },
        artisan: {
          bg: '#F9FAFB',
          card: '#FFFFFF',
          border: '#E5E7EB',
          textPrimary: '#111827',
          textSecondary: '#4B5563',
          accent: '#D97706',
          accentHover: '#B45309',
          success: '#16A34A',
          blue: '#2563EB'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      }
    },
  },
  plugins: [],
}
