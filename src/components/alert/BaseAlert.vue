<template>
  <b-alert
    :variant="variant"
    show
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
    variant: {
      type: String as PropType<Variant>,
      default: Variant.Primary,
    },
  },
});
</script>
