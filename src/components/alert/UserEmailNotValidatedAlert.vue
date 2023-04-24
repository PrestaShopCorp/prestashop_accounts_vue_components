<template>
  <puik-alert
    :title="$t('psaccounts.account.emailNotVerified.title')"
    :button-label="$t('psaccounts.account.sendEmail')"
    variant="warning"
    @click="sendEmailConfirmation"
  >
    <p class="acc-m-0 acc-p-0">
      {{ $t('psaccounts.account.emailNotVerified.description') }}
    </p>
  </puik-alert>
</template>

<script setup lang="ts">
/**
   * This component shows a warning alert if the user email is not validated
   * and tell him to validate his account.
   */

interface UserEmailNotValidatedAlertProps {
  /**
  * URL used for activating PrestaShop Accounts
  * (should be https://auth.prestashop.com/account/send-verification-email)
  */
  ssoResendVerificationEmail: string;
}

const props = defineProps<UserEmailNotValidatedAlertProps>();

const sendEmailConfirmation = () => {
  window.open(props.ssoResendVerificationEmail, '_blank');
};
</script>
