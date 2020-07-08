<template>
  <div>
    <div
      v-if="showActivePlan"
      class="mt-3 p-2 pr-3 section"
    >
      <b-button
        v-if="showUpgradeButton"
        class="float-right upgrade-button"
        variant="primary"
        @click="upgradePlan()"
      >
        {{ t('billing.billing.upgradePlanButton') }}
      </b-button>
      <b-link
        v-else
        class="float-right see-plans-link"
        variant="primary"
        @click="upgradePlan()"
      >
        {{ t('billing.billing.upgradePlanLink') }}
      </b-link>
      <h4 class="gray-title">
        {{ t('billing.billing.currentPlan') }}
      </h4>
      <span class="plan-name">{{ billing.currentPlan.name }}</span>{{ currentPlanPriceFormatted }}
      <div
        v-if="nextInvoicingDate"
        class="next-invoice-date"
      >
        {{ t('billing.billing.nextInvoicingDate') }} &nbsp;{{ nextInvoicingDate }}
      </div>
    </div>

    <div
      v-if="showPaymentMethod"
      class="mt-2 p-2 pr-3 section"
    >
      <b-link
        class="float-right edit-link"
        @click="editPaymentMethod()"
      >
        <b-icon-pencil />
        &nbsp;{{ t('billing.billing.editPaymentMethod') }}
      </b-link>
      <h4 class="gray-title">
        {{ t('billing.billing.paymentMethod') }}
      </h4>

      <template v-if="billing.paymentMethod">
        <span class="card-type">
          <img
            height="16"
            width="24"
            v-if="billing.paymentMethod.cardType == 'amex'"
            :src="amexIcon"
            :alt="billing.paymentMethod.cardType"
          >
          <img
            height="16"
            width="24"
            v-else-if="billing.paymentMethod.cardType == 'mastercard'"
            :src="mastercardIcon"
            :alt="billing.paymentMethod.cardType"
          >
          <img
            height="16"
            width="24"
            v-else-if="billing.paymentMethod.cardType == 'visa'"
            :src="visaIcon"
            :alt="billing.paymentMethod.cardType"
          >
          <b-icon-credit-card v-else />
          {{ billing.paymentMethod.cardType }}
        </span>
        <span v-if="billing.paymentMethod.lastFourNumbers">
          •••• {{ billing.paymentMethod.lastFourNumbers }}
        </span>
        <span class="card-expiry">
          {{ t('billing.billing.expires') }}
          {{ billing.paymentMethod.expiry }}
        </span>
      </template>

      <template v-else>
        {{ t('billing.billing.noPaymentMethod') }}
      </template>
    </div>

    <div
      v-if="showAddress"
      class="mt-2 p-2 pr-3 section"
    >
      <b-link
        class="float-right edit-link"
        @click="editAddress()"
      >
        <b-icon-pencil />
        &nbsp;{{ t('billing.billing.editAddress') }}
      </b-link>
      <h4 class="gray-title">
        {{ t('billing.billing.address') }}
      </h4>
      <span v-html="(billing && billing.address) || t('psaccounts.billing.noAddress')" />
    </div>
  </div>
</template>

<script>
  import Locale from '@/mixins/locale';
  import {
    BButton,
    BLink,
    BIconPencil,
    BIconCreditCard,
  } from 'bootstrap-vue';

  const formatDate = (ts) => new Date(ts).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });

  const formatPrice = (price, periodicity, t) => {
    const amount = Number(price.taxIncluded / 100);
    const period = t(`billing.billing.periodicity.${periodicity}`);
    const fullPrice = t('billing.priceFormat', {currency: price.currency, amount: amount.toFixed(2)});
    return `${fullPrice} / ${period}`;
  };

  /**
   * This sub-component can be used in a custom integration when the `PsAccounts`
   * component does not meets special needs. This part will display a block to
   * show the current plan subscribed by the shop account, if any.
   */
  export default {
    name: 'Billing',
    mixins: [Locale],
    components: {
      BButton,
      BLink,
      BIconPencil,
      BIconCreditCard,
    },
    props: {
      /**
       * The billing object, generated
       * [by prestashop\_accounts\_auth library presenter function](https://github.com/PrestaShopCorp/prestashop_accounts_auth#usage).
       */
      billing: {
        type: Object,
        required: true,
      },
    },
    data: () => ({
      amexIcon: 'data:image/jpeg;base64,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',
      mastercardIcon: 'data:image/jpeg;base64,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',
      visaIcon: 'data:image/jpeg;base64,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',
    }),
    methods: {
      upgradePlan() {
        /**
         * Emitted when the user click to display available plans.
         * @type {Event}
         */
        this.$emit('upgrade-plan');
      },
      editPaymentMethod() {
        /**
         * Emitted when the user want to edit its payment method (credit card).
         * @type {Event}
         */
        this.$emit('edit-payment-method');
      },
      editAddress() {
        /**
         * Emitted when the user want to edit its Billing address.
         * @type {Event}
         */
        this.$emit('edit-address');
      },
    },
    computed: {
      showActivePlan() {
        if (!this.billing || !this.billing.currentPlan) {
          return false;
        }
        const cp = this.billing.currentPlan;
        return cp.id && cp.name && cp.level;
      },
      showPaymentMethod() {
        if (!this.showActivePlan || !this.billing.paymentMethod) {
          return false;
        }
        const cp = this.billing.currentPlan;
        return cp.price && cp.price.taxIncluded && (cp.price.taxIncluded > 0);
      },
      showAddress() {
        return this.showPaymentMethod;
      },
      showUpgradeButton() {
        if (!this.showActivePlan || !this.billing.plans || !(this.billing.plans.length > 0)) {
          return false;
        }
        const cp = this.billing.currentPlan;
        return !!(this.billing.plans.find(
          (p) => (p.level > cp.level && p.price && p.price.taxIncluded > 0),
        ));
      },
      nextInvoicingDate() {
        if (!this.billing || !this.billing.currentPlan) {
          return false;
        }
        const cp = this.billing.currentPlan;

        return cp && cp.nextPeriodStartDate && formatDate(cp.nextPeriodStartDate * 1000);
      },
      currentPlanPriceFormatted() {
        const cp = this.billing.currentPlan;
        if (!cp || !cp.price || !cp.price.taxIncluded || cp.price.taxIncluded === 0) {
          return this.t('billing.billing.priceFree');
        }
        return formatPrice(cp.price, cp.periodicity, this.t);
      },
    },
    watch: {

    },
  };
</script>

<style scoped>
  .section {
   background-color: rgba(0,0,0,.03);
  }

  .gray-title {
    color: #6C868E;
    font-weight: normal;
    text-transform: uppercase;
    margin-bottom: 0.2em;
  }

  .plan-name {
    font-weight: bold;
    padding-right: 1em;
  }

  .next-invoice-date {
    font-size: smaller;
  }

  .upgrade-button {
    margin-top: 0.2rem;
    margin-left: 2rem;
  }

  .see-plans-link {
    font-weight: bold;
    margin-top: 1.3em;
    margin-left: 2em;
  }

  .edit-link {
    margin-top: 0.7em;
    color: #6C868E;
    margin-left: 2em;
  }

  .card-type {
    margin-right: 0.5em;
    text-transform: capitalize;
  }

  .card-type img {
    border: 1px solid rgba(0,0,0,.2);
    border-radius: 3px;
  }

  .card-expiry {
    margin-left: 1em;
    font-size: smaller;
  }
</style>
