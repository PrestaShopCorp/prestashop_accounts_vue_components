<template>
  <div class="acc-relative" style="">
    <slot />
    <div v-show="show" class="acc-z-10 acc-absolute acc-inset-0">
      <div class="acc-absolute acc-inset-0 acc-opacity-70 acc-bg-white acc-blur-0 acc-select-none acc-pointer-events-none"></div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from '@vue/composition-api';

/**
 * This is the BaseOverlay component.
 */
export default defineComponent({
  name: 'BaseOverlay',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
