import Vue from 'vue';
import VueI18n from 'vue-i18n';
import messages from './lang';

Vue.use(VueI18n);

export default new VueI18n({
  fallbackLocale: 'en',
  locale: window?.iso_user || 'en',
  messages,
});
