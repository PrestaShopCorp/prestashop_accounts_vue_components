<template>
  <div class="acc-bg-white acc-border acc-border-grey-200 acc-font-sans acc-rounded-lg">
    <header class="acc-p-6 acc-text-base acc-font-bold acc-text-grey-900">
      <!-- @slot Header slot -->
      <slot name="header" />
    </header>
    <div class="acc-px-6 acc-pb-6">
      <!-- @slot Body slot -->
      <slot name="body" />
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue-demi';

/**
 * This is the BaseCard component.
 */
export default defineComponent({
  name: 'BaseCard',
});
</script>
