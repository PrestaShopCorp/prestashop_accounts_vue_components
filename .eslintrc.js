module.exports = {
  root: true,

  env: {
    node: true,
  },

  parserOptions: {
    parser: '@typescript-eslint/parser',
  },

  extends: ['prestashop', 'plugin:vue/strongly-recommended', '@vue/typescript/recommended'],
  plugins: ['import', 'vue'],

  rules: {
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'off',
  },

  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
};
