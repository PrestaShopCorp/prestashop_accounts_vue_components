/* eslint-disable */
import Vue from 'vue';
import PsAccounts from '@/components/PsAccounts';
import Account from '@/components/panel/Account';
import AccountNotInstalled from '@/components/alert/subComponents/AccountNotInstalled';
import AccountNotEnabled from '@/components/alert/subComponents/AccountNotEnabled';
import EventBusNotInstalled from '@/components/alert/subComponents/EventBusNotInstalled';
import {isOnboardingCompleted} from '@/lib/Helpers';
import {use, i18n} from '@/locale';
import Segment from "@prestashopcorp/segment-vue";

const install = function(vue, opts = {}) {
  if (opts.locale) {
    use(opts.locale);
  }
  if (opts.i18n) {
    i18n(opts.i18n);
  }
  Object.keys(Components).forEach((name) => {
    vue.component(name, Components[name]);
  });
};

Vue.use(Segment, {
  id: process.env.VUE_APP_SEGMENT,
  pageCategory: "ps_accounts-ui"
})

const Components = {
  PsAccounts,
  Account,
  AccountNotInstalled,
  AccountNotEnabled,
  EventBusNotInstalled
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
} else {
  Object.keys(Components).forEach((name) => {
    Vue.component(name, Components[name]);
  });
}

export default {
  version: '0.1.4',
  locale: use,
  i18n,
  install,
  isOnboardingCompleted,
  ...Components
};

export {
  use as locale,
  i18n,
  install,
  isOnboardingCompleted,
  PsAccounts,
  Account,
  AccountNotInstalled,
  AccountNotEnabled,
  EventBusNotInstalled
};
