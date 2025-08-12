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
  const version = window.contextPsAccounts?.psAccountsVersion;
  const mainVersion = version ? parseInt(version.split('.')[0]) : undefined;

  if (mainVersion && mainVersion >= 8) {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@prestashopcorp/accounts-components@beta'; // TODO: put new CDN URL with a non beta version and release it in 5.2 and 5.3 versions
    script.async = true;
    script.onload = () => {
      window.psaccountsVue?.init?.();
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
