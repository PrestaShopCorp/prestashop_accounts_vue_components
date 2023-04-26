<template>
  <div
    class="acc-relative acc-inline-flex acc-font-primary acc-align-middle"
    v-click-outside="closeDropdown"
    @keyup.esc="closeDropdown">
    <!--
      click event
      @event click
    -->
    <BaseButton
      :id="`acc-dropdown-${_uid}`"
      variant="secondary"
      :disabled="disabled"
      class="acc-rounded-r-none"
      @click="$emit('click')">
        {{ text }}
    </BaseButton>
    <BaseButton
      :disabled="disabled"
      aria-haspopup="true"
      :aria-expanded="expanded"
      class="acc-rounded-l-none focus:acc-ring-0"
      @click="toggleDropdown">
      <MoreHorIcon class="acc-w-5 acc-h-5" />
    </BaseButton>
    <ul
      v-show="expanded"
      role="menu"
      tabindex="-1"
      :aria-labelledby="`acc-dropdown-${_uid}`"
      class="acc-z-50 acc-absolute acc-top-full acc-right-0 acc-mt-1 acc-py-1 acc-bg-white acc-border acc-border-primary acc-shadow"
      style="min-width: 8rem;">
      <!-- @slot Dropdown items -->
      <slot />
    </ul>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue-demi';
import vClickOutside from 'v-click-outside';
import BaseButton from './BaseButton.vue';
import MoreHorIcon from '@/assets/icons/more_hor.svg?inline';

/**
 * This is the BaseDropdown component.
 */
export default defineComponent({
  name: 'BaseDropdown',
  components: {
    BaseButton,
    MoreHorIcon,
  },
  directives: {
    clickOutside: vClickOutside.directive,
  },
  props: {
    /**
     * Disabled state of the dropdown
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * Text of main button of the dropdown
     */
    text: {
      type: String,
      required: true,
    },
  },
  setup() {
    const expanded = ref(false);

    const closeDropdown = () => expanded.value = false;

    const toggleDropdown = () => expanded.value = !expanded.value;

    return {expanded, closeDropdown, toggleDropdown};
  }
});
</script>
