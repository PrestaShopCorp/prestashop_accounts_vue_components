import Vue from 'vue';
import {reactive, toRefs} from 'vue-demi';
import usePSAccountsContext from './usePSAccountsContext';

const modules: Record<string, string> = {
  ps_accounts: 'PSAccounts',
  ps_eventbus: 'PSEventBus',
};

const state = reactive({
  initialized: false,
  properties: {} as Record<string, unknown>,
  superProperties: [
    'multishop_numbers',
    'ps_account_version',
    'ps_module_from',
    'ps_version',
    'shop_context_id',
    'shop_context_type',
    'shop_names',
    'shop_urls',
    'superadmin',
    'v4_onboarded',
  ],
});
export default function useSegmentTracking() {
  const {
    context,
    psAccountModuleState,
    psEventBusModuleState,
    shopsInContext,
  } = usePSAccountsContext();

  function identify(...args: Record<string, unknown>[]) {
    let props: Record<string, unknown> = {
      email: context.value.backendUser?.email,
      employeeId: context.value.backendUser?.employeeId,
      superadmin: context.value.backendUser?.isSuperAdmin,
      v4_onboarded: context.value.isOnboardedV4,
    };

    if (args.length === 1 && typeof args[0] === 'object') {
      [props] = args;
    } else if (args.length >= 2 && typeof args[1] === 'object') {
      [, props] = args;
    }

    // eslint-disable-next-line no-unused-expressions
    Vue.prototype.$segment?.identify(...args);

    setSuperProperties(props);
  }

  function track(name: string, props = {}) {
    // eslint-disable-next-line no-unused-expressions
    Vue.prototype.$segment?.track(name, {...state.properties, ...props});

    setSuperProperties(props);
  }

  function trackAccountComponentViewed() {
    const shopsWithUrl = shopsInContext.value?.filter((shop) => shop.domain) || [];

    track('[ACC] Account Component Viewed', {
      multishop_numbers: context.value.shops?.reduce(
        (acc, shop) => acc + shop.shops.length,
        0,
      ),
      ps_account_module_state: psAccountModuleState.value,
      ps_account_version: context.value.psAccountsVersion,
      ps_eventbus_module_state: psEventBusModuleState.value,
      ps_module_from: context.value.psxName,
      ps_version: shopsWithUrl[0]?.psVersion,
      shop_associated: shopsWithUrl.map(
        (shop) => shop.uuid !== null && !shop.isLinkedV4,
      ),
      shop_bo_ids: shopsWithUrl.map((shop) => shop.id),
      shop_context_id: context.value.currentContext?.id,
      shop_context_type: context.value.currentContext?.type,
      shop_employee_ids: shopsWithUrl.map((shop) => shop.employeeId),
      shop_names: shopsWithUrl.map((shop) => shop.name),
      shop_uuids: shopsWithUrl.map((shop) => shop.uuid),
      shop_v4_onboarded: shopsWithUrl.map((shop) => shop.isLinkedV4),
      shop_urls: shopsWithUrl.map((shop) => (shop.domain || shop.domainSsl || '') + shop.physicalUri),
    });

    return true;
  }

  function trackAssociateOrManageAccountButton(action: string) {
    const eventName = ['reonboard', 'associate'].includes(action)
      ? '[ACC] Associate Button Clicked'
      : '[ACC] Manage Account Button Clicked';

    track(eventName);
  }

  function trackLinkContactAdmin() {
    track('[ACC] Link Contact Admin Clicked');
  }

  function trackLinkResendEmailValidation() {
    track('[ACC] Link Resend Email Validation Clicked');
  }

  function trackModuleAction(module: string, action: string) {
    const actionCapitalized = action.charAt(0).toUpperCase() + action.slice(1);
    track(`[ACC] ${modules[module]} ${actionCapitalized} Button Clicked`);
  }

  function reset() {
    // eslint-disable-next-line no-unused-expressions
    Vue.prototype.$segment?.reset();

    // state.properties = {};
    // if (process.client && window.localStorage) {
    //   window.localStorage.setItem('tracking', JSON.stringify({}));
    // }
  }

  function setSuperProperties<T>(props: Record<string, T>) {
    Object.keys(props).forEach((key) => {
      if (state.superProperties.includes(key)) {
        state.properties[key] = props[key];
      }
    });

    if (window.localStorage) {
      window.localStorage.setItem('tracking', JSON.stringify(state.properties));
    }
  }

  if (!state.initialized) {
    if (window.localStorage.getItem('tracking')) {
      setSuperProperties(
        JSON.parse(window.localStorage.getItem('tracking') || '{}'),
      );
    }

    state.initialized = true;
  }

  return {
    ...toRefs(state),
    identify,
    reset,
    trackAccountComponentViewed,
    trackAssociateOrManageAccountButton,
    trackLinkContactAdmin,
    trackLinkResendEmailValidation,
    trackModuleAction,
  };
}
