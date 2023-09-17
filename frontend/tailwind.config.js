/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/equal-vue/dist/theme/*.{js,ts,json}", // full / dark / light
  ],
  darkMode: "class", // add 'dark' to the body tag to enable dark mode
  theme: {
    extend: {},
  },
  plugins: [],
};
