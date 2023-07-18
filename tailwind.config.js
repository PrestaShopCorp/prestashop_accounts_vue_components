/** @type {import('tailwindcss').Config} */
const { puikTailwindPreset } = require('@prestashopcorp/puik');
module.exports = {
  corePlugins: {
    preflight: false
  },
  prefix: 'acc-',
  presets: [puikTailwindPreset],
  important: '#psaccounts',
  content: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
  plugins: []
};
