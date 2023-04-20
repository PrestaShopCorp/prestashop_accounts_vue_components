<template>
  <BaseAlert
      :title="$t('psaccounts.account.emailNotVerified.title')"
      :button-label="$t('psaccounts.account.sendEmail')"
      :variant="Variant.Warning"
      @clicked="sendEmailConfirmation"
  >
    <p class="acc-m-0 acc-p-0">{{$t('psaccounts.account.emailNotVerified.description')}}</p>
  </BaseAlert>
</template>

<script setup lang="ts">
/**
   * This component shows a warning alert if the user email is not validated
   * and tell him to validate his account.
   */
import BaseAlert, { Variant } from './BaseAlert.vue';

interface UserEmailNotValidatedAlertProps {
  ssoResendVerificationEmail: string;
}

const props = defineProps<UserEmailNotValidatedAlertProps>()

const sendEmailConfirmation = () => {
  window.open(props.ssoResendVerificationEmail, '_blank');
}
</script>
