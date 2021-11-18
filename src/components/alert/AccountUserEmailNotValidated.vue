<template>
  <b-alert
    variant="warning"
    show
  >
    <div v-html="$t('psaccounts.account.emailNotVerified')" />

    <div class="mt-2 d-flex justify-content-end">
      <b-button
        variant="primary"
        @click="sendEmailConfirmation()"
      >
        {{ $t('psaccounts.account.sendEmail') }}
      </b-button>
    </div>
  </b-alert>
</template>

<script>
  import i18n from '@/locale';
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
    i18n,
    components: {
      BAlert,
      BButton,
    },
    props: {
      ssoResendVerificationEmail: {
        type: String,
        required: true,
      },
    },
    methods: {
      sendEmailConfirmation() {
        this.$tracking.track('[ACC] Link Resend Email Validation Clicked');

        window.open(this.ssoResendVerificationEmail, '_blank');
      },
    },
  };
</script>
