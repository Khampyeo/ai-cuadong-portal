/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "primary-color": "#1677ff",
        "text-primary": "var(--text-primary)",
        "background-primary": "var(--background)",
      },
      animation: {
        bouncee: "bouncee .8s ease-in-out infinite .5s",
      },
      keyframes: {
        bouncee: {
          "0%": {
            transform: "scale(1)",
          },
          "25%": {
            transform: "scale(1.4)",
          },
          "50%": {
            transform: "scale(1)",
          },
          "100%": {
            transform: "scale(1.3)",
          },
        },
      },
    },
  },
  plugins: [],
};
