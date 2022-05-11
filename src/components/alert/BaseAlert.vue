<template>
  <div
    v-if="isDisplayed"
    class="acc-relative acc-flex acc-flex-col md:acc-flex-row acc-items-start acc-p-4 acc-border acc-rounded-lg"
    :class="{
      'acc-bg-success-50 acc-border-success-500': variant === 'success',
      'acc-bg-danger-50 acc-border-danger-500': variant === 'danger',
      'acc-bg-warning-50 acc-border-warning-500': variant === 'warning',
      'acc-bg-info-50 acc-border-info-500': variant === 'info',
    }">
    <div class="acc-flex acc-flex-row acc-flex-grow">
      <component
          :is="`${variant}-icon`"
          class="acc-w-6 acc-h-6 acc-flex-shrink-0"
          :class="{
        'acc-text-success-500': variant === 'success',
        'acc-text-danger-500': variant === 'danger',
        'acc-text-warning-500': variant === 'warning',
        'acc-text-info-500': variant === 'info',
      }" />
      <div class="acc-mx-4">
        <h1 v-if="title" class="acc-text-base acc-font-semibold acc-font-primary acc-mb-1">{{ title }}</h1>
        <div class="acc-flex-1 acc-font-secondary acc-text-sm">
          <!-- @slot Alert description -->
          <slot />
        </div>
      </div>
    </div>

    <button
        v-if="buttonLabel"
        class="acc-font-primary acc-text-grey-900 acc-font-semibold acc-text-sm acc-px-4 acc-py-3 acc-border acc-rounded acc-mt-2 acc-ml-10 md:acc-m-0 block"
        :class="{
          'acc-border-success-500': variant === 'success',
          'acc-border-danger-500': variant === 'danger',
          'acc-border-warning-500': variant === 'warning',
          'acc-border-info-500': variant === 'info',
          }"
        @click="$emit('clicked')"
    >
      {{ buttonLabel }}
    </button>

    <button
      v-if="dismissible"
      type="button"
      aria-label="Close"
      class="acc-absolute acc-top-4 acc-right-4 acc-flex-shrink-0 acc-w-6 acc-h-6 acc-p-0 acc-text-grey-600 acc-bg-transparent acc-border-0 acc-text-xl acc-leading-3 acc-appearance-none acc-cursor-pointer"
      @click="dismiss">
        ×
      </button>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType, ref, watch} from 'vue-demi';

import SuccessIcon from '@/assets/icons/check.svg?inline';
import DangerIcon from '@/assets/icons/report.svg?inline';
import WarningIcon from '@/assets/icons/warning.svg?inline';
import InfoIcon from '@/assets/icons/info.svg?inline';
import { TranslateResult } from "vue-i18n";

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
     * Title of the alert
     */
    title: {
      type: String as PropType<string| TranslateResult>,
      required: false,
      default: '',
    },
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
    buttonLabel: {
      type: String,
      required: false,
      default: '',
    }
  },
  emits: [
    /**
     * Dismissed event
     */
    'dismissed',
    'clicked',
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
