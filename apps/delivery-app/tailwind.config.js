/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",      // for Vite/CRA
    "./src/**/*.{js,ts,jsx,tsx}", // scan all your React files
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb",   // blue-600
        secondary: "#10b981", // emerald-500
        danger: "#ef4444",    // red-500
      },
      borderRadius: {
        "2xl": "1.25rem",
      },
    },
  },
  plugins: [],
};
