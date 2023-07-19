module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    'postcss-prefix-selector': {
      prefix: '#psaccounts',
      transform: function(prefix, selector, prefixedSelector) {
        if (selector.match(/^(html|body)/)) {
          return selector.replace(/^([^\s]*)/, `$1 ${prefix}`);
        } else if (selector.match(/^(\#psaccounts)/)) {
          return selector;
        } else {
          return prefixedSelector;
        }
      }
    },
  }
};
