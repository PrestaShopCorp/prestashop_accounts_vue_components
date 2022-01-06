<template>
  <b-alert
    variant="info"
    show
  >
    <div v-html="t('psaccounts.account.moduleUpdateInformation')" />
  </b-alert>
</template>

<script>
  import {
    BAlert,
  } from 'bootstrap-vue';
  import Locale from '@/mixins/locale';

  /**
   * This alert shows a message if the user is already onboard in v4
   * and tell him to reonboard with the same email address and
   * update other modules;
   */
  export default {
    name: 'ModuleUpdatedInformation',
    mixins: [Locale],
    components: {
      BAlert,
    },
  };
</script>
