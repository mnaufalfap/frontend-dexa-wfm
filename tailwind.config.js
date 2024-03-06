/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  daisyui: {
    themes: ["light"],
  },
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
});
