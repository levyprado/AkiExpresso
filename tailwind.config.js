/** @type {import('tailwindcss').Config} */

// eslint-disable-next-line no-undef
const plugin = require('tailwindcss/plugin')

// eslint-disable-next-line no-undef
const defaultTheme = require('tailwindcss/defaultTheme')
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['SF Pro Display', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'brand-light': '#fb7951',
        brand: '#FA5A2A',
        'brand-dark': '#f93f06',
        lightgray: '#A4A8B5',
        'lightgray-dark': '#818698',
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant('can-hover', '@media(hover:hover)')
    }),
  ],
}
