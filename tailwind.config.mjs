/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FFA000', // Primary color
        secondary: '#FFC107', // Secondary color
        text: '#FFFFFF', // Text color (if needed)
      },
    },
  },
  plugins: [],
};

export default config;
