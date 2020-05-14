const path = require('path');

module.exports = {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        exclude: [/node_modules/],
        include: path.resolve(__dirname, '../src/'),
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.stories\.jsx?$/,
        loaders: [require.resolve('@storybook/source-loader')],
        exclude: [/node_modules/],
        enforce: 'pre',
      },
    ]
  }
};