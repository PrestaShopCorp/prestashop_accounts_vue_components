<template>
  <BaseAlert :variant="hasAllShopsWithoutUrl ? Variant.Danger : Variant.Warning">
    <h3 class="acc-m-0 acc-p-0 acc-text-base acc-font-bold">
      {{ $t('psaccounts.alertShopDomainShouldExists.title') }}
    </h3>
    <p class="acc-m-0 acc-mt-2 acc-p-0 acc-text-sm">
      <span v-html="$t('psaccounts.alertShopDomainShouldExists.message')" />
      {{ shopNamesWithoutUrl.join(', ') }}
    </p>
  </BaseAlert>
</template>

<script setup lang="ts">
/**
 * This component shows a warning or danger alert if among the shops in the current context, 
 * some of them does not a url set.
 */
import BaseAlert, { Variant } from './BaseAlert.vue';

interface ShopUrlShouldExistsAlertProps {
  hasAllShopsWithoutUrl: boolean;
  shopNamesWithoutUrl: string[];
}

defineProps<ShopUrlShouldExistsAlertProps>()
</script>
