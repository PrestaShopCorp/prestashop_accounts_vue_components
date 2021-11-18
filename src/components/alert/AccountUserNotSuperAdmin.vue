<template>
  <b-alert
    variant="warning"
    class="mt-4"
    show
  >
    <p>{{ t('psaccounts.account.needToBeAdmin') }}</p>
    <p>
      {{ t('psaccounts.account.pleaseContact') }}
      <a
        @click="trackClick"
        :href="'mailto:' + superAdminEmail"
      >
        {{ superAdminEmail }}
      </a>
    </p>
  </b-alert>
</template>

<script>
  import Locale from '@/mixins/locale';
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
      superAdminEmail: {
        type: String,
        required: true,
      },
    },
    methods: {
      trackClick() {
        this.$tracking.track('[ACC] Link Contact Admin Clicked');
      },
    },
  };
</script>
