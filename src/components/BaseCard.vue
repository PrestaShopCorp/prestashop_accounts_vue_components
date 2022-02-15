<template>
  <div class="acc-bg-white acc-border acc-border-cyan-ligther acc-font-sans">
    <header class="acc-p-2 acc-rounded-t-md acc-bg-cyan-blue acc-border-b acc-border-cyan-ligther acc-text-base acc-font-bold acc-text-gray-darker">
      <slot name="header" />
    </header>
    <div class="acc-p-2 acc-rounded-b-md">
      <slot name="body" />
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from '@vue/composition-api';

/**
 * This is the BaseCard component.
 */
export default defineComponent({
  name: 'BaseCard',
});
</script>