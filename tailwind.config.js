/** @type {import('tailwindcss').Config} */
import twColors from 'tailwindcss/colors'

export default {
  content: [ './index.html',
    './src/**/*.{tsx,js,ts,jsx}'],
  theme: {
    colors: {
      ...twColors,
      primary: '#0f172a',
      'light-blue': '#A7E5F5',
      'light-gray': '#CBCBCB',
      'semi-gray': '#939597',
      // orange: '#F66F4D',
      // 'orange-light': '#FFD482',
      // 'main-bg': '#F7FAFC',
      // 'second-text-color': '#5B5F62',
      // 'third-text-color': '#9498A4',
      // 'first-element-bg': '#EAEAEB',
      // 'bg-for-image': ' #EE8162',
    },
    fontFamily: {
      main: ['Inter', 'sans-serif'],
      poppins: ['Poppins', 'sans-serif'],
      sen: ['Sen', 'sans-serif']
    },
    extend: {},
  },
  plugins: [],
}

