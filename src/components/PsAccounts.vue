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

    <template v-else>
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
            @shop-selected="eventCallback('multi_shop_selected', $event)"
          />
          <Account
            v-else
            :user="validatedContext.user"
            :is-admin="validatedContext.user.isSuperAdmin"
            :onboarding-link="validatedContext.onboardingLink"
            :admin-email="validatedContext.superAdminEmail"
            :resend-email-link="validatedContext.ssoResendVerificationEmail"
            :manage-account-link="validatedContext.manageAccountLink"
            @viewed="eventCallback"
            @actioned="eventCallback"
            class="mb-2"
          >
            <slot name="account-footer" />
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
  </div>
</template>

<script>
  import AccountNotEnabled from '@/components/alert/AccountNotEnabled';
  import AccountNotInstalled from '@/components/alert/AccountNotInstalled';
  import MultiStoreSelector from '@/components/alert/MultiStoreSelector';
  import Account from '@/components/panel/Account';
  import context from '@/lib/ContextWrapper';
  import Locale from '@/mixins/locale';
  import {BAlert, BOverlay} from 'bootstrap-vue';
  import {contextSchema} from '../lib/ContextValidator';
  import 'bootstrap-vue/dist/bootstrap-vue.css';

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
    },
    data() {
      return {
        validationErrors: [],
        validatedContext: this.context,
        installLoading: false,
        enableLoading: false,
        hasError: false,
        panelShown: null,
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
        this.eventCallback('install_ps_accounts');

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
        this.eventCallback('enable_ps_accounts');

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
      viewingPanel() {
        const previousPanel = this.panelShown;

        if (!this.psAccountsIsInstalled) {
          this.panelShown = 'ps_accounts_not_installed';
        } else if (!this.psAccountsIsEnabled) {
          this.panelShown = 'ps_accounts_not_enabled';
        } else if (this.validatedContext && !this.validatedContext.currentShop) {
          this.panelShown = 'multistore_selector';
        } else {
          this.panelShown = 'account';
        }

        if (this.panelShown && (previousPanel !== this.panelShown)) {
          // Need to make call async in order to let callbacks ready.
          setTimeout(this.$emit.bind(this, 'viewed', this.panelShown), 100);
        }
      },
      eventCallback(eventType, event) {
        switch (eventType) {
          case 'install_ps_accounts':
          case 'enable_ps_accounts':
          case 'multi_shop_selected':
          case 'manage_account_link':
          case 'sign_in':
          case 'sign_out':
          case 'plan_selected':
            /**
             * Emitted when user action occurred on a panel.
             * @type {Event}
             */
            this.$emit('actioned', eventType, event);
            break;
          case 'user_not_admin':
          case 'user_not_connected':
          case 'user_connected_not_validated':
          case 'user_connected':
            /**
             * Emitted when a specific panel is shown.
             * @type {Event}
             */
            this.$emit('viewed', eventType, event);
            break;
          default:
            console.error('Unknown callback event type.');  // eslint-disable-line
        }
      },
      alert(t) {
        alert(t);  // eslint-disable-line
      },
    },
    created() {
      this.validateContext();
    },
    mounted() {
      this.viewingPanel();
    },
    updated() {
      this.viewingPanel();
    },
    watch: {
      context() {
        this.validateContext();
      },
    },
  };
</script>
