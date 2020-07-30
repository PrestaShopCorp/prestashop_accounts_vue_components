<template>
  <div>
    <b-alert
      :show="hasError"
      @dismissed="hasError=false"
      variant="danger"
      dismissible
    >
      <p>
        {{ t('psaccounts.accountManager.errorInstallEnable') }}
      </p>
    </b-alert>

    <b-alert
      v-if="validationErrors && validationErrors.length"
      variant="danger"
      show
    >
      <p>
        &lt;PsAccounts&gt; integration: Given context is invalid: {{ validationErrors.join(';') }}
      </p>
    </b-alert>

    <template v-else-if="!showPlans || !canShowPlans">
      <AccountNotInstalled
        v-if="!psAccountsIsInstalled"
        :account-is-installed="psAccountsIsInstalled"
        :is-loading="installLoading"
        @install="installPsAccounts()"
      />
      <template v-else>
        <AccountNotEnabled
          v-if="!psAccountsIsEnabled"
          :account-is-enabled="psAccountsIsEnabled"
          :is-loading="enableLoading"
          @enabled="enablePsAccounts()"
        />
        <template v-else>
          <MultiStoreSelector
            v-if="!validatedContext.currentShop"
            :shops="validatedContext.shops"
          />
          <Account
            v-else
            :user="validatedContext.user"
            :is-admin="validatedContext.user.isSuperAdmin"
            :onboarding-link="validatedContext.onboardingLink"
            :admin-email="validatedContext.superAdminEmail"
            :resend-email-link="validatedContext.ssoResendVerificationEmail"
            class="mb-2"
          >
            <Billing
              v-if="showBilling"
              :billing="validatedContext.billing"
              @upgrade-plan="goToPlans()"
              @edit-payment-method="alert('Not yet implemented!')"
              @edit-address="alert('Not yet implemented!')"
            />
          </Account>
        </template>
      </template>
      <b-overlay
        :show="!userIsConnectedAndEmailIsValidated"
        variant="white"
        :opacity="0.70"
        blur="0px"
      >
        <slot name="body" />
      </b-overlay>
      <slot name="customBody" />
    </template>

    <Plans
      v-else
      :billing="validatedContext.billing"
      @back="goToHome()"
      @next="(plan) => goToTunnel(plan)"
    />
  </div>
</template>

<script>
  import AccountNotEnabled from '@/components/alert/AccountNotEnabled';
  import AccountNotInstalled from '@/components/alert/AccountNotInstalled';
  import MultiStoreSelector from '@/components/alert/MultiStoreSelector';
  import Account from '@/components/panel/Account';
  import Billing from '@/components/panel/Billing';
  import Plans from '@/components/panel/Plans';
  import context from '@/lib/ContextWrapper';
  import Locale from '@/mixins/locale';
  import {BAlert, BOverlay} from 'bootstrap-vue';
  import {contextSchema} from '../lib/ContextValidator';

  /**
   * `PsAccounts` will automate pre-requisites checks and will call sub-components directly
   * to ensure each functional case is covered for you. You can use 2 slots: `v-slot:body`,
   * that will be disabled if the user account is not well linked (you should put your
   * module configuration panel here), and a special `v-slot:customBody` that will always be
   * displayed (you have to manage display condition by yourself).
   */
  export default {
    name: 'PsAccounts',
    components: {
      AccountNotInstalled,
      AccountNotEnabled,
      MultiStoreSelector,
      Account,
      Billing,
      Plans,
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
        default: () => context,
      },
      /**
       * A way to force plans page display (if any plan is available) directly at component boot.
       * By default, false to let normal workflow to be displayed.
       */
      forceShowPlans: {
        type: Boolean,
        required: false,
        default: false,
      },
    },
    computed: {
      userIsConnectedAndEmailIsValidated() {
        return this.validatedContext.user.email !== null
          && this.validatedContext.user.emailIsValidated;
      },
      psAccountsIsInstalled() {
        return this.validatedContext.psAccountsInstallLink === null;
      },
      psAccountsIsEnabled() {
        return this.validatedContext.psAccountsEnableLink === null;
      },
      showBilling() {
        const b = this.validatedContext.billing;
        const u = this.validatedContext.user;
        return this.validatedContext.currentShop
          && u && (u.email !== null) && u.emailIsValidated
          && b && ((b.currentPlan && b.currentPlan !== null) || (b.plans && b.plans.length > 0));
      },
      canShowPlans() {
        const b = this.validatedContext.billing;
        return b.plans && (b.plans.length > 0);
      },
    },
    data() {
      return {
        validationErrors: [],
        validatedContext: this.context,
        installLoading: false,
        enableLoading: false,
        hasError: false,
        showPlans: this.forceShowPlans || false,
      };
    },
    methods: {
      validateContext() {
        // validates but also fix when possible.
        const {value, error} = contextSchema.validate(this.context);
        this.validationErrors = [];
        this.validatedContext = value;

        if (error) {
          this.validationErrors = error.details.map((e) => e.message);
        }
      },
      installPsAccounts() {
        // clean errors before retry
        this.hasError = false;
        this.installLoading = true;

        // if on ps before 1.7.3 just reload the page
        if (!this.validatedContext.psIs17) {
          window.location.href = this.validatedContext.psAccountsInstallLink;
        }

        fetch(this.validatedContext.psAccountsInstallLink, {
          method: 'POST',
        }).then((response) => response.json(),
        ).then((data) => {
          if (data.ps_accounts.status === false) {
            throw new Error('Cannot install ps_accounts module.');
          }

          window.location.reload();
        }).catch(() => {
          this.installLoading = false;
          this.hasError = true;
        });
      },
      enablePsAccounts() {
        // clean errors before retry
        this.hasError = false;
        this.enableLoading = true;

        // if on ps before 1.7.3 just reload the page
        if (!this.validatedContext.psIs17) {
          window.location.href = this.validatedContext.psAccountsInstallLink;
        }

        fetch(this.validatedContext.psAccountsEnableLink, {
          method: 'POST',
        }).then((response) => response.json(),
        ).then((data) => {
          if (data.ps_accounts.status === false) {
            throw new Error('Cannot enable ps_accounts module.');
          }

          this.validatedContext.psAccountsEnableLink = null;
          this.enableLoading = false;
        }).catch(() => {
          this.enableLoading = false;
          this.hasError = true;
        });
      },
      goToPlans() {
        this.showPlans = true;
      },
      goToHome() {
        this.showPlans = false;
      },
      goToTunnel(plan) {
        this.showPlans = false;
        // TODO: modal display, with a new PlanTunnel component inside, for given plan
        setTimeout(() => alert(`Not yet implemented: ${plan}`), 400);
      },
      alert(t) {
        alert(t);
      },
    },
    created() {
      this.validateContext();
    },
    watch: {
      context() {
        this.validateContext();
      },
      forceShowPlans(newValue) {
        this.showPlans = newValue;
      },
    },
  };
</script>
