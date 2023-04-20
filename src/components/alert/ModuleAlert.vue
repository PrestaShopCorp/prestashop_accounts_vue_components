<template>
  <!--
       action event
       @event action
     -->
  <BaseAlert :title="title" :button-label="loading ? loadingText : actionText" :variant="Variant.Warning" @clicked="$emit('action')">
    <p class="acc-m-0 acc-p-0">
      {{ message }}
    </p>
  </BaseAlert>
</template>

<script setup lang="ts">
/**
 * This component is used to display warning alert telling the PSAccounts module or
 * any dependant module requires an action (enable, install or update).
 */
import BaseAlert, { Variant } from './BaseAlert.vue';

interface ModuleAlertProps {
  actionText: string;
  loading: boolean;
  loadingText: string;
  message: string;
  title: string;
}

defineProps<ModuleAlertProps>()
</script>
