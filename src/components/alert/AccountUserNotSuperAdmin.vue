<template>
  <b-alert
    variant="warning"
    class="mt-4"
    show
  >
    <p>{{ t('psaccounts.account.needToBeAdmin') }}</p>
    <p v-if="validatedContext.superAdminEmail">
      {{ t('psaccounts.account.pleaseContact') }}
      <a
        @click="trackClick"
        :href="'mailto:' + validatedContext.superAdminEmail"
      >
        {{ validatedContext.superAdminEmail }}
      </a>
    </p>
  </b-alert>
</template>

<script>
  import Locale from '@/mixins/locale';
  import useSegmentTracking from '@/composables/useSegmentTracking';
  import {
    BAlert,
  } from 'bootstrap-vue';

  /**
   * This sub-component shows a message is the user is not a super-admin
   * and tell him to contact one to continue the process
   */
  export default {
    name: 'AccountUserNotSuperAdmin',
    mixins: [Locale],
    components: {
      BAlert,
    },
    props: {
      validatedContext: {
        type: Object,
        required: true,
      },
    },
    setup() {
      const {trackLinkContactAdmin} = useSegmentTracking();

      return {trackLinkContactAdmin};
    },
    methods: {
      trackClick() {
        this.trackLinkContactAdmin();
      },
    },
  };
</script>
