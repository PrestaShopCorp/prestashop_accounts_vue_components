import Vue from 'vue';
import VueI18n from 'vue-i18n';
import i18n from './i18n';
import PsAccounts from '@/components/PsAccounts.vue';
import AccountPanel from '@/components/panel/AccountPanel.vue';
import {isOnboardingCompleted} from '@/lib/Helpers';
import {Segment} from '@/ExternalDependencies';

const version = process.env.VUE_APP_VERSION;

const Components: Record<string, Vue.VueConstructor> = {
  PsAccounts,
  AccountPanel,
};

const Plugin = {
  install(vue: typeof Vue) {
    vue.use(VueI18n);

    Object.keys(Components).forEach((name) => {
      vue.component(name, Components[name]);
    });

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
    i18n: i18n(),
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
