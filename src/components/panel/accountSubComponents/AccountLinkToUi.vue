<template>
  <div class="align-self-center">
    <b-button
      id="associate-shop-button"
      class="float-right"
      v-if="shopIsNotLinked || shopIsLinkedAndUserIsTheSame"
      :disabled="!validatedContext.user.isSuperAdmin"
      variant="primary"
      @click="openLinkShopModal()"
    >
      {{ btnText }}
    </b-button>
    <link-shop-modal
      v-if="cdcUiDisplayed"
      @closed="closeOnBoarding"
      :shop="shopToLinkPayload"
      :specific-ui-url="specificUiUrl"
      :on-boarding-link="validatedContext.onboardingLink"
      :accounts-ui-url="validatedContext.accountsUiUrl"
    />
  </div>
</template>

<script>
  import Locale from '@/mixins/locale';
  import useSegmentTracking from '@/composables/useSegmentTracking';
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
    setup() {
      const {trackAssociateOrManageAccountButton} = useSegmentTracking();

      return {trackAssociateOrManageAccountButton};
    },
    computed: {
      action() {
        if (this.validatedContext.isOnboardedV4 === true) {
          return 'reonboard';
        }

        if (!this.userIsConnected) {
          return 'associate';
        }

        return 'manageAccount';
      },
      specificUiUrl() {
        return this.validatedContext.user.email && !this.validatedContext.isOnboardedV4 ? '/shop' : '';
      },
      shopIsNotLinked() {
        return this.validatedContext.currentShop.employeeId === null;
      },
      shopIsLinkedAndUserIsTheSame() {
        return parseInt(this.validatedContext.currentShop.employeeId, 10)
          === this.validatedContext.backendUser.employeeId;
      },
      btnText() {
        return this.t(`psaccounts.account.${BUTTON_I18N_KEY[this.action]}`);
      },
      shopToLinkPayload() {
        return {
          ...this.validatedContext.currentShop,
          employeeId: this.validatedContext.backendUser.employeeId.toString(),
        };
      },
    },
    data() {
      return {
        cdcUiDisplayed: false,
      };
    },
    methods: {
      openLinkShopModal() {
        this.trackAssociateOrManageAccountButton();

        this.cdcUiDisplayed = true;
      },
      closeOnBoarding() {
        this.cdcUiDisplayed = false;
        window.location.reload();
      },
    },
  };
</script>
