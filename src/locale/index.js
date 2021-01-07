import en from '@/locale/lang/en.json';
import fr from '@/locale/lang/fr.json';
import it from '@/locale/lang/it.json';
import es from '@/locale/lang/es.json';
import pl from '@/locale/lang/pl.json';
import nl from '@/locale/lang/nl.json';
import pt from '@/locale/lang/pt.json';
import de from '@/locale/lang/de.json';

import Vue from 'vue';
import deepmerge from 'deepmerge';
import Format from './format';

const format = Format(Vue);
let lang = en;
let merged = false;

// eslint-disable-next-line consistent-return
let i18nHandler = function i18nHandler(...args) {
  const vuei18n = Object.getPrototypeOf(this || Vue).$t;
  if (typeof vuei18n === 'function' && !!Vue.locale) {
    if (!merged) {
      merged = true;
      Vue.locale(
        Vue.config.lang,
        deepmerge(lang, Vue.locale(Vue.config.lang) || {}, {clone: true}),
      );
    }

    return vuei18n.apply(this, args);
  }
};

export const t = function t(path, options, ...args) {
  let value = i18nHandler.apply(this, args);
  if (value !== null && value !== undefined) return value;

  const array = path.split('.');
  let current = lang;

  for (let i = 0, j = array.length; i < j; i += 1) {
    const property = array[i];
    value = current[property];
    if (i === j - 1) return format(value, options);
    if (!value) return '';
    current = value;
  }

  return '';
};

export const use = function use(l) {
  if (typeof l !== 'string') {
    lang = l || lang;
    return;
  }
  switch (l.substr(0, 2)) {
    case 'fr':
      lang = fr;
      break;
    case 'it':
      lang = it;
      break;
    case 'es':
      lang = es;
      break;
    case 'pl':
      lang = pl;
      break;
    case 'nl':
      lang = nl;
      break;
    case 'pt':
      lang = pt;
      break;
    case 'de':
      lang = de;
      break;
    case 'en':
    default:
      lang = en;
      // For the default case, stop here
      return;
  }

  lang = deepmerge(en, lang, {clone: true});
};

export const i18n = function i18n(fn) {
  i18nHandler = fn || i18nHandler;
};

export default {use, t, i18n};
