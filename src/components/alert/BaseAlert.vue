<template>
  <div
    v-if="isDisplayed"
    class="acc-relative acc-flex acc-flex-col md:acc-flex-row acc-items-start acc-p-4 acc-border"
    :class="{
      'acc-bg-success-50 acc-border-success-500': variant === 'success',
      'acc-bg-danger-50 acc-border-danger-500': variant === 'danger',
      'acc-bg-warning-50 acc-border-warning-500': variant === 'warning',
      'acc-bg-info-50 acc-border-info-500': variant === 'info',
    }">
    <div class="acc-flex acc-flex-row acc-flex-grow">
      <component :is="icons[variant]" class="acc-w-6 acc-h-6 acc-flex-shrink-0" :class="{
        'acc-text-success-500': variant === 'success',
        'acc-text-danger-500': variant === 'danger',
        'acc-text-warning-500': variant === 'warning',
        'acc-text-info-500': variant === 'info',
      }" />
      <div class="acc-mx-4">
        <h3 v-if="title" class="acc-text-base acc-font-semibold acc-font-primary acc-mb-1">{{ title }}</h3>
        <div class="acc-flex-1 acc-font-primary acc-text-sm">
          <!-- @slot Alert description -->
          <slot />
        </div>
      </div>
    </div>

    <button
        v-if="buttonLabel"
        class="block acc-font-primary acc-text-grey-900 acc-font-semibold acc-text-sm acc-px-4 acc-py-3 acc-border acc-mt-2 acc-ml-10 md:acc-m-0"
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

    <button v-if="dismissible" type="button" aria-label="Close"
      class="acc-absolute acc-top-4 acc-right-4 acc-flex-shrink-0 acc-w-6 acc-h-6 acc-p-0 acc-text-grey-600 acc-bg-transparent acc-border-0 acc-text-xl acc-leading-3 acc-appearance-none acc-cursor-pointer"
      @click="dismiss">
      ×
    </button>
  </div>
</template>

<script lang="ts">
/**
 * `BaseAlert` component allows to display an alert message.
 */

export enum Variant {
  Success = 'success',
  Danger = 'danger',
  Warning = 'warning',
  Info = 'info',
}
</script>

<script setup lang="ts">
import { ref, watch } from 'vue';
import SuccessIcon from '@/assets/icons/check.vue';
import DangerIcon from '@/assets/icons/report.vue';
import WarningIcon from '@/assets/icons/warning.vue';
import InfoIcon from '@/assets/icons/info.vue';
import { TranslateResult } from "vue-i18n";

interface BaseAlertProps {
  title?: string | TranslateResult;
  dismissible?: boolean;
  show?: boolean;
  variant?: Variant;
  buttonLabel?: string;
}

const props = withDefaults(defineProps<BaseAlertProps>(), {
  show: true,
  variant: Variant.Success,
})

const emit = defineEmits(['dismissed', 'clicked'])

const isDisplayed = ref(props.show);

const icons = {
  [Variant.Success]: SuccessIcon,
  [Variant.Danger]: DangerIcon,
  [Variant.Warning]: WarningIcon,
  [Variant.Info]: InfoIcon,
}

function dismiss() {
  isDisplayed.value = false;
  emit('dismissed');
}

watch(() => props.show, (show: boolean) => {
  isDisplayed.value = show;
});
</script>
