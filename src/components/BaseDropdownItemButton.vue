<template>
  <b-dropdown-item-button @click="$emit('click')">
    <slot />
  </b-dropdown-item-button>
</template>

<script lang="ts">
import {defineComponent} from '@vue/composition-api';
import {BDropdownItemButton} from 'bootstrap-vue';

/**
 * This is the BaseDropdownItemButton component.
 */
export default defineComponent({
  name: 'BaseDropdownItemButton',
  components: {
    BDropdownItemButton,
  },
});
</script>
