module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'media', // or 'false' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#41A950',
        secondary: '#030083'
      }
    }
  },
  variants: {},
  plugins: []
};
