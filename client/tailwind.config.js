/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    // colors: {
    //   'dark-green': '#02643B',
    //   'green': '#038851',
    //   'light-green': '#05CC79',

    //   'black': '#1c1c1c',
    //   'white': '#FFFFF',

    //   'gray-dark': '#273444',
    //   'gray': '#8492a6',
    //   'gray-light': '#d3dce6',
    // },
    fontFamily: {
      proxima: ['Proxima Nova', 'Arial', 'sans-serif'],
      GTPressura: ['GT Pressura', 'Arial', 'sans-serif'],

    },
    // extend: {
    //   spacing: {
    //     '128': '32rem',
    //     '144': '36rem',
    //   },
    //   borderRadius: {
    //     '4xl': '2rem',
    //   }
    // }
  },
  content: [
    "./src/**/*.{html,ts}",
  ]
}


