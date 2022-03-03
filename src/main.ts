import Vue from 'vue';
import PsAccounts from '@/components/PsAccounts.vue';
import AccountPanel from '@/components/panel/AccountPanel.vue';
import {isOnboardingCompleted} from '@/lib/Helpers';
import {Segment, VueCompositionAPI} from '@/ExternalDependencies';

const version = process.env.VUE_APP_VERSION;

const Components: Record<string, Vue.VueConstructor> = {
  PsAccounts,
  AccountPanel,
};

const Plugin = {
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

function init() {
  Vue.use(Plugin);

  new Vue({
    components: {
      'prestashop-accounts': PsAccounts,
    },
  }).$mount('prestashop-accounts');
}

export default {
  ...Components,
  init,
  isOnboardingCompleted,
  Plugin,
  version,
};

export {
  AccountPanel,
  init,
  isOnboardingCompleted,
  Plugin,
  PsAccounts,
  version,
};
