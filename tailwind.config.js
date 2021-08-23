module.exports = {
  mode: 'jit',
  purge: [
    './src/**/*.tsx'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#202124',
        secondary: '#5f6368',
        activeSidebarMenu: '#41331c',
        hover: '#404040'
      },
      boxShadow: {
        'lg-darker': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.2)'
      },
      maxHeight: {
        'lg': '32rem'
      },
      maxWidth: {
        '20': '5rem'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms')({
     strategy: 'class',
   })
  ],
}
