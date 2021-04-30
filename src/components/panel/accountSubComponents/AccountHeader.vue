<template>
  <div>
    <a
      :href="manageAccountLink"
      target="_blank"
      v-if="!!manageAccountLink && userIsConnected"
      class="float-right tooltip-link"
      id="tooltip-target-3bd46b2a34b6628a1a73a31c91afd7ef"
    >
      <i class="material-icons fixed-size-small float-right">settings</i>
    </a>
    <b-tooltip
      target="tooltip-target-3bd46b2a34b6628a1a73a31c91afd7ef"
      triggers="hover"
      placement="top"
    >
      {{ t('psaccounts.account.manageAccountTooltip') }}
    </b-tooltip>

    <b-iconstack
      v-if="userIsConnected"
      font-scale="1.5"
      class="mr-2 align-bottom fixed-size"
      width="20"
      height="20"
    >
      <b-icon-circle-fill
        stacked
        variant="success"
      />
      <b-icon-check
        stacked
        variant="white"
      />
    </b-iconstack>
    <h3 class="d-inline">
      {{ t('psaccounts.account.title') }}
    </h3>
  </div>
</template>

<script>
  import Locale from '@/mixins/locale';
  import {
    BTooltip,
    BIconstack,
    BIconCircleFill,
    BIconCheck,
  } from 'bootstrap-vue';

  export default {
    name: 'AccountHeader',
    mixins: [Locale],
    components: {
      BTooltip,
      BIconstack,
      BIconCircleFill,
      BIconCheck,
    },
    props: {
      /**
       * The link to sso account management page
       * [by prestashop\_accounts\_auth library presenter function](https://github.com/PrestaShopCorp/prestashop_accounts_auth#usage).
       */
      manageAccountLink: {
        type: String,
        required: false,
        default: null,
      },
      userIsConnected: {
        type: Boolean,
        required: true,
      },
    },
  };
</script>
