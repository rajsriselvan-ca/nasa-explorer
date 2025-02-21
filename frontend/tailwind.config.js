/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#BFA100", 
        screens: {
          'sm': '640px',    // Small screens (mobile)
          'md': '768px',    // Medium screens (tablets)
          'lg': '1024px',   // Large screens (laptops)
          'xl': '1280px',   // Extra large screens (desktops)
          '2xl': '1536px',  // 2x large screens (large desktops)
        },
      },
    },
  },
  plugins: [],
};
