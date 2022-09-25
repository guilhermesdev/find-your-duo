/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {
      colors: {
        'nlw-gradient': 'linear-gradient(89.86deg, #9572FC 23.08%, #43E7AD 33.94%, #E1D55D 44.57%)'
      },
      backgroundImage: {
        galaxy: 'url(/galaxy-background.jpg)'
      },
      fontFamily:  {
        sans: ['Inter']
      }
    },
  },
  plugins: [],
}
