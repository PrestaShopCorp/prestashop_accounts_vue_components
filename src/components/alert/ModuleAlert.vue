<template>
  <!--
       action event
       @event action
     -->
  <puik-alert
    :title="title"
    :button-label="loading ? loadingText : actionText"
    variant="warning"
    @click="$emit('action')"
  >
    {{ message }}
  </puik-alert>
</template>

<script setup lang="ts">
/**
 * This component is used to display warning alert telling the PSAccounts module or
 * any dependant module requires an action (enable, install or update).
 */

interface ModuleAlertProps {
  /**
  * Text of the alert button
  */
  actionText: string;
  /**
  * Set alert action as loading state
  */
  loading: boolean;
  /**
  * Text displayed on alert is in loading state
  */
  loadingText: string;
  /**
  * Message of the alert
  */
  message: string;
  /**
  * Title of the alert
  */
  title: string;
}

defineProps<ModuleAlertProps>();

defineEmits(['action']);
</script>
