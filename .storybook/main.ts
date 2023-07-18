import type { StorybookConfig } from '@storybook/vue3-vite';
export default {
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.ts"
  ],
  logLevel: "debug",
  addons: ["@storybook/addon-essentials"],
  framework: "@storybook/vue3-vite",
  docs: {
    autodocs: true
  }
} as StorybookConfig;