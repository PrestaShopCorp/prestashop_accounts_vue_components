<template>
  <BaseAlert variant="warning">
    <p class="acc-m-0 acc-p-0 acc-text-sm acc-leading-6">
      {{ $t('psaccounts.account.needToBeAdmin') }}
    </p>
    <p class="acc-m-0 acc-p-0 acc-text-sm acc-leading-6">
      {{ $t('psaccounts.account.pleaseContact') }}
      <a
        @click="trackLinkContactAdmin"
        :href="'mailto:' + superAdminEmail"
        class="acc-font-semibold acc-text-gray-800 acc-underline hover:acc-text-gray-600">
        {{ superAdminEmail }}
      </a>
    </p>
  </BaseAlert>
</template>

<script lang="ts">
import {defineComponent} from '@vue/composition-api';
import i18n from '@/i18n';
import BaseAlert from './BaseAlert.vue';
import useSegmentTracking from '@/composables/useSegmentTracking';

/**
 * This component shows a warning alert isfthe user is not a superadmin
 * and tell him to contact one to continue the process.
 */
export default defineComponent({
  name: 'UserNotSuperAdminAlert',
  i18n,
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
  setup() {
    const {trackLinkContactAdmin} = useSegmentTracking();

    return {trackLinkContactAdmin};
  },
});
</script>
