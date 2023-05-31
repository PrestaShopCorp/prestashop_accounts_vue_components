const path = require("path");
module.exports = {
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.ts"
  ],
  logLevel: "debug",
  addons: ["@storybook/addon-essentials"],
  framework: {
    name: "@storybook/vue3-vite",
    options: {}
  },
  docs: {
    autodocs: true
  }
};