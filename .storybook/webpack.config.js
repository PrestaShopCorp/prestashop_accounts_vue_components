module.exports = {
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.ts$/,
      loader: "ts-loader",
      options: { appendTsSuffixTo: [/\.vue$/] },
    });
    return config;
  },
};
