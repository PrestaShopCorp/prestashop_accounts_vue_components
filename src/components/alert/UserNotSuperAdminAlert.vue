<template>
  <BaseAlert variant="warning">
    <p class="acc-m-0 acc-p-0 acc-text-sm acc-leading-6">
      {{ $t('psaccounts.account.needToBeAdmin') }}
    </p>
    <p class="acc-m-0 acc-p-0 acc-text-sm acc-leading-6">
      {{ $t('psaccounts.account.pleaseContact') }}
      <a
        :href="'mailto:' + superAdminEmail"
        class="acc-font-semibold acc-text-grey-900 acc-underline hover:acc-text-grey-600">
        {{ superAdminEmail }}
      </a>
    </p>
  </BaseAlert>
</template>

<script lang="ts">
import {defineComponent} from 'vue-demi';
import BaseAlert from './BaseAlert.vue';

/**
 * This component shows a warning alert isfthe user is not a superadmin
 * and tell him to contact one to continue the process.
 */
export default defineComponent({
  name: 'UserNotSuperAdminAlert',
  components: {
    BaseAlert,
  },
  props: {
    /**
     * Super admin email
     */
    superAdminEmail: {
      type: String,
      required: true,
    },
  },
});
</script>
