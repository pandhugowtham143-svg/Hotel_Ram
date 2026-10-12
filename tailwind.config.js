/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: '#800020',
        secondary: '#FFC107',
        cream: '#FFF8F0',
        charcoal: '#252525',
        whatsapp: '#25D366',
      },
    },
  },
  plugins: [],
};
