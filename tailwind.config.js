/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom': '0 20px 30px -45px  rgba(255, 255, 255)',
      },
      colors: {
        'morado-leo': '#580EF6',
      },
    },
  },
  plugins: [],
}