import Vue from 'vue';
import PsAccounts from '@/components/PsAccounts.vue';
import AccountPanel from '@/components/panel/AccountPanel.vue';
import {isOnboardingCompleted} from '@/lib/Helpers';
import {Segment, VueCompositionAPI} from '@/ExternalDependencies';

const Components: Record<string, any> = {
  PsAccounts,
  AccountPanel,
};

const Library = {
  install(vue: typeof Vue) {
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

// this method can be called like that window.psaccountsVue.init()
Vue.use(Library);
export function init() {
  new Vue({
    components: {
      'prestashop-accounts': PsAccounts,
    },
  }).$mount('prestashop-accounts');
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
};
