<template>
  <b-alert
    :dismissible="dismissible"
    :show="show"
    :variant="variant"
    @dismissed="$emit('dismissed')"
  >
    <slot />
  </b-alert>
</template>

<script lang="ts">
import {defineComponent, PropType} from '@vue/composition-api';
import {BAlert} from 'bootstrap-vue';

export enum Variant {
  Primary = 'primary',
  Secondary = 'secondary',
  Success = 'success',
  Danger = 'danger',
  Warning = 'warning',
  Info = 'info',
  Light = 'light',
  Dark = 'dark',
}

/**
 * This is the BaseAlert component.
 */
export default defineComponent({
  name: 'BaseAlert',
  components: {
    BAlert,
  },
  props: {
    dismissible: {
      type: Boolean,
      default: false,
    },
    show: {
      type: Boolean,
      default: true,
    },
    variant: {
      type: String as PropType<Variant>,
      default: Variant.Primary,
    },
  },
});
</script>
