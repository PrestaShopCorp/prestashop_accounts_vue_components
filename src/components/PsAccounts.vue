<template>
  <div>
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
        <Account
          class="mb-2"
          :accounts-ui-url="validContext.accountsUiUrl"
          :backend-user="validContext.backendUser"
          :onboarding-link="validContext.onboardingLink"
          :shops="shops"
          :shop-context="validContext.currentContext.type"
          :sso-resend-verification-email="validContext.ssoResendVerificationEmail"
          :super-admin-email="validContext.superAdminEmail"
        >
          <slot
            v-if="hasAllShopsLinked"
            name="account-footer"
          />
        </Account>
        <b-overlay
          :show="!hasAllShopsLinked"
          variant="white"
          spinner-type="null"
          :opacity="0.70"
          blur="0px"
        >
          <slot name="body" />
        </b-overlay>
        <slot name="customBody" />
      </template>
    </template>
  </div>
</template>

<script>
  import validContext, {
    setContext, shopsInContext,
  } from '@/lib/context';
  import PsAccountComponentAlertDisplay from '@/components/alert/PsAccountComponentAlertDisplay';
  import Account from '@/components/panel/Account';
  import Locale from '@/mixins/locale';
  import {BAlert, BOverlay} from 'bootstrap-vue';
  import useSegmentTracking from '@/composables/useSegmentTracking';
  import 'bootstrap-vue/dist/bootstrap-vue.css';

  /**
   * `PsAccounts` will automate pre-requisites checks and will call sub-components directly
   * to ensure each functional case is covered for you. You can use 3 slots: `v-slot:body`,
   * that will be disabled if the user account is not well linked (you should put your
   * module configuration panel here), `v-slot:account-footer` that will be displayed
   * on the footer of the PsAccount component if the user is validated and logged,
   * and a special `v-slot:customBody` that will always be
   * displayed (you have to manage display condition by yourself).
   */
  export default {
    name: 'PsAccounts',
    components: {
      PsAccountComponentAlertDisplay,
      Account,
      BOverlay,
      BAlert,
    },
    mixins: [Locale],
    props: {
      /**
       * The whole context object given
       * [by prestashop\_accounts\_auth library presenter function](https://github.com/PrestaShopCorp/prestashop_accounts_auth#usage).
       * If left empty (by default), the context will be retrieved from JS global
       * vars automatically.
       */
      context: {
        type: Object,
        required: false,
        default: () => window.contextPsAccounts,
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
        return this.shops.every((shop) => shop.uuid);
      },
      hasBlockingAlert() {
        return !this.validContext.psAccountsIsInstalled
          || !this.validContext.psAccountsIsUptodate
          || !this.validContext.psAccountsIsEnabled;
      },
    },
    async created() {
      setContext(this.context);

      if (this.validContext.psAccountsIsInstalled) {
        this.identify();
        this.trackAccountComponentViewed();
      }
    },
  };
</script>
