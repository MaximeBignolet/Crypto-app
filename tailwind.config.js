/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#7D67FF",
      },

    screens: {
      'tablet': '768px',
      'laptop': '1024px',
      'desktop': '1280px',
      'large': '1440px',
    }
    },

  },
  plugins: [],
}

