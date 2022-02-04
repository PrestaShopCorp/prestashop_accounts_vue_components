module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.(js|ts|vue)'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    'src/main.ts',
  ],
};
