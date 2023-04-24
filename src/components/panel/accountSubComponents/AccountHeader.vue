<template>
  <div class="acc-flex acc-items-center">
    <span
      v-if="hasAllShopsLinked"
      class="acc-flex-shrink-0 acc-w-6 acc-h-6 acc-mr-2 acc-p-0.5 acc-rounded-full acc-bg-success-500"
    >
      <puik-icon
        class="acc-text-white"
        font-size="1.25rem"
        icon="check"
      />
    </span>
    <p class="acc-m-0 acc-font-primary acc-font-semibold">
      <slot />
    </p>
  </div>
</template>

<script setup lang="ts">
interface AccountHeaderProps {
  hasAllShopsLinked: boolean;
}

defineProps<AccountHeaderProps>();
</script>
