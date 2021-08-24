module.exports = {
  purge: { content: ['./public/**/*.html', './src/**/*.vue'] },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        '30rem': '30rem',
      },
      minWidth: {
        '1.5rem': '1.5rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
