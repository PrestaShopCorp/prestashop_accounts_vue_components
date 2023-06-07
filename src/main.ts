import { App, createApp } from 'vue';
import { i18n } from './locales';
import PsAccounts from '@/components/PsAccounts.vue';
import AccountPanel from '@/components/panel/AccountPanel.vue';
import { isOnboardingCompleted } from '@/lib/Helpers';

const version = import.meta.env.PACKAGE_VERSION;

const Plugin = {
  install (app: App) {
    app.use(i18n);
    app.component('PsAccounts', PsAccounts);
  }
};

const app = createApp(PsAccounts);

function init () {
  app.use(Plugin).mount('prestashop-accounts');
}

export default {
  PsAccounts,
  init,
  isOnboardingCompleted,
  Plugin,
  version
};

export {
  AccountPanel,
  init,
  isOnboardingCompleted,
  Plugin,
  PsAccounts,
  version
};
