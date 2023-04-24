<template>
  <puik-alert
    :title="$t('psaccounts.alertShopDomainShouldExists.title')"
    :variant="hasAllShopsWithoutUrl ? 'danger' : 'warning'"
  >
    <p class="acc-m-0 acc-mt-2 acc-p-0 acc-text-sm">
      <span v-html="$t('psaccounts.alertShopDomainShouldExists.message')" />
      {{ shopNamesWithoutUrl.join(', ') }}
    </p>
  </puik-alert>
</template>

<script setup lang="ts">
/**
 * This component shows a warning or danger alert if among the shops in the current context,
 * some of them does not a url set.
 */

interface ShopUrlShouldExistsAlertProps {
  /**
  * Define is all shops (or partial) in the current context
  * are without url set.
  */
  hasAllShopsWithoutUrl: boolean;
  /**
  * List shop names without url set.
  */
  shopNamesWithoutUrl: string[];
}

defineProps<ShopUrlShouldExistsAlertProps>();
</script>
