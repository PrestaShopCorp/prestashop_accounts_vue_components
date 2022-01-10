module.exports = {
  css: {
    extract: false,
  },
  chainWebpack: (config) => {
    // config.resolve.alias.set('vue$', 'vue/dist/vue.esm.js');

    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap((options) => Object.assign(options, {esModule: false, limit: 10240}),
      );
  },
  runtimeCompiler: true,
};
