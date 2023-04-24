<template>
  <puik-alert variant="info">
    <p
      class="acc-m-0 acc-p-0 acc-text-sm acc-leading-6"
      v-html="$t('psaccounts.account.moduleUpdateInformation')"
    />
  </puik-alert>
</template>

<script setup lang="ts">
/**
   * When a v4 onboarded user updates the ps accounts module on v5,
   * an information alert informs the user to reonboard
   * with the same email and update other modules.
   */
// TODO: use i18n component
</script>
