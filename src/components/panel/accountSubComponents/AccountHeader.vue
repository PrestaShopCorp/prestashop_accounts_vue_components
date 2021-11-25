<template>
  <div class="d-flex align-items-center">
    <b-iconstack
      v-if="hasAllShopsLinked"
      font-scale="1.5"
      class="w-auto mr-3 align-bottom fixed-size"
      width="24"
      height="24"
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
    <h3
      class="m-0 d-inline h3 title"
    >
      <slot />
    </h3>
  </div>
</template>

<script>
  import i18n from '@/locale';
  import {
    BIconstack,
    BIconCircleFill,
    BIconCheck,
  } from 'bootstrap-vue';

  export default {
    name: 'AccountHeader',
    i18n,
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
.title {
  color: #363a41;
  font-family: 'Open Sans', helvetica, arial, sans-serif;
  font-weight: 600;
}
</style>
