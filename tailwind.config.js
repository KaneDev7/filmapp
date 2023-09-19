/** @type {import('tailwindcss').Config} */

export default {
   content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        primary: '#BE091E',
        primary_hover: '#9A0618',
        primaryText : '#71675e', 
        black : 'black',
        bgSsidebar: '#161616',
        note: "#ffcd56",
        borderColor : '#71675e5a'
      } 
    },
  },
  plugins: [],
}

