<template>
  <div id="main_ps_accounts">
    <b-alert
      :show="hasError"
      @dismissed="hasError = false"
      variant="danger"
      dismissible
    >
      <p>
        {{ t('psaccounts.accountManager.errorInstallEnable') }}
      </p>
    </b-alert>

    <b-alert
      v-if="validContext.errors && validContext.errors.length"
      variant="danger"
      show
    >
      <p>
        &lt;PsAccounts&gt; integration: Given context is invalid:
        {{ validContext.errors.join(';') }}
      </p>
    </b-alert>

    <template v-else>
      <PsAccountComponentAlertDisplay
        @hasError="hasError = true"
      />

      <template v-if="!hasBlockingAlert">
        <AccountPanel
          class="mb-2"
          :accounts-ui-url="validContext.accountsUiUrl"
          :backend-user="validContext.backendUser"
          :onboarding-link="validContext.onboardingLink"
          :shops="shops"
          :shop-context="validContext.currentContext.type"
          :sso-resend-verification-email="validContext.ssoResendVerificationEmail"
          :super-admin-email="validContext.superAdminEmail"
        />
        <b-overlay
          :show="!hasAllShopsLinked"
          variant="white"
          spinner-type="null"
          :opacity="0.70"
          blur="0px"
        >
          <slot />
        </b-overlay>
      </template>
    </template>
  </div>
</template>

<script>
import {BAlert, BOverlay} from 'bootstrap-vue';
import validContext, {
  setContext, shopsInContext,
} from '@/lib/context';
import PsAccountComponentAlertDisplay from '@/components/alert/PsAccountComponentAlertDisplay';
import AccountPanel from '@/components/panel/AccountPanel';
import Locale from '@/mixins/locale';
import useSegmentTracking from '@/composables/useSegmentTracking';

/**
   * `PsAccounts` will automate pre-requisites checks and will call sub-components directly
   * to ensure each functional case is covered for you. You can use the default slots
   * that will be disabled if the user account is not well linked (you should put your
   * module configuration panel here)
   */
export default {
  name: 'PsAccounts',
  components: {
    PsAccountComponentAlertDisplay,
    AccountPanel,
    BOverlay,
    BAlert,
  },
  mixins: [Locale],
  props: {
    /**
       * The whole context object given
       * [by ps\_accounts module presenter function](https://github.com/PrestaShopCorp/prestashop-accounts-installer#register-as-a-service-in-your-psx-container-recommended).
       * If left empty (by default), the context will be retrieved from JS global
       * var window.contextPsAccounts automatically.
       */
    context: {
      type: Object,
      required: false,
      default: () => window.contextPsAccounts || {},
    },
  },
  data() {
    return {
      hasError: false,
    };
  },
  setup() {
    const {identify, trackAccountComponentViewed} = useSegmentTracking();

    return {
      identify,
      trackAccountComponentViewed,
    };
  },
  computed: {
    validContext,
    shops: shopsInContext,
    hasAllShopsLinked() {
      return this.shopsWithUrl.every((shop) => shop.uuid);
    },
    hasBlockingAlert() {
      return !this.validContext.psAccountsIsInstalled
          || !this.validContext.psAccountsIsUptodate
          || !this.validContext.psAccountsIsEnabled;
    },
    shopsWithUrl() {
      return this.shops.filter((shop) => shop.domain);
    },
  },
  created() {
    setContext(this.context);

    if (this.validContext.psAccountsIsInstalled && this.validContext.psAccountsIsEnabled) {
      this.identify();
      this.trackAccountComponentViewed();
    }
  },
};
</script>

<style>
#main_ps_accounts {
  @import '~bootstrap-vue/dist/bootstrap-vue.css';
  @import '~prestakit/dist/css/bootstrap-prestashop-ui-kit.css';
}
</style>
