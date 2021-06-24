<template>
  <div>
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
      class="mr-2 align-bottom fixed-size icon-check"
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
      userIsConnected: {
        type: Boolean,
        required: true,
      },
    },
  };
</script>

<style scoped>
.icon-check {
  width: auto;
}
</style>
