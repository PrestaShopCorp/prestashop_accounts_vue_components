<template>
  <b-alert
    :variant="hasAllShopsWithoutUrl ? 'danger' : 'warning'"
    show
  >
    <h3 class="m-0">
      {{ $t('psaccounts.alertShopDomainShouldExists.title') }}
    </h3>
    <p>
      <span v-html="$t('psaccounts.alertShopDomainShouldExists.message')"></span>
      {{ shopNamesWithoutUrl.join(', ') }}
    </p>
  </b-alert>
</template>

<script>
  import i18n from '@/locale';
  import {
    BAlert,
  } from 'bootstrap-vue';

  /**
   * This alert shows a message if a shop domain is not set;
   */
  export default {
    name: 'ShopUrlShouldExists',
    i18n,
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
