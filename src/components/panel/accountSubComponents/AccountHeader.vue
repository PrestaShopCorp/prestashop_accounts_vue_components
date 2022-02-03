<template>
  <div class="d-flex align-items-center">
    <span
      v-if="hasAllShopsLinked"
      class="mr-3 bg-success rounded-circle"
      style="width: 24px; height: 24px"
    >
      <CheckIcon class="text-white" />
    </span>
    <h3
      class="m-0 d-inline h3 title"
    >
      <slot />
    </h3>
  </div>
</template>

<script lang="ts">
import {defineComponent} from '@vue/composition-api';
import i18n from '@/i18n';
import CheckIcon from '@/assets/icons/check.svg?inline';

export default defineComponent({
  name: 'AccountHeader',
  i18n,
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

<style scoped>
.title {
  color: #363a41;
  font-family: 'Open Sans', helvetica, arial, sans-serif;
  font-weight: 600;
}
</style>
