<template>
  <div class="acc-flex acc-items-center acc-font-sans acc-font-semibold">
    <span
      v-if="hasAllShopsLinked"
      class="acc-flex-shrink-0 acc-w-6 acc-h-6 acc-mr-2 acc-p-0.5 acc-rounded-full acc-bg-success"
    >
      <CheckIcon class="acc-text-white" />
    </span>
    <h3 class="acc-m-0">
      <slot />
    </h3>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue-demi';
import CheckIcon from '@/assets/icons/check.svg?inline';

export default defineComponent({
  name: 'AccountHeader',
  components: {
    CheckIcon,
  },
  props: {
    hasAllShopsLinked: {
      type: Boolean,
      required: true,
    },
  },
});
</script>
