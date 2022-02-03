import Vue from 'vue';
import PsAccounts from '@/components/PsAccounts';
import AccountPanel from '@/components/panel/AccountPanel';
import AccountNotInstalled from '@/components/alert/subComponents/AccountNotInstalled';
import AccountNotEnabled from '@/components/alert/subComponents/AccountNotEnabled';
import EventBusNotInstalled from '@/components/alert/subComponents/EventBusNotInstalled';
import {isOnboardingCompleted} from '@/lib/Helpers';
import {Segment, VueCompositionAPI} from '@/ExternalDependencies';

const Components = {
  PsAccounts,
  AccountPanel,
  AccountNotInstalled,
  AccountNotEnabled,
  EventBusNotInstalled,
};

const Library = {
  install(vue) {
    Object.keys(Components).forEach((name) => {
      vue.component(name, Components[name]);
    });

    vue.use(VueCompositionAPI);

    if (!window?.analytics) {
      vue.use(Segment, {
        id: window?.contextPsAccounts?.segmentApiKey,
        pageCategory: 'ps_accounts-ui',
      });
    }
  },
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Library);
} else {
  Vue.use(Library);
}

export default {
  version: '0.1.4',
  Library,
  isOnboardingCompleted,
  ...Components,
};

export {
  Library,
  isOnboardingCompleted,
  PsAccounts,
  AccountPanel,
  AccountNotInstalled,
  AccountNotEnabled,
  EventBusNotInstalled,
};
