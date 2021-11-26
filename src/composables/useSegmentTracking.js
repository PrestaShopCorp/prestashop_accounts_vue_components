import Vue from 'vue';
import {toRefs} from '@vue/composition-api';
import context, {
  shopsInContext,
  psAccountModuleState,
  psEventBusModuleState,
} from '@/lib/context';

const state = Vue.observable({
  initialized: false,
  properties: {},
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
  function identify(...args) {
    let props = {
      email: context().backendUser.email,
      employeeId: context().backendUser.employeeId,
      superadmin: context().backendUser.isSuperAdmin,
      v4_onboarded: context().isOnboardedV4,
    };
    if (args.length === 1 && typeof args[0] === 'object') {
      props = args[0];
    } else if (args.length >= 2 && typeof args[1] === 'object') {
      props = args[1];
    }

    // eslint-disable-next-line no-unused-expressions
    Vue.prototype.$segment?.identify(...args);

    setSuperProperties(props);
  }

  function track(name, props = {}) {
    // eslint-disable-next-line no-unused-expressions
    Vue.prototype.$segment?.track(name, {...state.properties, ...props});

    setSuperProperties(props);
  }

  function trackAccountComponentViewed() {
    const shopsWithUrl = shopsInContext().filter((shop) => shop.domain);

    track('[ACC] Account Component Viewed', {
      multishop_numbers: context().shops.reduce(
        (acc, shop) => acc + shop.shops.length,
        0,
      ),
      ps_account_module_state: psAccountModuleState(),
      ps_account_version: context().psAccountsVersion,
      ps_eventbus_module_state: psEventBusModuleState(),
      ps_module_from: context().psxName,
      ps_version: shopsWithUrl[0]?.psVersion,
      shop_associated: shopsWithUrl.map(
        (shop) => shop.uuid !== null && !shop.isLinkedV4,
      ),
      shop_bo_ids: shopsWithUrl.map((shop) => shop.id),
      shop_context_id: context().currentContext.id,
      shop_context_type: context().currentContext.type,
      shop_employee_ids: shopsWithUrl.map((shop) => shop.employeeId),
      shop_names: shopsWithUrl.map((shop) => shop.name),
      shop_uuids: shopsWithUrl.map((shop) => shop.uuid),
      shop_v4_onboarded: shopsWithUrl.map((shop) => shop.isLinkedV4),
      shop_urls: shopsWithUrl.map((shop) => (shop.domain || shop.domainSsl) + shop.physicalUri),
    });

    return true;
  }

  function trackAssociateOrManageAccountButton(action) {
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

  function trackPsAccountEnableButton() {
    track('[ACC] PSAccount Enable Button Clicked');
  }

  function trackPsAccountInstallButton() {
    track('[ACC] PSAccount Install Button Clicked');
  }

  function trackPsAccountUpdateButton() {
    track('[ACC] PSAccount Update Button Clicked');
  }

  function trackPsEventBusInstallButton() {
    track('[ACC] PSEventBus Install Button Clicked');
  }

  function reset() {
    // eslint-disable-next-line no-unused-expressions
    Vue.prototype.$segment?.reset();

    // state.properties = {};
    // if (process.client && window.localStorage) {
    //   window.localStorage.setItem('tracking', JSON.stringify({}));
    // }
  }

  function setSuperProperties(props) {
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
    trackPsAccountEnableButton,
    trackPsAccountInstallButton,
    trackPsAccountUpdateButton,
    trackPsEventBusInstallButton,
  };
}
