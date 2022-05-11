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
import {defineComponent} from 'vue-demi';
import BaseAlert from './BaseAlert.vue';

/**
 * This component shows a warning or danger alert if among the shops in the current context, 
 * some of them does not a url set.
 */
export default defineComponent({
  name: 'ShopUrlShouldExistsAlert',
  components: {
    BaseAlert,
  },
  props: {
    /**
     * Define is all shops (or partial) in the current context 
     * are without url set.
     */
    hasAllShopsWithoutUrl: {
      type: Boolean,
      required: true,
    },
    /**
     * List shop names without url set.
     */
    shopNamesWithoutUrl: {
      type: Array,
      required: true,
    },
  },
});
</script>
