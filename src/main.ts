import { App, createApp } from 'vue';
import { i18n } from './locales';
import PsAccounts from '@/components/PsAccounts.vue';
import AccountPanel from '@/components/panel/AccountPanel.vue';
import {isOnboardingCompleted} from '@/lib/Helpers';

const version = "5.0.0"

const Components: Record<string, any> = {
  PsAccounts,
  AccountPanel,
};

const Plugin = {
  install(app: App) {
    app.use(i18n);

    Object.keys(Components).forEach((name) => {
      app.component(name, Components[name]);
    });
  },
};

const app = createApp(PsAccounts);

function init() {

  app.use(Plugin).mount('prestashop-accounts');
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
