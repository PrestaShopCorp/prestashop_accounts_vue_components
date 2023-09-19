<template>
  <puik-alert
    variant="danger"
    data-testid="shop-unlinked-alert"
  >
    <p
      class="acc-m-0 acc-p-0"
      data-testid="shop-unlinked-alert-message"
    >
      {{ t('psaccounts.alert.unlinked.message') }}
    </p>
  </puik-alert>
</template>

<script setup lang="ts">
import { useLocale } from '@/composables/useLocale';
const { t } = useLocale();
</script>
