<template>
  <b-overlay
    :show="show"
    variant="white"
    spinner-type="null"
    :opacity="0.70"
    blur="0px"
  >
    <slot />
  </b-overlay>
</template>

<script lang="ts">
import {defineComponent} from '@vue/composition-api';
import {BOverlay} from 'bootstrap-vue';

/**
 * This is the BaseOverlay component.
 */
export default defineComponent({
  name: 'BaseOverlay',
  components: {
    BOverlay,
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
