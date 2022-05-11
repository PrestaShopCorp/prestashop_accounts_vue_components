<template>
  <!--
       action event
       @event action
     -->
  <BaseAlert :title="title" :button-label="loading ? loadingText : actionText" variant="warning" @clicked="$emit('action')">
    <p class="acc-m-0 acc-p-0">
      {{ message }}
    </p>
  </BaseAlert>
</template>

<script lang="ts">
import {defineComponent} from 'vue-demi';
import BaseAlert from './BaseAlert.vue';

/**
 * This component is used to display warning alert telling the PSAccounts module or
 * any dependant module requires an action (enable, install or update).
 */
export default defineComponent({
  name: 'ModuleAlert',
  components: {
    BaseAlert,
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
