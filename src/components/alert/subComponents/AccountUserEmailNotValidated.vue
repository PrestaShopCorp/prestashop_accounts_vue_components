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
   * This alert shows a message is the user email is not validated
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
      resendEmailLink: {
        type: String,
        required: true,
        default: undefined,
      },
    },
    methods: {
      sendEmailConfirmation() {
        this.$segment.track('ACC Click resend verification email', {
          category: 'Accounts',
        });

        if (this.resendEmailLink) {
          window.open(this.resendEmailLink, '_blank');
        }
      },
    },
  };
</script>
