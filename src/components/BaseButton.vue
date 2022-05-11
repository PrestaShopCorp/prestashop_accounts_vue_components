<template>
  <!--
    click event
    @event click
  -->
  <button
    type="button"
    :disabled="disabled"
    class="acc-inline-block acc-py-2 acc-px-4
      acc-border acc-border-transparent acc-rounded
      acc-font-primary acc-text-sm acc-text-center acc-font-semibold acc-align-middle acc-whitespace-nowrap
      acc-select-none acc-cursor-pointer acc-transition-all focus:acc-ring focus:acc-ring-blue-focus acc-ring-offset-2 focus:acc-outline-none disabled:acc-cursor-not-allowed"
    :class="{
        'acc-bg-purple-500 acc-text-white hover:acc-bg-purple-700 active:acc-bg-purple-900 disabled:acc-bg-purple-50': variant === 'primary',
        'acc-bg-white acc-border-purple-500 acc-text-purple-500 hover:acc-bg-purple-500 hover:acc-text-white active:acc-bg-purple-900 disabled:acc-text-purple-100 disabled:acc-border-purple-100': variant === 'secondary',
        'acc-border-grey-500 acc-text-grey-900 hover:acc-bg-grey-100 active:acc-bg-grey-400 disabled:acc-text-grey-400 disabled:acc-border-grey-100': variant === 'tertiary'
      }"
    @click="$emit('click')">
    <!-- @slot Button content -->
    <slot />
  </button>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue-demi';

export enum Variant {
  Primary = 'primary',
  Secondary = 'secondary',
  Tertiary = 'tertiary'
}

/**
 * This is the BaseButton component.
 */
export default defineComponent({
  name: 'BaseButton',
  props: {
    /**
     * Disabled state of the button
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * Variant of the button
     * @values primary
     */
    variant: {
      type: String as PropType<Variant>,
      default: Variant.Primary,
    },
  },
});
</script>
