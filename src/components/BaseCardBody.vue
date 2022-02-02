<template>
  <b-card-body>
    <slot />
  </b-card-body>
</template>

<script lang="ts">
import {defineComponent} from '@vue/composition-api';
import {BCardBody} from 'bootstrap-vue';

/**
 * This is the BaseCardBody component.
 */
export default defineComponent({
  name: 'BaseCardBody',
  components: {
    BCardBody,
  },
});
</script>
