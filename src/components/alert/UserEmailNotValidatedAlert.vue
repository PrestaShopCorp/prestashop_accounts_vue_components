<template>
  <BaseAlert variant="warning">
    <p class="acc-m-0 acc-p-0 acc-text-sm acc-leading-6">
      {{$t('psaccounts.account.emailNotVerified')}}
    </p>

    <div class="acc-mt-4">
      <BaseButton @click="sendEmailConfirmation">
        {{ $t('psaccounts.account.sendEmail') }}
      </BaseButton>
    </div>
  </BaseAlert>
</template>

<script lang="ts">
import {defineComponent} from 'vue-demi';
import BaseAlert from './BaseAlert.vue';
import BaseButton from '@/components/BaseButton.vue';
import useSegmentTracking from '@/composables/useSegmentTracking';

/**
   * This component shows a warning alert if the user email is not validated
   * and tell him to validate his account.
   */
export default defineComponent({
  name: 'UserEmailNotValidatedAlert',
  components: {
    BaseAlert,
    BaseButton,
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
    const {trackLinkResendEmailValidation} = useSegmentTracking();

    function sendEmailConfirmation() {
      trackLinkResendEmailValidation();

      window.open(props.ssoResendVerificationEmail, '_blank');
    }

    return {sendEmailConfirmation};
  },
});
</script>
