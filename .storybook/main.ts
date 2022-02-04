const path = require("path");

module.exports = {
  stories: ["../src/**/*.stories.@(js|mdx)"],
  logLevel: "debug",
  addons: [
    "@storybook/preset-typescript",
    "@storybook/addon-actions",
    {
      // TODO: check theses options
      name: "@storybook/addon-docs",
      options: {
        configureJSX: true,
        babelOptions: {},
        sourceLoaderOptions: null,
      },
    },
    "@storybook/addon-controls",
  ],
  webpackFinal: async (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "../src"),
    };

    let rule = config.module.rules.find(
      (r) =>
        r.test &&
        r.test.toString().includes("svg") &&
        r.loader &&
        r.loader.includes("file-loader")
    );
    rule.test =
      /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani)(\?.*)?$/;

    config.module.rules.push({
      test: /\.svg$/,
      use: ["vue-svg-loader"],
    });

    config.module.rules.push({
      test: /\.scss$/,
      use: [
        require.resolve("vue-style-loader"),
        require.resolve("css-loader"),
        require.resolve("sass-loader"),
      ],
    });

    return config;
  },
};
