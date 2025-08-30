module.exports = {
  purge: [
    './apps/web/app/**/*.{js,ts,jsx,tsx}',
    './apps/web/components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class', // Ensure dark mode is controlled by a class
  theme: {
    extend: {
      colors: {
        primary: '#3498db',
        secondary: '#2ecc71',
        danger: '#e74c3c',
        light: '#f7f7f7',
        dark: '#333',
      },
      spacing: {
        '8xl': '6rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
