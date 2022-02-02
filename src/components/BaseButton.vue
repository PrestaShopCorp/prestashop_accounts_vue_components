<template>
  <b-button
    :disabled="disabled"
    :variant="variant"
    @click="$emit('click')"
  >
    <slot />
  </b-button>
</template>

<script lang="ts">
import {defineComponent, PropType} from '@vue/composition-api';
import {BButton} from 'bootstrap-vue';

export enum Variant {
  Primary = 'primary',
  Secondary = 'secondary',
  Success = 'success',
  Danger = 'danger',
  Warning = 'warning',
  Info = 'info',
  Light = 'light',
  Dark = 'dark',
  Link = 'link',
}

/**
 * This is the BaseButton component.
 */
export default defineComponent({
  name: 'BaseButton',
  components: {
    BButton,
  },
  props: {
    disabled: {
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
