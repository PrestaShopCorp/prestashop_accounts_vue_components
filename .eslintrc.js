module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ['@prestashopcorp/eslint-config-ts', 'plugin:vue/vue3-recommended'],
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: '@typescript-eslint/parser',
    project: ['./tsconfig.json'],
    ecmaVersion: 'latest',
    sourceType: 'module',
    extraFileExtensions: [".vue"]
  },
  ignorePatterns: ['.eslintrc.js', 'commitlint.config.js', 'dist'],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off'
  }
};