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
          :is-onboarded-v4="validContext.isOnboardedV4"
          :onboarding-link="validContext.onboardingLink"
          :shops="shops"
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
    eventbusIsInstalled, psAccountModuleState, setContext, shopsInContext,
  } from '@/lib/context';
  import PsAccountComponentAlertDisplay from '@/components/alert/PsAccountComponentAlertDisplay';
  import Account from '@/components/panel/Account';
  import Locale from '@/mixins/locale';
  import {BAlert, BOverlay} from 'bootstrap-vue';
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
        default: () => ({}),
      },
    },
    data() {
      return {
        hasError: false,
      };
    },
    computed: {
      validContext,
      eventbusIsInstalled,
      psAccountModuleState,
      shops: shopsInContext,
      hasAllShopsLinked() {
        return this.shops.every((shop) => shop.uuid);
      },
      hasBlockingAlert() {
        return !this.validContext.psAccountsIsInstalled
          || !this.validContext.psAccountsIsUptodate
          || !this.validContext.psAccountsIsEnabled;
      },
      shopsForTracking() {
        return this.shops.reduce(
          (acc, shop, idx) => {
            let url = this.validContext.currentShop.domainSsl
              ? this.validContext.currentShop.domainSsl
              : this.validContext.currentShop.domain;
            url += this.validContext.currentShop.physicalUri;

            return {
              ...acc,
              [`shop.${idx}.associated`]: shop.uuid !== null,
              [`shop.${idx}.bo_id`]: shop.id,
              [`shop.${idx}.domain`]: shop.domain,
              [`shop.${idx}.domain_ssl`]: shop.domainSsl,
              [`shop.${idx}.employee_id`]: shop.employeeId,
              [`shop.${idx}.name`]: shop.name,
              [`shop.${idx}.physical_uri`]: shop.physicalUri,
              [`shop.${idx}.ps_version`]: shop.psVersion,
              [`shop.${idx}.url`]: url,
              [`shop.${idx}.uuid`]: shop.uuid,
              [`shop.${idx}.v4_onboarded`]: shop.isLinkedV4,
            };
          },
          {},
        );
      },
    },
    methods: {
      trackUser() {
        // We don't know the SSO identified user...
        this.$tracking.identify({
          email: this.validContext.backendUser.email,
          employeeId: this.validContext.backendUser.employeeId,
          superadmin: this.validContext.backendUser.isSuperAdmin,
          v4_onboarded: this.validContext.isOnboardedV4,
        });
      },
      trackComponent() {
        this.$tracking.track('[ACC] Account Component Viewed', {
          ...this.shopsForTracking,
          ps_account_module_state: this.psAccountModuleState,
          ps_eventbus_installed: this.eventbusIsInstalled,
          ps_module_from: this.validContext.psxName,
          ps_version: this.shops[0].psVersion,
          shop_context_id: this.validContext.currentContext.id,
          shop_context_type: this.validContext.currentContext.type,
        });
      },
    },
    created() {
      setContext(this.context);

      this.trackUser();
      this.trackComponent();
    },
  };
</script>
