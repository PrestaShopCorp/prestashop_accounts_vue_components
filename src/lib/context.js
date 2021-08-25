import Vue from 'vue';
import {contextSchema} from '@/lib/ContextValidator';

export const CONTEXT_SHOP = 1;
export const CONTEXT_GROUP = 2;
export const CONTEXT_ALL = 4;

const defaultState = () => {
  // validates but also fix when possible.
  const {value: context, error} = contextSchema.validate(global.contextPsAccounts);

  return {
    ...context,
    errors: error ? error.details.map((e) => e.message) : [],
  };
};

const state = Vue.observable(defaultState());

/**
 * Getters
 */

export const eventbusIsInstalled = () => state.dependencies?.ps_eventbus?.isInstalled || false;

export const isLogged = () => state.user.email !== null;

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

export const shops = () => state.shops.reduce(
  (acc, shopGroup) => [...acc, ...shopGroup.shops], [],
);

export const shopsInContext = () => {
  if (state.currentContext.type === 4) { // All
    return shops();
  }

  if (state.currentContext.type === 2) { // Group
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
