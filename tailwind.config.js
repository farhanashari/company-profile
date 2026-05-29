/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
      },
      keyframes: {
        "wa-pulse": {
          "0%, 100%": { boxShadow: "0 4px 20px rgba(37,211,102,0.5)" },
          "50%": { boxShadow: "0 4px 32px rgba(37,211,102,0.8), 0 0 0 8px rgba(37,211,102,0.15)" },
        },
      },
      animation: {
        "wa-pulse": "wa-pulse 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
