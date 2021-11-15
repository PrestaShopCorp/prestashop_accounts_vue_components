<template>
  <b-alert
    variant="warning"
    show
  >
    <div v-html="t('psaccounts.account.emailNotVerified')" />

    <div class="mt-2 d-flex justify-content-end">
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
  import useSegmentTracking from '@/composables/useSegmentTracking';
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
      ssoResendVerificationEmail: {
        type: String,
        required: true,
      },
    },
    setup() {
      const {trackLinkResendEmailValidation} = useSegmentTracking();

      return {trackLinkResendEmailValidation};
    },
    methods: {
      sendEmailConfirmation() {
        this.trackLinkResendEmailValidation();

        window.open(this.ssoResendVerificationEmail, '_blank');
      },
    },
  };
</script>
