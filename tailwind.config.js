/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    colors: {
      blue: { light: "#1fb6ff", dark: "#114057" },
      purple: "#7e5bef",
      pink: "#ff49db",
      orange: [{ 200: "#ff7849", 100: "#fab8a2" }],
      green: [{ 100: "#74cf9d", 200: "#13ce66" }],
      yellow: "#ffc82c",
      "gray-dark": "#273444",
      gray: "#8492a6",
      "gray-medium":"#bcc1c4",
      "gray-light": "#d3dce6",
      transparent: "transparent",
      black: "#0a0001",
    },
    fontFamily: {
      sans: ["'Sofia Sans', sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    extend: {
      spacing: {
        "8xl": "96rem",
        "9xl": "128rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
};
