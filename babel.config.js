module.exports = {
  presets: [
    ['@vue/cli-plugin-babel/preset', {
      jsx: false // To fix a MDX bug 'h is not defined' : https://github.com/storybookjs/storybook/issues/11094
    }]
  ],
};
