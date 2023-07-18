<template>
  <puik-alert
    variant="info"
    data-testid="account-module-update-information-alert"
  >
    <p class="acc-m-0 acc-p-0 acc-text-sm acc-leading-6">
      <strong>{{ t('psaccounts.account.moduleUpdateInformation.part1') }}</strong>
      {{ t('psaccounts.account.moduleUpdateInformation.part2') }}
    </p>
    <span class="acc-m-0 acc-p-0 acc-text-sm acc-leading-6">
      {{ t('psaccounts.account.moduleUpdateInformation.part3') }}
      <strong>{{ t('psaccounts.account.moduleUpdateInformation.part4') }}</strong>
      {{ t('psaccounts.account.moduleUpdateInformation.part5') }}
    </span>
    <p class="acc-m-0 acc-p-0 acc-text-sm acc-leading-6">
      {{ t('psaccounts.account.moduleUpdateInformation.part6') }}
    </p>
  </puik-alert>
</template>

<script setup lang="ts">
import { useLocale } from '@/composables/useLocale';
/**
   * When a v4 onboarded user updates the ps accounts module on v5,
   * an information alert informs the user to reonboard
   * with the same email and update other modules.
   */
const { t } = useLocale();

</script>
