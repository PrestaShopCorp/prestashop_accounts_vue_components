/** @type {import('tailwindcss').Config} */
const {puikTailwindPreset} = require('@prestashopcorp/puik')
module.exports = {
  prefix: "acc-",
  presets: [puikTailwindPreset],
  important: '#psaccounts',
  content: ["./src/**/*.{vue,js,ts,jsx,tsx}"],
  plugins: [],
};
