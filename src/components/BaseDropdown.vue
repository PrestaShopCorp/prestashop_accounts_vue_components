<template>
  <b-dropdown
    :disabled="disabled"
    :right="right"
    :split="split"
    :split-variant="splitVariant"
    :text="text"
    :variant="variant"
    @click="$emit('click')"
  >
    <slot />
  </b-dropdown>
</template>

<script lang="ts">
import {defineComponent} from '@vue/composition-api';
import {BDropdown} from 'bootstrap-vue';

/**
 * This is the BaseDropdown component.
 */
export default defineComponent({
  name: 'BaseDropdown',
  components: {
    BDropdown,
  },
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    right: {
      type: Boolean,
      default: true,
    },
    split: {
      type: Boolean,
      default: true,
    },
    splitVariant: {
      type: String,
      default: 'outline-primary',
    },
    text: {
      type: String,
      required: true,
    },
    variant: {
      type: String,
      default: 'primary',
    },
  },
});
</script>
