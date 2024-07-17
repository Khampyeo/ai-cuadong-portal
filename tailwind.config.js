/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "primary-color": "#1677ff",
        "text-primary": "var(--text-primary)",
        "background-primary": "var(--background)",
      },
    },
  },
  plugins: [],
};
