<template>
  <div class="align-self-center">
    <b-button
      class="float-right"
      :disabled="
          !validatedContext.user.isSuperAdmin ||
          (!hasNotLinkedShopInContext && !currentUserHasLinkedShops)
      "
      variant="primary"
      @click="openLinkShopModal()"
    >
      {{ btnText }}
    </b-button>
    <link-shop-modal
      v-if="cdcUiDisplayed"
      @closed="closeOnBoarding"
      :shops="currentNotLinkedShopsWithEmployeeId"
      :specific-ui-url="specificUiUrl"
      :on-boarding-link="validatedContext.onboardingLink"
      :accounts-ui-url="validatedContext.accountsUiUrl"
    />
  </div>
</template>

<script>
  import Locale from '@/mixins/locale';
  import {
    BButton,
  } from 'bootstrap-vue';
  import LinkShopModal from '@/components/crossdomains/LinkShopModal';

  const BUTTON_I18N_KEY = {
    reonboard: 'reonboardButton',
    associate: 'connectButton',
    manageAccount: 'manageAccountButton',
  };

  export default {
    name: 'AccountLinkToUi',
    mixins: [Locale],
    components: {
      BButton,
      LinkShopModal,
    },
    props: {
      validatedContext: {
        type: Object,
        required: true,
      },
      userIsConnected: {
        type: Boolean,
        required: true,
      },
    },
    computed: {
      action() {
        if (this.validatedContext.isOnboardedV4 === true) {
          return 'reonboard';
        }

        if (this.hasNotLinkedShopInContext) {
          return 'associate';
        }

        return 'manageAccount';
      },
      specificUiUrl() {
        return !this.hasNotLinkedShopInContext && !this.validatedContext.isOnboardedV4 ? '/shop' : '';
      },
      currentUserHasLinkedShops() {
        return this.currentLinkedShops.some(
          (shop) => parseInt(shop.employeeId, 10) === this.validatedContext.backendUser.employeeId,
        );
      },
      btnText() {
        return this.t(`psaccounts.account.${BUTTON_I18N_KEY[this.action]}`);
      },
      currentShops() {
        if (this.validatedContext.currentContext.type === 4) { // All
          return this.validatedContext.shops.reduce(
            (acc, shopGroup) => [...acc, ...shopGroup.shops], [],
          );
        }

        if (this.validatedContext.currentContext.type === 2) { // Group
          return [
            ...this.validatedContext.shops.find(
              (shopGroup) => parseInt(shopGroup.id, 10) === this.validatedContext.currentContext.id,
            ).shops,
          ];
        }

        // Shop
        return [
          this.validatedContext.shops.reduce(
            (acc, shopGroup) => [...acc, ...shopGroup.shops], [],
          )
            .find(
              (shop) => parseInt(shop.id, 10) === this.validatedContext.currentContext.id,
            ),
        ];
      },
      currentLinkedShops() {
        return this.currentShops.filter((shop) => shop.uuid);
      },
      currentNotLinkedShops() {
        return this.currentShops.filter((shop) => !shop.uuid);
      },
      hasNotLinkedShopInContext() {
        return this.currentNotLinkedShops.length > 0;
      },
      currentNotLinkedShopsWithEmployeeId() {
        return this.currentNotLinkedShops.map((shop) => ({
          ...shop,
          employeeId: this.validatedContext.backendUser.employeeId.toString(),
        }));
      },
    },
    data() {
      return {
        cdcUiDisplayed: false,
      };
    },
    methods: {
      openLinkShopModal() {
        this.track();

        this.cdcUiDisplayed = true;
      },
      closeOnBoarding() {
        this.cdcUiDisplayed = false;
        window.location.reload();
      },
      track() {
        const eventName = ['reonboard', 'associate'].includes(this.action)
          ? '[ACC] Associate Button Clicked'
          : '[ACC] Manage Account Button Clicked';

        this.$segment.track(eventName, {
          shop_bo_id: this.validatedContext.currentShop.id,
          ps_module_from: this.validatedContext.psxName,
          v4_onboarded: this.validatedContext.isOnboardedV4,
          multishop_numbers: this.validatedContext.shops.length || 1,
        });
      },
    },
    watch: {
      cdcUiDisplayed: (cdcUiDisplayed) => {
        if (cdcUiDisplayed) {
          document.body.classList.add('ui-displayed');
          return;
        }

        document.body.classList.remove('ui-displayed');
      },
    },
  };
</script>

<style>
body.ui-displayed {
  overflow: hidden;
}
</style>
