import Vue from 'vue';
import {contextSchema} from '@/lib/ContextValidator';

export const CONTEXT_SHOP = 1;
export const CONTEXT_GROUP = 2;
export const CONTEXT_ALL = 4;

const defaultState = () => ({
  accountsUiUrl: '',
  adminAjaxLink: '',
  backendUser: {},
  currentContext: {
    type: CONTEXT_ALL,
    id: null,
  },
  currentShop: {},
  dependencies: {},
  errors: [],
  isOnboardedV4: false,
  isShopContext: true,
  manageAccountLink: '',
  onboardingLink: '',
  psAccountsEnableLink: null,
  psAccountsInstallLink: null,
  psAccountsIsEnabled: true,
  psAccountsIsInstalled: true,
  psAccountsIsUptodate: true,
  psAccountsUpdateLink: null,
  psIs17: true,
  psxName: 'ps_accounts',
  segmentApiKey: null,
  shops: [],
  ssoResendVerificationEmail: '',
  superAdminEmail: null,
  user: {},
});

const state = Vue.observable(defaultState());

export const setContext = (context) => {
  const mergedContext = {
    ...defaultState(),
    ...(window.contextPsAccounts || {}),
    ...context,
  };

  // validates but also fix when possible.
  const {
    value,
    error,
  } = contextSchema.validate(
    mergedContext,
  );

  const validContext = {
    ...value,
    errors: error
      ? error.details.map(
        (e) => e.message,
      )
      : [],
  };

  Object.keys(validContext).forEach(
    (key) => {
      Vue.set(
        state,
        key,
        validContext[key],
      );
    },
  );
};

/**
 * Getters
 */
export const eventbusIsInstalled = () => state.dependencies?.ps_eventbus?.isInstalled || false;
export const eventbusIsEnabled = () => state.dependencies?.ps_eventbus?.isEnabled || false;

export const psAccountModuleState = () => {
  if (!state.psAccountsIsUptodate) {
    return 'to_update';
  }

  if (!state.psAccountsIsEnabled) {
    return 'to_enable';
  }

  if (!state.psAccountsIsInstalled) {
    return 'to_install';
  }

  return 'installed';
};

export const psEventBusModuleState = () => {
  if (!eventbusIsEnabled()) {
    return 'to_enable';
  }

  if (!eventbusIsInstalled()) {
    return 'to_install';
  }

  return 'installed';
};

export const shops = () => state.shops.reduce(
  (acc, shopGroup) => [...acc, ...shopGroup.shops], [],
);

export const shopsInContext = () => {
  if (state.currentContext.type === CONTEXT_ALL) { // All
    return shops();
  }

  if (state.currentContext.type === CONTEXT_GROUP) { // Group
    return [
      ...state.shops.find(
        (shopGroup) => parseInt(shopGroup.id, 10) === state.currentContext.id,
      )?.shops || [],
    ];
  }

  // Shop
  const shop = state.shops.reduce(
    (acc, shopGroup) => [...acc, ...shopGroup.shops], [],
  )
    .find(
      (shop2) => parseInt(shop2.id, 10) === state.currentContext.id,
    );

  return shop ? [shop] : [];
};

export default () => state;
