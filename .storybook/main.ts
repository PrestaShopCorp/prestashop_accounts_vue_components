const path = require("path");
module.exports = {
  stories: ["../src/**/*.stories.@(js|mdx)"],
  logLevel: "debug",
  addons: [{
    // TODO: check theses options
    name: "@storybook/addon-docs",
    options: {
      configureJSX: true,
      babelOptions: {},
      sourceLoaderOptions: null
    }
  }, "@storybook/addon-controls", "@storybook/addon-actions", "@storybook/addon-viewport"],
  framework: {
    name: "@storybook/vue3-vite",
    options: {}
  },
  docs: {
    autodocs: true
  }
};