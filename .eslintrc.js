module.exports = {
  root: true,
  env: {
    node: true,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
  },
  extends: ['prestashop', 'plugin:vue/strongly-recommended'],
  plugins: ['import', 'vue'],
};
