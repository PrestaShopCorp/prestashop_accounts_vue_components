import Vue from 'vue';
import PsAccounts from '@/components/PsAccounts.vue';
import AccountPanel from '@/components/panel/AccountPanel.vue';
import AccountNotInstalled from '@/components/alert/subComponents/AccountNotInstalled.vue';
import AccountNotEnabled from '@/components/alert/subComponents/AccountNotEnabled.vue';
import EventBusNotInstalled from '@/components/alert/subComponents/EventBusNotInstalled.vue';
import {isOnboardingCompleted} from '@/lib/Helpers';
import {use, i18n, i18nHandlerCb} from '@/locale';
import {Segment, VueCompositionAPI} from '@/ExternalDependencies';

const Components: Record<string, any> = {
  PsAccounts,
  AccountPanel,
  AccountNotInstalled,
  AccountNotEnabled,
  EventBusNotInstalled,
};

interface Opts {
  locale?: string,
  i18n?: i18nHandlerCb<unknown>,
}

function install(vue: typeof Vue, opts: Opts = {}) {
  if (opts.locale) {
    use(opts.locale);
  }
  if (opts.i18n) {
    i18n(opts.i18n);
  }
  vue.use(VueCompositionAPI);
  Object.keys(Components).forEach((name) => {
    vue.component(name, Components[name]);
  });
  if (!window?.analytics) {
    vue.use(Segment, {
      id: window?.contextPsAccounts?.segmentApiKey,
      pageCategory: 'ps_accounts-ui',
    });
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue, {locale: window.iso_user || 'en'});
} else {
  Object.keys(Components).forEach((name) => {
    Vue.component(name, Components[name]);
  });
  Vue.use(VueCompositionAPI);
  if (!window?.analytics) {
    Vue.use(Segment, {
      id: window?.contextPsAccounts?.segmentApiKey,
      pageCategory: 'ps_accounts-ui',
    });
  }
}

export default {
  version: '0.1.4',
  locale: use,
  i18n,
  install,
  isOnboardingCompleted,
  ...Components,
};

export {
  use as locale,
  i18n,
  install,
  isOnboardingCompleted,
  PsAccounts,
  AccountPanel,
  AccountNotInstalled,
  AccountNotEnabled,
  EventBusNotInstalled,
};
