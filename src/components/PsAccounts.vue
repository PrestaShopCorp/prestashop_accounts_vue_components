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
        v-if="!validatedContext.psAccountsIsInstalled"
        :account-is-installed="validatedContext.psAccountsIsInstalled"
        :is-loading="installLoading"
        @install="installPsAccounts()"
      />
      <template v-else>
        <AccountNotEnabled
          v-if="!validatedContext.psAccountsIsEnabled"
          :account-is-enabled="validatedContext.psAccountsIsEnabled"
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
            class="mb-2"
          />
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

  /**
   * `PsAccounts` will automate pre-requisites checks and will call sub-components directly
   * to ensure each functional case is covered for you. You can use 2 slots: `v-slot:body`,
   * that will be disabled if the user account is not well linked (you should put your
   * module configuration panel here), and a special `v-slot:customBody` that will always be
   * displayed (you have to manage display condition by yourself).
   */
  export default {
    name: 'PsAccount',
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
       * [by prestashop\_accounts\_auth library presenter function](http://perdu.com).
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
    },
    data() {
      return {
        validationErrors: [],
        validatedContext: this.context,
        installLoading: false,
        enableLoading: false,
        hasError: false,
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

        // if on ps before 1.7.3 just reload the page
        if (!this.validatedContext.psIs17) {
          window.location.href = this.validatedContext.psAccountsInstallLink;
        }

        this.installLoading = true;

        fetch(this.validatedContext.psAccountsInstallLink, {
          method: 'POST',
        }).then((response) => response.json(),
        ).then((data) => {
          if (data.ps_accounts.status === false) {
            throw new Error('Cannot install ps_accounts module.');
          }

          this.validatedContext.psAccountsIsInstalled = true;
          this.validatedContext.psAccountsIsEnabled = true;
          this.installLoading = false;
        }).catch(() => {
          this.installLoading = false;
          this.hasError = true;
        });
      },
      enablePsAccounts() {
        // clean errors before retry
        this.hasError = false;

        // if on ps before 1.7.3 just reload the page
        if (!this.validatedContext.psIs17) {
          window.location.href = this.validatedContext.psAccountsInstallLink;
        }

        this.enableLoading = true;

        fetch(this.validateContext.psAccountsEnableLink, {
          method: 'POST',
        }).then((response) => response.json(),
        ).then((data) => {
          if (data.ps_accounts.status === false) {
            throw new Error('Cannot enable ps_accounts module.');
          }

          this.validatedContext.psAccountsIsEnabled = true;
          this.enableLoading = false;
        }).catch(() => {
          this.enableLoading = false;
          this.hasError = true;
        });
      },
    },
    created() {
      this.validateContext();
    },
    watch: {
      context() {
        this.validateContext();
      },
    },
  };
</script>
