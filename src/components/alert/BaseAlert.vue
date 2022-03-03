<template>
  <div
    v-if="isDisplayed"
    class="acc-relative acc-flex acc-flex-row acc-items-start acc-p-4 acc-border acc-rounded-lg"
    :class="{
      'acc-bg-success-lighter acc-border-success-darker': variant === 'success',
      'acc-bg-danger-lighter acc-border-danger-darker': variant === 'danger',
      'acc-bg-warning-lighter acc-border-warning-darker': variant === 'warning',
      'acc-bg-info-lighter acc-border-info-darker': variant === 'info',
    }">
    <component
      :is="`${variant}-icon`"
      class="acc-flex-shrink-0 acc-w-6"
      :class="{
        'acc-text-success-darker': variant === 'success',
        'acc-text-danger-darker': variant === 'danger',
        'acc-text-warning-darker': variant === 'warning',
        'acc-text-info-darker': variant === 'info',
      }" />
    <div class="acc-flex-1 acc-mx-4">
      <!-- @slot Alert content -->
      <slot />
    </div>
    <button
      v-if="dismissible"
      type="button"
      aria-label="Close"
      class="acc-absolute acc-top-4 acc-right-4 acc-flex-shrink-0 acc-w-6 acc-h-6 acc-p-0 acc-bg-transparent acc-border-0 acc-text-xl acc-leading-3 acc-appearance-none acc-cursor-pointer hover:acc-opacity-50"
      :class="{
        'acc-text-success-darker': variant === 'success',
        'acc-text-danger-darker': variant === 'danger',
        'acc-text-warning-darker': variant === 'warning',
        'acc-text-info-darker': variant === 'info',
      }"
      @click="dismiss">
        ×
      </button>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType, ref, watch} from '@vue/composition-api';

import SuccessIcon from '@/assets/icons/check.svg?inline';
import DangerIcon from '@/assets/icons/report.svg?inline';
import WarningIcon from '@/assets/icons/warning.svg?inline';
import InfoIcon from '@/assets/icons/info.svg?inline';

export enum Variant {
  Success = 'success',
  Danger = 'danger',
  Warning = 'warning',
  Info = 'info',
}

/**
 * `BaseAlert` component allows to display an alert message.
 */
export default defineComponent({
  name: 'BaseAlert',
  components: {
    SuccessIcon,
    DangerIcon,
    WarningIcon,
    InfoIcon,
  },
  props: {
    /**
     * Allow alert to be dismissable
     */
    dismissible: {
      type: Boolean,
      default: false,
    },
    /**
     * Show the alert
     */
    show: {
      type: Boolean,
      default: true,
    },
    /**
     * The variant for the alert
     * @values success, danger, warning, info
     */
    variant: {
      type: String as PropType<Variant>,
      default: Variant.Success,
    },
  },
  emits: [
    /**
     * Dismissed event
     */
    'dismissed',
  ],
  setup(props, {emit}) {
    const isDisplayed = ref(props.show);

    function dismiss() {
      isDisplayed.value = false;
      emit('dismissed');
    }

    watch(() => props.show, (show: boolean) => {
      isDisplayed.value = show;
    });

    return {dismiss, isDisplayed};
  }
});
</script>