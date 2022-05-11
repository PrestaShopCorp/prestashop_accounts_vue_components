<template>
  <BaseAlert variant="info">
    <p
      v-html="$t('psaccounts.account.moduleUpdateInformation')"
      class="acc-m-0 acc-p-0 acc-text-sm acc-leading-6" />
  </BaseAlert>
</template>

<script lang="ts">
import {defineComponent} from 'vue-demi';
import BaseAlert from './BaseAlert.vue';

/**
   * When a v4 onboarded user updates the ps accounts module on v5,
   * an information alert informs the user to reonboard
   * with the same email and update other modules.
   */
export default defineComponent({
  name: 'ModuleUpdateInformationAlert',
  components: {
    BaseAlert,
  },
});
</script>
