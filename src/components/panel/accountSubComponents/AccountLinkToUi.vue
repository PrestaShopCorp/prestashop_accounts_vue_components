<template>
  <div class="align-self-center">
    <b-button
      class="float-right"
      v-if="shopIsNotLinked || shopIsLinkedAndUserIsTheSame"
      :disabled="!validatedContext.user.isSuperAdmin"
      variant="primary"
      @click="openLinkShopModal()"
    >
      {{ t(`psaccounts.account.${getLinkMessage}`) }}
    </b-button>
    <link-shop-modal
      v-if="cdcUiDisplayed"
      @closed="closeOnBoarding"
      :shop="shopToLinkPayload"
      :specific-ui-url="getSpecificUiUrl"
      :on-boarding-link="validatedContext.onboardingLink"
    />
  </div>
</template>

<script>
  import Locale from '@/mixins/locale';
  import {
    BButton,
  } from 'bootstrap-vue';
  import LinkShopModal from '@/components/crossdomains/LinkShopModal';

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
      getSpecificUiUrl() {
        return this.validatedContext.user.email && !this.validatedContext.isOnboardedV4 ? '/shop' : '';
      },
      shopIsNotLinked() {
        return this.validatedContext.currentShop.employeeId === null;
      },
      shopIsLinkedAndUserIsTheSame() {
        return parseInt(this.validatedContext.currentShop.employeeId, 10)
          === this.validatedContext.employeeId;
      },
      getLinkMessage() {
        if (this.validatedContext.isOnboardedV4 === true) {
          return 'reonboardButton';
        }
        if (this.userIsConnected) {
          return 'manageAccountTooltip';
        }
        return 'connectButton';
      },
      shopToLinkPayload() {
        return {
          ...this.validatedContext.currentShop,
          employeeId: this.validatedContext.employeeId.toString(),
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
        this.$segment.track('ACC Click BO Connect button', {
          category: 'Accounts',
        });
        this.cdcUiDisplayed = true;
      },
      closeOnBoarding() {
        this.cdcUiDisplayed = false;
        window.location.reload();
      },
    },
  };
</script>
