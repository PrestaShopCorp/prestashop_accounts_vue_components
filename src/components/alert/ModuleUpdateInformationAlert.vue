<template>
  <puik-alert
    variant="info"
    data-testid="account-module-update-information-alert"
  >
    <i18n-t
      class="acc-m-0 acc-p-0 acc-text-sm acc-leading-6"
      keypath="psaccounts.account.moduleUpdateInformation.part1"
      tag="p"
    >
      <strong>{{ $t('psaccounts.account.moduleUpdateInformation.part2') }}</strong>
    </i18n-t>
    <i18n-t
      class="acc-m-0 acc-p-0 acc-text-sm acc-leading-6"
      keypath="psaccounts.account.moduleUpdateInformation.part3"
      tag="p"
    >
      <strong>{{ $t('psaccounts.account.moduleUpdateInformation.part4') }}</strong>
    </i18n-t>
    {{ $t('psaccounts.account.moduleUpdateInformation.part5') }}
  </puik-alert>
</template>

<script setup lang="ts">
/**
   * When a v4 onboarded user updates the ps accounts module on v5,
   * an information alert informs the user to reonboard
   * with the same email and update other modules.
   */
</script>
