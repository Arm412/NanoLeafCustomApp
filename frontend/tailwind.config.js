module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'media', // or 'false' or 'class'
  theme: {
    extend: {
      colors: {
        'text-primary': '#F3F3F3',
        'background-gray': '#1B1B1B'
      }
    }
  },
  variants: {},
  plugins: []
};
