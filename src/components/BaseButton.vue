<template>
  <button
    type="button"
    :disabled="disabled"
    :class="[
      'acc-inline-block acc-py-2 acc-px-4',
      'acc-border acc-border-transparent acc-rounded',
      'acc-font-sans acc-text-sm acc-text-center acc-font-semibold acc-align-middle acc-whitespace-nowrap',
      'acc-select-none acc-cursor-pointer acc-transition-all focus:acc-ring focus:acc-ring-opacity-20 focus:acc-outline-none disabled:acc-cursor-not-allowed',
      {
        'disabled:acc-bg-gray-200 disabled:acc-border-gray-200 disabled:acc-text-gray-400': !outlined,
        'disabled:acc-bg-white disabled:acc-border-gray-200 disabled:acc-text-gray-400': outlined,
        'acc-bg-primary acc-border-primary acc-text-white hover:acc-bg-primary-hover hover:acc-border-primary-hover focus:acc-bg-primary-active focus:acc-border-primary-active focus:acc-ring-primary': variant === 'primary' && !outlined,
        'acc-bg-white acc-border-primary acc-text-primary hover:acc-bg-primary-hover hover:acc-border-primary-hover hover:acc-text-white focus:acc-bg-primary-active focus:acc-border-primary-active focus:acc-ring-primary focus:acc-text-white': variant === 'primary' && outlined,
      }
    ]"
    @click="$emit('click')">
    <slot />
  </button>
</template>

<script lang="ts">
import {defineComponent, PropType} from '@vue/composition-api';

export enum Variant {
  Primary = 'primary',
}

/**
 * This is the BaseButton component.
 */
export default defineComponent({
  name: 'BaseButton',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    outlined: {
      type: Boolean,
      default: false,
    },
    variant: {
      type: String as PropType<Variant>,
      default: Variant.Primary,
    },
  },
});
</script>
