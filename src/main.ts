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
  const windowAny = window as any;
  const version = windowAny.contextPsAccounts?.psAccountsVersion as string | undefined;
  const mainVersion = version ? parseInt(version.split('.')[0]) : undefined;

  if (mainVersion && mainVersion >= 8) {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@prestashopcorp/accounts-components@beta';
    script.async = true;
    script.onload = () => {
      windowAny.psaccountsVue?.init?.({}, 'Settings');
    };
    document.head.appendChild(script);
    return;
  }

  customElements.get('prestashop-accounts') ?? customElements.define('prestashop-accounts', PsAccountsWebComponent);
};

export default installGlobalComponents;

export {
  installGlobalComponents,
  init,
  isOnboardingCompleted,
  PsAccounts,
  PsAccountsWebComponent
};
