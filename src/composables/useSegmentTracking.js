import {toRefs} from '@vue/composition-api';
import Vue from 'vue';

const state = Vue.observable({
  initialized: false,
  context: {},
  properties: {},
  superProperties: [
    'current_shop',
    'multishop_numbers',
    'provider',
    'ps_module_from',
    'ps_version',
    'shop_bo_id',
    'superadmin',
    'v4_onboarded',
  ],
});
export default function useSegmentTracking(context) {
  function identify(...args) {
    let props = {
      email: state.context.backendUser.email,
      employeeId: state.context.backendUser.employeeId,
      superadmin: state.context.backendUser.isSuperAdmin,
      v4_onboarded: state.context.isOnboardedV4,
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
    let shopUrl = state.context.currentShop.domain_ssl
      ? state.context.currentShop.domain_ssl
      : state.context.currentShop.domain;
    shopUrl += state.context.currentShop.physicalUri;

    track('[ACC] Account Component Viewed', {
      current_shop: JSON.parse(JSON.stringify(state.context.currentShop)),
      ps_account_module_state: psAccountModuleState(),
      ps_eventbus_installed:
          state.context.dependencies?.ps_eventbus?.isInstalled ?? false,
      ps_module_from: state.context.psxName,
      ps_version: state.context.currentShop.psVersion,
      shop_associated: state.context.currentShop.uuid !== null,
      shop_bo_id: state.context.currentShop.id,
      shop_url: shopUrl,
      v4_onboarded: state.context.currentShop.isLinkedV4,
    });
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
    state.context = context;

    if (window.localStorage.getItem('tracking')) {
      setSuperProperties(
        JSON.parse(window.localStorage.getItem('tracking') || '{}'),
      );
    }

    state.initialized = true;
  }

  function psAccountModuleState() {
    if (!state.context.psAccountsIsUptodate) {
      return 'to_update';
    }

    if (!state.context.psAccountsIsEnabled) {
      return 'to_enable';
    }

    if (state.context.psAccountsIsInstalled) {
      return 'to_install';
    }

    return 'installed';
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
