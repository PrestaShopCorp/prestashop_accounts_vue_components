<template>
  <BaseAlert
    variant="warning"
    class="mt-4"
  >
    <p>{{ t('psaccounts.account.needToBeAdmin') }}</p>
    <p>
      {{ t('psaccounts.account.pleaseContact') }}
      <a
        @click="trackLinkContactAdmin"
        :href="'mailto:' + superAdminEmail"
      >
        {{ superAdminEmail }}
      </a>
    </p>
  </BaseAlert>
</template>

<script lang="ts">
import {defineComponent} from '@vue/composition-api';
import BaseAlert from './BaseAlert.vue';
import Locale from '@/mixins/locale';
import useSegmentTracking from '@/composables/useSegmentTracking';

/**
   * This sub-component shows a message is the user is not a super-admin
   * and tell him to contact one to continue the process
   */
export default defineComponent({
  name: 'UserNotSuperAdminAlert',
  mixins: [Locale],
  components: {
    BaseAlert,
  },
  props: {
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
