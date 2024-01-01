/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'text-white': '#F7F8FD',
          'light-grey': '#BABABA',
          'bg-fill': '#FFFFFF',
          'dark-purple': '#160224',
          'text-purple': '#7843E6',
          'bg-white': '#D9D9D9',
        },
        height: {
          '38': '10rem',
          '98': '20rem',
          '99': '29rem',
          '100': '30rem',
          '101': '31rem',
          '102': '33rem',
          '103': '35rem',
          '105': '36rem',
          '106': '40rem',
          '107': '41rem',
          '108': '42rem',
          '109': '44rem',
          '110': '45rem',
          '114': '48rem',
          '115': '50rem',
        },
      },
    },
    plugins: [
      require('tailwind-scrollbar'),
    ],
  }
  