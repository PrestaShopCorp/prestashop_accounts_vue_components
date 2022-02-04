module.exports = function (api) {
  api.cache(true);

  const presets = ['@vue/cli-plugin-babel/preset'];
  const plugins = [
    ['@babel/plugin-proposal-class-properties', {loose: true}],
    ['@babel/plugin-proposal-private-methods', {loose: true}],
    ['@babel/plugin-proposal-private-property-in-object', {loose: true}],
  ];

  if (process.env.NODE_ENV === 'test') {
    plugins.push('transform-require-context');
  }

  return {
    presets,
    plugins,
  };
};
