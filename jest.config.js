module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.(js|ts|vue)'],
  moduleNameMapper: {
    "^@/(.*svg)(\\?inline)$": "<rootDir>/src/$1",
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  transform: {
    '^.+\\.svg$': '<rootDir>/tests/unit/config/svgTransform.js',
  },
  coveragePathIgnorePatterns: [
    '/node_modules/',
    'src/main.ts',
  ],
};
