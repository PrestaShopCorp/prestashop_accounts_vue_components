<template>
  <BaseAlert variant="warning">
    <h3>{{ title }}</h3>
    <p>{{ message }}</p>
    <p class="mt-2">
      <BaseButton
        v-if="!loading"
        variant="primary"
        @click="$emit('action')"
      >
        {{ actionText }}
      </BaseButton>
      <strong v-else>
        <u>{{ loadingText }}</u>
      </strong>
    </p>
  </BaseAlert>
</template>

<script lang="ts">
import {defineComponent} from '@vue/composition-api';
import i18n from '@/i18n';
import BaseAlert from './BaseAlert.vue';
import BaseButton from '@/components/BaseButton.vue';

/**
 * This component is used to display warning alert telling the PSAccounts module or
 * any dependant module requires an action (enable, install or update).
 */
export default defineComponent({
  name: 'ModuleAlert',
  i18n,
  components: {
    BaseAlert,
    BaseButton,
  },
  props: {
    actionText: {
      type: String,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
    },
    loadingText: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
});
</script>
