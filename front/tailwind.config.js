/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    blue: {
      50: "#ecfbff",
      100: "#d4f4ff",
      200: "#b2eeff",
      300: "#7de6ff",
      400: "#41d3ff",
      500: "#15b6ff",
      600: "#0096ff",
      700: "#007efe",
      800: "#0065cd",
      900: "#0857a0",
      950: "#0c3c6e",
    },
    black: {
      50: "#f6f6f6",
      100: "#e7e7e7",
      200: "#d1d1d1",
      300: "#b0b0b0",
      400: "#888888",
      500: "#6d6d6d",
      600: "#5d5d5d",
      700: "#4f4f4f",
      800: "#454545",
      900: "#3d3d3d",
      950: "#000000",
    },

    extend: {},
  },
  plugins: [],
};
