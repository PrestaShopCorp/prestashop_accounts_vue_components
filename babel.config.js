module.exports = function (api) {
  api.cache(true);

  const presets = ['@vue/cli-plugin-babel/preset'];
  const plugins = [];

  if (process.env.NODE_ENV === 'test') {
    plugins.push('transform-require-context');
  }

  return {
    presets,
    plugins,
  };
};
