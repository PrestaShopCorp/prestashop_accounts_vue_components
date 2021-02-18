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
        <AccountNotUpdated
          v-if="!psAccountsIsUptodate"
          :account-is-uptodate="psAccountsIsUptodate"
          :is-loading="installLoading"
          @install="updatePsAccounts()"
        />
        <template v-else>
          <AccountNotEnabled
            v-if="!psAccountsIsEnabled"
            :account-is-enabled="psAccountsIsEnabled"
            :is-loading="enableLoading"
            @enabled="enablePsAccounts()"
          />
          <template v-else>
            <EventBusNotInstalled
              v-if="undefined !== validatedContext.dependencies
                && !validatedContext.dependencies.ps_eventbus.isInstalled"
              :install-loading="installLoading"
              @installEventBus="installEventBus"
            />
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
              @unlinkShop="validatedContext.user.email = null"
              class="mb-2"
            >
              <slot
                v-if="userIsConnectedAndEmailIsValidated"
                name="account-footer"
              />
            </Account>
          </template>
        </template>
      </template>
      <b-overlay
        :show="!userIsConnectedAndEmailIsValidated"
        variant="white"
        spinner-type="null"
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
  import AccountNotUpdated from '@/components/alert/AccountNotUpdated';
  import MultiStoreSelector from '@/components/alert/MultiStoreSelector';
  import EventBusNotInstalled from '@/components/alert/EventBusNotInstalled';
  import Account from '@/components/panel/Account';
  import context from '@/lib/ContextWrapper';
  import Locale from '@/mixins/locale';
  import {BAlert, BOverlay} from 'bootstrap-vue';
  import {contextSchema} from '../lib/ContextValidator';
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
      AccountNotInstalled,
      AccountNotUpdated,
      AccountNotEnabled,
      MultiStoreSelector,
      Account,
      BOverlay,
      BAlert,
      EventBusNotInstalled,
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
        return this.validatedContext.psAccountsIsInstalled;
      },
      psAccountsIsUptodate() {
        return this.validatedContext.psAccountsIsUptodate;
      },
      psAccountsIsEnabled() {
        return this.validatedContext.psAccountsIsEnabled;
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

      manageModuleAction17(action) {
        return fetch(action.actionLink, {
          method: 'POST',
        }).then((response) => response.json(),
        ).then((json) => {
          if (json[action.module].status === false) {
            throw new Error(`Cannot ${action.action} ${action.module} module.`);
          }
          return json;
        });
      },

      async manageModuleAction16(action) {
        window.location.href = action.actionLink;
      },

      manageModuleAction(action) {
        // if on ps before 1.7.3 just reload the page
        if (!this.validatedContext.psIs17) {
          return this.manageModuleAction16(action);
        }
        return this.manageModuleAction17(action);
      },

      installModule(moduleName, actionLink) {
        this.hasError = false;
        this.installLoading = true;

        this.manageModuleAction({
          module: moduleName,
          action: 'install',
          actionLink,
        }).then(() => {
          window.location.reload();
        }).catch((err) => {
          console.log('installModule : ', err);
          this.installLoading = false;
          this.hasError = true;
        });
      },

      enableModule(moduleName, actionLink) {
        this.hasError = false;
        this.enableLoading = true;

        this.manageModuleAction({
          module: moduleName,
          action: 'enable',
          actionLink,
        }).then(() => {
          window.location.reload();
        }).catch(() => {
          this.enableLoading = false;
          this.hasError = true;
        });
      },

      updateModule(moduleName, actionLink) {
        this.hasError = false;
        this.installLoading = true;

        return this.manageModuleAction({
          module: moduleName,
          action: 'update',
          actionLink,
        }).then(() => {
          window.location.reload();
        }).catch(() => {
          this.installLoading = false;
          this.hasError = true;
        });
      },

      installPsAccounts() {
        this.eventCallback('install_ps_accounts');

        this.installModule(
          'ps_accounts',
          this.validatedContext.psAccountsInstallLink,
        );
      },

      installEventBus() {
        this.installModule(
          'ps_eventbus',
          this.validatedContext.dependencies.ps_eventbus.installLink,
        );
      },

      updatePsAccounts() {
        this.updateModule(
          'ps_accounts',
          this.validatedContext.psAccountsUpdateLink,
        );
      },

      enablePsAccounts() {
        this.eventCallback('enable_ps_accounts');

        this.enableModule(
          'ps_accounts',
          this.validatedContext.psAccountsEnableLink,
        );
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
<style>

</style>
