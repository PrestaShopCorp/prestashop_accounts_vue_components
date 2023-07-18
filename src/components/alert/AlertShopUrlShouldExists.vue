<template>
  <puik-alert
    :title="t('psaccounts.alertShopDomainShouldExists.title')"
    variant="danger"
    data-testid="shop-url-alert"
  >
    <p
      class="acc-m-0 acc-mt-2 acc-p-0 acc-text-sm"
      data-testid="shop-url-alert-message"
    >
      {{ t('psaccounts.alertShopDomainShouldExists.message') }}
    </p>
    <span
      class="acc-m-0 acc-mt-2 acc-p-0 acc-text-sm"
      data-testid="shop-url-alert-shop-list"
    >
      {{ t('psaccounts.alertShopDomainShouldExists.shopList') }}
      {{ shopsWithoutUrl.join(', ') }}
    </span>
  </puik-alert>
</template>

<script setup lang="ts">
import { useLocale } from '@/composables/useLocale';
/**
 * This component shows a warning or danger alert if among the shops in the current context,
 * some of them does not a url set.
 */

interface AlertShopUrlShouldExistsProps {
  /**
  * List shop names without url set.
  */
  shopsWithoutUrl: string[];
}

defineProps<AlertShopUrlShouldExistsProps>();

const { t } = useLocale();
</script>
