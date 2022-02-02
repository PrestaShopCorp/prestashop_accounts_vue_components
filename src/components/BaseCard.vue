<template>
  <b-card :no-body="noBody">
    <template #header>
      <slot name="header" />
    </template>
    <slot />
  </b-card>
</template>

<script lang="ts">
import {defineComponent} from '@vue/composition-api';
import {BCard} from 'bootstrap-vue';

/**
 * This is the BaseCard component.
 */
export default defineComponent({
  name: 'BaseCard',
  components: {
    BCard,
  },
  props: {
    noBody: {
      type: Boolean,
      default: true,
    },
  },
});
</script>
