<template>
  <div>
    <template v-if="validationErrors && validationErrors.length">
      <b-alert variant="danger" show>
        <p>&lt;PsAccounts&gt; integration: Given context is invalid: {{validationErrors.join(';')}}</p>
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
          <Account
            :user="validatedContext.user"
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
  import { BAlert, BOverlay } from 'bootstrap-vue';
  import { contextSchema } from '../lib/ContextValidator';

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
      context: {
        type: Object,
        required: false,
        default: () => context
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
        validatedContext : this.context,
      };
    },
    methods: {
      validateContext() {
        const { value, error } = contextSchema.validate(this.context); // validates but also fix when possible.
        this.validationErrors = [];
        this.validatedContext = value;

        if (error) {
          this.validationErrors = error.details.map(e => e.message);
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
    }
  };
</script>
