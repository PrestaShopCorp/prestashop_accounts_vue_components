process.env.VUE_APP_VERSION = require('./package.json').version;

module.exports = {
  css: {
    extract: false,
  },
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg');

    svgRule.uses.clear();

    svgRule
      .use('babel-loader')
      .loader('babel-loader')
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader');

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
