module.exports = {
  purge: [
    './apps/web/app/**/*.{js,ts,jsx,tsx}',
    './apps/web/components/**/*.{js,ts,jsx,tsx}',
    './apps/web/page.tsx',
    './apps/web/search/page.tsx',
    // Add other relevant files as needed
  ],
  darkMode: 'class', // or 'media' or 'false'
  theme: {
    extend: {
      colors: {
        indigo: '#4a90e2',
        green: '#68d391',
        gray: {
          50: '#f7fafc',
          100: '#edf2f7',
          200: '#e2e8f0',
          300: '#cbd5e0',
          400: '#a0aec0',
          500: '#6b7280',
          600: '#4a5568',
          700: '#374151',
          800: '#2e3440',
          900: '#232f3e',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
