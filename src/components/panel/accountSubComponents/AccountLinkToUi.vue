<template>
  <div class="align-self-center">
    <b-button
      v-if="!userIsConnected"
      class="float-right"
      :disabled="!validatedContext.user.isSuperAdmin"
      variant="primary"
      @click="connectToUi()"
    >
      {{ t('psaccounts.account.connectButton') }}
    </b-button>
    <link-shop-modal
      v-if="cdcUiDisplayed"
      @closed="closeOnBoarding"
      :shop="validatedContext.currentShop"
      :is-linked="!!validatedContext.user.email"
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
    data() {
      return {
        cdcUiDisplayed: false,
      };
    },
    methods: {
      connectToUi() {
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
