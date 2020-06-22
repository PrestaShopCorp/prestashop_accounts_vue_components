<template>
  <div>
    <template v-if="validationErrors && validationErrors.length">
      <b-alert
        variant="danger"
        show
      >
        <p>
          &lt;PsAccounts&gt; integration: Given context is invalid: {{ validationErrors.join(';') }}
        </p>
      </b-alert>
    </template>
    <template v-else>
      <AccountNotInstalled
        v-if="!validatedContext.psAccountsIsInstalled"
        :account-is-installed="validatedContext.psAccountsIsInstalled"
      />
      <template v-else>
        <AccountNotEnabled
          v-if="!validatedContext.psAccountIsEnabled"
          :account-is-enabled="validatedContext.psAccountIsEnabled"
        />
        <template v-else>
          <MultiStoreSelector
            v-if="!validatedContext.currentShop"
            :shops="validatedContext.shops"
          />
          <Account v-else
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
        return this.validatedContext.user.email !== '' && this.validatedContext.user.emailIsValidated;
      },
    },
    data() {
      return {
        validationErrors: [],
        validatedContext: this.context,
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
