<template>
  <BaseAlert variant="info">
    <div v-html="t('psaccounts.account.moduleUpdateInformation')" />
  </BaseAlert>
</template>

<script lang="ts">
import {defineComponent} from '@vue/composition-api';
import BaseAlert from './BaseAlert.vue';
import Locale from '@/mixins/locale';

/**
   * This alert shows a message if the user is already onboard in v4
   * and tell him to reonboard with the same email address and
   * update other modules;
   */
export default defineComponent({
  name: 'ModuleUpdateInformationAlert',
  mixins: [Locale],
  components: {
    BaseAlert,
  },
});
</script>
