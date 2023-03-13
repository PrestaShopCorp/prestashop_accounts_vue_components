<template>
  <BaseAlert
      :title="$t('psaccounts.account.emailNotVerified.title')"
      :button-label="$t('psaccounts.account.sendEmail')"
      variant="warning"
      @clicked="sendEmailConfirmation"
  >
    <p class="acc-m-0 acc-p-0">{{$t('psaccounts.account.emailNotVerified.description')}}</p>
  </BaseAlert>
</template>

<script lang="ts">
import {defineComponent} from 'vue-demi';
import BaseAlert from './BaseAlert.vue';

/**
   * This component shows a warning alert if the user email is not validated
   * and tell him to validate his account.
   */
export default defineComponent({
  name: 'UserEmailNotValidatedAlert',
  components: {
    BaseAlert,
  },
  props: {
    /**
     * URL used for activating PrestaShop Accounts
     * (should be https://auth.prestashop.com/account/send-verification-email)
     */
    ssoResendVerificationEmail: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    function sendEmailConfirmation() {
      window.open(props.ssoResendVerificationEmail, '_blank');
    }

    return {sendEmailConfirmation};
  },
});
</script>
