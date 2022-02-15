<template>
  <BaseAlert :variant="hasAllShopsWithoutUrl ? 'danger' : 'warning'">
    <h3 class="acc-m-0 acc-p-0 acc-text-base acc-font-bold">
      {{ $t('psaccounts.alertShopDomainShouldExists.title') }}
    </h3>
    <p class="acc-m-0 acc-mt-2 acc-p-0 acc-text-sm">
      <span v-html="$t('psaccounts.alertShopDomainShouldExists.message')" />
      {{ shopNamesWithoutUrl.join(', ') }}
    </p>
  </BaseAlert>
</template>

<script lang="ts">
import {defineComponent} from '@vue/composition-api';
import i18n from '@/i18n';
import BaseAlert from './BaseAlert.vue';

/**
   * This alert shows a message if a shop domain is not set;
   */
export default defineComponent({
  name: 'ShopUrlShouldExistsAlert',
  i18n,
  components: {
    BaseAlert,
  },
  props: {
    hasAllShopsWithoutUrl: {
      type: Boolean,
      required: true,
    },
    shopNamesWithoutUrl: {
      type: Array,
      required: true,
    },
  },
});
</script>
