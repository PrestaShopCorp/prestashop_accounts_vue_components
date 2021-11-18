/* eslint-disable */
import Vue from 'vue';
import PsAccounts from '@/components/PsAccounts';
import Account from '@/components/panel/Account';
import AccountNotInstalled from '@/components/alert/subComponents/AccountNotInstalled';
import AccountNotEnabled from '@/components/alert/subComponents/AccountNotEnabled';
import EventBusNotInstalled from '@/components/alert/subComponents/EventBusNotInstalled';
import {isOnboardingCompleted} from '@/lib/Helpers';
import Segment from "@prestashopcorp/segment-vue";
import Tracking from './plugins/tracking';

const superProperties = [
  "ps_module_from",
  "ps_version",
  "shop.",
  "shop_context_id",
  "shop_context_type",
  "superadmin",
  "v4_onboarded",
];

const Library = {
  install(vue, opts = {}) {
    Object.keys(Components).forEach((name) => {
      vue.component(name, Components[name]);
    });
    if (!window?.analytics) {
      vue.use(Segment, {
        id: contextPsAccounts.segmentApiKey,
        pageCategory: "ps_accounts-ui",
      });
    }
    vue.use(Tracking, {
      superProperties,
    });
  },
}

const Components = {
  PsAccounts,
  Account,
  AccountNotInstalled,
  AccountNotEnabled,
  EventBusNotInstalled
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Library/*, { locale: window.iso_user || 'en' }*/);
  // install(window.Vue, { locale: window.iso_user || 'en' });
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
  // install,
  isOnboardingCompleted,
  ...Components
};

export {
  // install,
  isOnboardingCompleted,
  PsAccounts,
  Account,
  AccountNotInstalled,
  AccountNotEnabled,
  EventBusNotInstalled
};
