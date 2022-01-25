module.exports = {
  root: true,

  env: {
    node: true,
  },

  parserOptions: {
    parser: '@typescript-eslint/parser',
  },

  extends: ['prestashop', 'plugin:vue/strongly-recommended', '@vue/typescript'],

  plugins: ['import', 'vue'],

  rules: {
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'off',
  },
};
