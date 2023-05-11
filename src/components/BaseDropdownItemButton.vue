<template>
  <button
    type="button"
    role="menuitem"
    @click="$emit('click')"
    class="acc-block acc-w-full acc-py-1 acc-px-2 acc-font-primary acc-text-grey-900 acc-text-left acc-text-sm acc-whitespace-nowrap hover:acc-text-grey-600 focus:acc-text-grey-600 focus:acc-outline-none">
    <slot />
  </button>
</template>

<script lang="ts">
import {defineComponent} from 'vue-demi';

/**
 * This is the BaseDropdownItemButton component.
 */
export default defineComponent({
  name: 'BaseDropdownItemButton',
});
</script>
