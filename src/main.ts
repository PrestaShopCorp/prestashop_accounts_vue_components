import { App, defineCustomElement } from 'vue';
import PsAccounts from '@/components/PsAccounts.vue';
import { isOnboardingCompleted } from '@/lib/Helpers';

const installGlobalComponents = {
  install (app: App) {
    app.component('PsAccounts', PsAccounts);
  }
};

const PsAccountsWebComponent = defineCustomElement(PsAccounts);

const init = () => {
  customElements.define('prestashop-accounts', PsAccountsWebComponent);
};

export default installGlobalComponents;

export {
  installGlobalComponents,
  init,
  isOnboardingCompleted,
  PsAccounts,
  PsAccountsWebComponent
};
