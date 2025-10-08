/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
    // add more paths if needed
  ],
  theme: {
    extend: {
        fontFamily: {
        sans: ['Calibri', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
};
