import Vue from 'vue';
import PsAccounts from '@/components/PsAccounts';
import Account from '@/components/panel/Account';
import AccountNotInstalled from '@/components/alert/AccountNotInstalled';
import AccountNotEnabled from '@/components/alert/AccountNotEnabled';
import MultiStoreSelector from '@/components/alert/MultiStoreSelector';
import {isOnboardingCompleted} from '@/lib/Helpers';
import locale from '@/locale';

const install = function(Vue, opts = {}) {
  console.log('### install called with ', !!Vue, opts);
  locale.use(opts.locale);
  locale.i18n(opts.i18n);
  Object.keys(Components).forEach((name) => {
    Vue.component(name, Components[name]);
  });
};

const Components = {
  locale: locale.use,
  i18n: locale.i18n,
  install,
  PsAccounts,
  Account,
  AccountNotInstalled,
  AccountNotEnabled,
  MultiStoreSelector,
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default Components;

export {
  PsAccounts,
  Account,
  AccountNotInstalled,
  AccountNotEnabled,
  MultiStoreSelector,
  isOnboardingCompleted,
};
