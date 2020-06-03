const RE_NARGS = /(%|)\{([0-9a-zA-Z_]+)\}/g;

// eslint-disable-next-line no-unused-vars
export default function (Vue) {
  /**
   * template
   *
   * @param {String} string
   * @param {Array} ...args
   * @return {String}
   */

  function template(string, ...args) {
    if (args.length === 1 && typeof args[0] === 'object') {
      // eslint-disable-next-line no-param-reassign
      args = args[0];
    }

    if (!args || !args.hasOwnProperty) {
      // eslint-disable-next-line no-param-reassign
      args = {};
    }

    return string.replace(RE_NARGS, (match, prefix, i, index) => {
      if (string[index - 1] === '{'
        && string[index + match.length] === '}') {
        return i;
      }

      const result = hasOwnProperty.call(args, i) ? args[i] : null;

      if (result === null || result === undefined) {
        return '';
      }

      return result;
    });
  }

  return template;
}
