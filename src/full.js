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
import Tracking from './plugins/tracking';

const superProperties = [
  'multishop_numbers',
  "ps_module_from",
  "ps_version",
  "shop.",
  "shop_context_id",
  "shop_context_type",
  "superadmin",
  "v4_onboarded",
  'ps_account_version'
];

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
  if (!window?.analytics) {
    vue.use(Segment, {
      id: contextPsAccounts.segmentApiKey,
      pageCategory: "ps_accounts-ui"
    });
  }
  vue.use(Tracking, {
    superProperties,
  });
};

const Components = {
  PsAccounts,
  Account,
  AccountNotInstalled,
  AccountNotEnabled,
  EventBusNotInstalled
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue, { locale: window.iso_user || 'en' });
} else {
  Object.keys(Components).forEach((name) => {
    Vue.component(name, Components[name]);
  });
  if (!window?.analytics) {
    Vue.use(Segment, {
      id: contextPsAccounts.segmentApiKey,
      pageCategory: "ps_accounts-ui"
    });
  }
  Vue.use(Tracking, {
    superProperties,
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
