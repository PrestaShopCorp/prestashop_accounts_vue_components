<template>
  <b-alert
    :variant="hasAllShopsWithoutUrl ? 'danger' : 'warning'"
    show
  >
    <h3>
      {{ t('psaccounts.alertShopDomainShouldExists.title') }}
    </h3>
    <p>
      {{ t('psaccounts.alertShopDomainShouldExists.message') }}
      {{ shopNamesWithoutUrl.join(', ') }}
    </p>
  </b-alert>
</template>

<script>
  import Locale from '@/mixins/locale';
  import {
    BAlert,
  } from 'bootstrap-vue';

  /**
   * This alert shows a message if a shop domain is not set;
   */
  export default {
    name: 'ShopUrlShouldExists',
    mixins: [Locale],
    components: {
      BAlert,
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
  };
</script>
