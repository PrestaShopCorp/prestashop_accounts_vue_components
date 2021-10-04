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
      <PsAccountComponentAlertDisplay
        :validated-context="validatedContext"
        @hasError="hasError = true"
      />

      <template v-if="!hasBlockingAlert">
        <Account
          :validated-context="validatedContext"
          class="mb-2"
        >
          <slot
            v-if="userIsConnected"
            name="account-footer"
          />
        </Account>
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
  import PsAccountComponentAlertDisplay from '@/components/alert/PsAccountComponentAlertDisplay';
  import Account from '@/components/panel/Account';
  import context from '@/lib/ContextWrapper';
  import Locale from '@/mixins/locale';
  import {BAlert, BOverlay} from 'bootstrap-vue';
  import useSegmentTracking from '@/composables/useSegmentTracking';
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
        default: () => context,
      },
    },
    setup(props) {
      const {identify, trackAccountComponentViewed} = useSegmentTracking(props.context);

      return {
        identify,
        trackAccountComponentViewed,
      };
    },
    computed: {
      userIsConnected() {
        return this.validatedContext.user.email !== null;
      },
      userIsSameAsCurrentShopuser() {
        const backendUserEmployeeId = this.validatedContext.backendUser.employeeId;
        const currentShopEmployeeId = parseInt(this.validatedContext.currentShop.employeeId, 10);

        return backendUserEmployeeId === currentShopEmployeeId;
      },
      userEmailIsValidated() {
        return this.validatedContext.user.emailIsValidated;
      },
      userLoggedHasEmailVerified() {
        return this.userIsConnected
          && this.userIsSameAsCurrentShopuser
          && this.userEmailIsValidated;
      },
      eventbusIsInstalled() {
        return undefined === this.validatedContext.dependencies
          || this.validatedContext.dependencies.ps_eventbus.isInstalled;
      },
      hasBlockingAlert() {
        return !this.validatedContext.psAccountsIsInstalled
          || !this.validatedContext.psAccountsIsUptodate
          || !this.validatedContext.psAccountsIsEnabled;
      },
      associatedShops() {
        return this.validatedContext.shops.reduce(
          (acc, shopGroups) => [...acc, ...shopGroups.shops.reduce((accShop, shop) => {
            if (!shop.uuid) {
              return accShop;
            }

            return [...accShop, shop];
          }, [])],
          []);
      },
      associatedShopsForTracking() {
        return this.associatedShops.reduce(
          (acc, shop) => [
            ...acc,
            {
              domain: shop.domain,
              domain_ssl: shop.domain_ssl,
              employeeId: shop.employeeId,
              id: shop.id,
              isLinkedV4: shop.isLinkedV4,
              name: shop.name,
              physicalUri: shop.physicalUri,
              uuid: shop.uuid,
            },
          ],
          [],
        );
      },
    },
    data() {
      return {
        validationErrors: [],
        validatedContext: this.context,
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
    },
    created() {
      this.validateContext();

      if (this.validatedContext.psAccountsIsInstalled) {
        this.identify();
        this.trackAccountComponentViewed();
      }
    },
  };
</script>
