<template>
  <puik-alert
    :title="$t('psaccounts.alertShopDomainShouldExists.title')"
    variant="danger"
  >
    <p class="acc-m-0 acc-mt-2 acc-p-0 acc-text-sm">
      {{ $t('psaccounts.alertShopDomainShouldExists.message') }}
    </p>
    <span class="acc-m-0 acc-mt-2 acc-p-0 acc-text-sm">
      {{ $t('psaccounts.alertShopDomainShouldExists.shopList') }}
      {{ shopsWithoutUrl.join(', ') }}
    </span>
  </puik-alert>
</template>

<script setup lang="ts">
/**
 * This component shows a warning or danger alert if among the shops in the current context,
 * some of them does not a url set.
 */

interface ShopUrlShouldExistsAlertProps {
  /**
  * List shop names without url set.
  */
  shopsWithoutUrl: string[];
}

defineProps<ShopUrlShouldExistsAlertProps>();
</script>
