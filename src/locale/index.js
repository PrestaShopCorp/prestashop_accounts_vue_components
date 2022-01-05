import Vue from 'vue';
import deepmerge from 'deepmerge';
import AllLanguages from '@/locale/lang';
import Format from './format';

const format = Format(Vue);
let lang = AllLanguages.en;
let merged = false;

// eslint-disable-next-line consistent-return
let i18nHandler = function i18nHandler(...args) {
  const vuei18n = Object.getPrototypeOf(this || Vue).$t;

  if (typeof vuei18n === 'function' && !!Vue.locale) {
    if (!merged) {
      merged = true;
      Vue.locale(
        Vue.config.lang,
        deepmerge(
          lang, Vue.locale(Vue.config.lang) || {}, {clone: true},
        ),
      );
    }

    return vuei18n.apply(this, args);
  }
};

export const t = function t(path, options, ...args) {
  let value = i18nHandler.apply(this, args);

  if (value !== null && value !== undefined) return value;

  const array = path.split('.');
  value = lang;

  for (let i = 0, j = array.length; i < j; i += 1) {
    const property = array[i];

    if (!value) return '';
    value = value[property];
  }

  return format(value || '', options);
};

export const use = function use(l) {
  if (typeof l !== 'string') {
    lang = l || lang;
    return;
  }
  lang = AllLanguages[l.substr(0, 2).toLowerCase()] || AllLanguages.en;
  if (lang === AllLanguages.en) return;
  lang = deepmerge(AllLanguages.en, lang, {clone: true});
};

export const i18n = function i18n(fn) {
  i18nHandler = fn || i18nHandler;
};

export default {use, t, i18n};
