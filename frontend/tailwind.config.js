/** @type {import('tailwindcss').Config} */
const config = {
    content: [
      "./index.html",
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          blue: {
            700: "#1E3A8A",
            800: "#1C2961",
          },
          green: {
            600: "#10B981",
            500: "#059669",
          },
          yellow: {
            600: "#F59E0B",
            500: "#D97706",
          },
        },
        boxShadow: {
          'custom-md': '0 2px 10px rgba(0, 0, 0, 0.2)',
        },
        spacing: {
          '64': '16rem',
        },
        borderRadius: {
          md: '0.375rem',
        },
      },
    },
    plugins: [],
  };
  
  export default config;
  