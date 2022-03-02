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

const Plugin = {
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

function init() {
  Vue.use(Plugin);

  new Vue({
    components: {
      'prestashop-accounts': PsAccounts,
    },
  }).$mount('prestashop-accounts');
}

export default {
  version: '0.1.4',
  init,
  Plugin,
  isOnboardingCompleted,
  ...Components,
};

export {
  init,
  Plugin,
  isOnboardingCompleted,
  PsAccounts,
  AccountPanel,
  AccountNotInstalled,
  AccountNotEnabled,
  EventBusNotInstalled,
};
