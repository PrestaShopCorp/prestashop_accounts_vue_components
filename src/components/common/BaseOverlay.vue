<template>
  <div
    class="acc-relative"
    style=""
  >
    <!-- @slot content -->
    <slot />
    <div
      v-show="show"
      class="acc-z-10 acc-absolute acc-inset-0"
      data-testid="account-base-overlay"
    >
      <div class="acc-absolute acc-inset-0 acc-opacity-70 acc-bg-white acc-blur-0 acc-select-none acc-pointer-events-none" />
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * This is the BaseOverlay component.
 */
interface BaseOverlayProps {
  show?: boolean
}
defineProps<BaseOverlayProps>();

</script>
