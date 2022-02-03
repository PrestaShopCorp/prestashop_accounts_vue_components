<template>
  <BaseAlert variant="warning">
    <div v-html="$t('psaccounts.account.emailNotVerified')" />

    <div class="mt-2 d-flex justify-content-end">
      <BaseButton
        variant="primary"
        @click="sendEmailConfirmation"
      >
        {{ $t('psaccounts.account.sendEmail') }}
      </BaseButton>
    </div>
  </BaseAlert>
</template>

<script lang="ts">
import {defineComponent} from '@vue/composition-api';
import i18n from '@/i18n';
import BaseAlert from './BaseAlert.vue';
import BaseButton from '@/components/BaseButton.vue';
import useSegmentTracking from '@/composables/useSegmentTracking';

/**
   * This alert shows a message if the user email is not validated
   * and tell him to validate his account;
   */
export default defineComponent({
  name: 'UserEmailNotValidatedAlert',
  i18n,
  components: {
    BaseAlert,
    BaseButton,
  },
  props: {
    /**
         * URL used for activating PrestaShop Accounts<br />
         * should be https://auth.prestashop.com/account/send-verification-email
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
