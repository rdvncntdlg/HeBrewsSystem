/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-black' : '#434531',
        'custom-brown' : '#e0cca4',
      },
      screens: {
        'lg-custom': '1190px',
      },
    },
  },
  plugins: [],
}

