<template>
  <b-alert
    variant="warning"
    show
  >
    <div v-html="t('psaccounts.account.emailNotVerified')" />

    <div class="d-flex justify-content-end mt-2">
      <b-button
        variant="primary"
        @click="sendEmailConfirmation()"
      >
        {{ t('psaccounts.account.sendEmail') }}
      </b-button>
    </div>
  </b-alert>
</template>

<script>
  import Locale from '@/mixins/locale';
  import {
    BAlert,
    BButton,
  } from 'bootstrap-vue';

  /**
   * This alert shows a message if the user email is not validated
   * and tell him to validate his account;
   */
  export default {
    name: 'AccountUserEmailNotValidated',
    mixins: [Locale],
    components: {
      BAlert,
      BButton,
    },
    props: {
      validatedContext: {
        type: Object,
        required: true,
      },
    },
    methods: {
      sendEmailConfirmation() {
        this.$segment.track('[ACC] Link Resend Email Validation Clicked', {
          shop_bo_id: this.validatedContext.currentShop.id,
          ps_module_from: this.validatedContext.psxName,
          v4_onboarded: this.validatedContext.isOnboardedV4,
          multishop_numbers: this.validatedContext.shops.length || 1,
        });

        window.open(this.validatedContext.ssoResendVerificationEmail, '_blank');
      },
    },
  };
</script>
