/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // use `.dark` class for ThemeToggle
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: '#3498db',
        secondary: '#2ecc71',
        danger: '#e74c3c',
        light: '#f7f7f7',
        dark: '#333',
        blue: '#1e40af',
        green: '#4caf50',
        red: '#f44336',
        yellow: '#ffc107',
        orange: '#ffa726',
        purple: '#9c27b0',
        pink: '#ec407a',
      },
      spacing: {
        '8xl': '6rem',
        '9xl': '8rem',
      },
      container: {
        center: true,
        padding: '1rem',
        screens: {
          '2xl': '64rem',
        },
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
