<template>
  <button
    type="button"
    role="menuitem"
    @click="$emit('click')"
    class="acc-block acc-w-full acc-p-1 acc-font-sans acc-font-semibold acc-text-cyan-darker acc-text-left acc-text-sm acc-whitespace-nowrap hover:acc-text-primary focus:acc-text-primary focus:acc-outline-none">
    <slot />
  </button>
</template>

<script lang="ts">
import {defineComponent} from '@vue/composition-api';

/**
 * This is the BaseDropdownItemButton component.
 */
export default defineComponent({
  name: 'BaseDropdownItemButton',
});
</script>
