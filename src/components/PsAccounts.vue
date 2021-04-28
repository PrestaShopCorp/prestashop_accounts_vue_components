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
      <AlertDisplay
        :validated-context="validatedContext"
        @hasError="hasError = true"
      />

      <template v-if="!hasBlockingAlert">
        <Account
          :user="validatedContext.user"
          :is-admin="validatedContext.user.isSuperAdmin"
          :onboarding-link="validatedContext.onboardingLink"
          :admin-email="validatedContext.superAdminEmail"
          :resend-email-link="validatedContext.ssoResendVerificationEmail"
          :manage-account-link="validatedContext.manageAccountLink"
          @viewed="eventCallback"
          @actioned="eventCallback"
          @unlinkShop="validatedContext.user.email = null"
          @signIn="modalDisplayed = !modalDisplayed"
          class="mb-2"
        >
          <slot
            v-if="userIsConnected"
            name="account-footer"
          />
        </Account>
        <link-shop-modal
          v-if="modalDisplayed"
          @closed="closeOnBoarding"
          :displayed="modalDisplayed"
          :shop="validatedContext.currentShop"
          :is-linked="!!validatedContext.user.email"
          :on-boarding-link="validatedContext.onboardingLink"
        />
        <link-shops-modal
          v-if="multishopModalDisplayed"
          @closed="closeOnBoarding"
          :displayed="multishopModalDisplayed"
          shops="getSelectedShops"
        />
        <b-overlay
          :show="!userIsConnected"
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
  import AlertDisplay from '@/components/alert/AlertDisplay';
  import Account from '@/components/panel/Account';
  import context from '@/lib/ContextWrapper';
  import Locale from '@/mixins/locale';
  import {BAlert, BOverlay} from 'bootstrap-vue';
  import LinkShopModal from '@/components/crossdomains/LinkShopModal';
  import LinkShopsModal from '@/components/crossdomains/LinkShopsModal';
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
      AlertDisplay,
      Account,
      BOverlay,
      BAlert,
      LinkShopModal,
      LinkShopsModal,
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
      userIsConnected() {
        return this.validatedContext.user.email !== null;
      },
      hasBlockingAlert() {
        return !this.validatedContext.psAccountsIsInstalled
          || !this.validatedContext.psAccountsIsUptodate
          || !this.validatedContext.psAccountsIsEnabled;
      },
      getSelectedShops() {
        return [...this.validatedContext.shops.map(
          (shopGroup) => shopGroup.shops.filter(
            (shop) => this.multishopSelected.indexOf(shop.id) !== -1,
          ),
        )];
      },
      isShopContext() {
        return this.validatedContext.isShopContext;
      },
    },
    data() {
      return {
        validationErrors: [],
        validatedContext: this.context,
        modalDisplayed: false,
        multishopModalDisplayed: false,
        multishopSelected: [],
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
      psAccountsIsMultishopActive() {
        return this.validatedContext.shops && this.validatedContext.shops.length;
      },
      eventCallback(eventType, event) {
        this.$emit('accountsEvent', eventType, event);
      },
      closeOnBoarding() {
        this.modalDisplayed = false;
        this.multishopModalDisplayed = false;
        window.location.reload();
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
<style>

</style>
