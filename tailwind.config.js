/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        // Light mode colors
        primary: {
          DEFAULT: '#166534',
          light: '#4ADE80',
        },
        accent: '#EAB308',
        background: {
          light: '#F0FDF4',
          DEFAULT: '#F0FDF4',
        },
        text: {
          light: '#14532D',
          DEFAULT: '#14532D',
        },
        // Dark mode colors
        dark: {
          background: '#060E2A',
          header: '#091328',
          text: '#81ECFF',
        }
      },
      fontFamily: {
        'space-grotesk': ['Space Grotesk', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      }
    },
  },
  plugins: [],
}