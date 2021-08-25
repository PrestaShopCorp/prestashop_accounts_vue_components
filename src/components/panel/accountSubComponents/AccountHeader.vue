<template>
  <div>
    <b-iconstack
      v-if="hasAllShopsLinked"
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
    BIconstack,
    BIconCircleFill,
    BIconCheck,
  } from 'bootstrap-vue';

  export default {
    name: 'AccountHeader',
    mixins: [Locale],
    components: {
      BIconstack,
      BIconCircleFill,
      BIconCheck,
    },
    props: {
      hasAllShopsLinked: {
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
