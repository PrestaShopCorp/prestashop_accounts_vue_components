<template>
  <BaseAlert variant="warning">
    <h3 class="acc-m-0 acc-p-0 acc-text-base acc-font-bold">
      {{ title }}
      </h3>
    <p class="acc-m-0 acc-mt-2 acc-p-0 acc-text-sm">
      {{ message }}
    </p>
    <div class="acc-mt-4">
      <!--
        action event
        @event action
      -->
      <BaseButton
        v-if="!loading"
        @click="$emit('action')"
      >
        {{ actionText }}
      </BaseButton>
      <p v-else>
        <u>{{ loadingText }}</u>
      </p>
    </div>
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
    /**
     * Text of the alert button
     */
    actionText: {
      type: String,
      required: true,
    },
    /**
     * Set alert action as loading state
     */
    loading: {
      type: Boolean,
      required: true,
    },
    /**
     * Text displayed on alert is in loading state
     */
    loadingText: {
      type: String,
      required: true,
    },
    /**
     * Message of the alert
     */
    message: {
      type: String,
      required: true,
    },
    /**
     * Title of the alert
     */
    title: {
      type: String,
      required: true,
    },
  },
});
</script>
