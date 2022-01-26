<template>
  <BaseAlert :variant="hasAllShopsWithoutUrl ? 'danger' : 'warning'">
    <h3 class="m-0">
      {{ t('psaccounts.alertShopDomainShouldExists.title') }}
    </h3>
    <p>
      <span v-html="t('psaccounts.alertShopDomainShouldExists.message')" />
      {{ shopNamesWithoutUrl.join(', ') }}
    </p>
  </BaseAlert>
</template>

<script lang="ts">
import {defineComponent} from '@vue/composition-api';
import BaseAlert from './BaseAlert.vue';
import Locale from '@/mixins/locale';

/**
   * This alert shows a message if a shop domain is not set;
   */
export default defineComponent({
  name: 'ShopUrlShouldExistsAlert',
  mixins: [Locale],
  components: {
    BaseAlert,
  },
  props: {
    hasAllShopsWithoutUrl: {
      type: Boolean,
      required: true,
      default: false,
    },
    shopNamesWithoutUrl: {
      type: Array,
      required: true,
      default: () => ([]),
    },
  },
});
</script>
