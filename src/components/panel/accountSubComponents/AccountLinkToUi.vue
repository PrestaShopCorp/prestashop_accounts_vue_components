<template>
  <div class="align-self-center">
    <b-button
      class="float-right"
      :disabled="!validatedContext.user.isSuperAdmin"
      variant="primary"
      @click="openLinkShopModal()"
    >
      {{ t(`psaccounts.account.${userIsConnected ? 'manageAccountTooltip' : 'connectButton'}`) }}
    </b-button>
    <link-shop-modal
      v-if="cdcUiDisplayed"
      @closed="closeOnBoarding"
      :shop="validatedContext.currentShop"
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
        return this.validatedContext.user.email ? '/shop' : '';
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
