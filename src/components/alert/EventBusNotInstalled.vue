<template>
  <b-overlay
    :show="installLoading"
    variant="white"
    :opacity="0.70"
    blur="0px"
  >
    <b-alert
      show
      variant="warning"
    >
      <h3>{{ t('psaccounts.alertEventBusNotInstalled.title') }}</h3>
      <p>
        {{ t('psaccounts.alertEventBusNotInstalled.message') }}
      </p>
      <p class="mt-2">
        <b-button
          variant="primary"
          @click="installEventBus"
        >
          {{ t('psaccounts.alertEventBusNotInstalled.installButton') }}
        </b-button>
      </p>
    </b-alert>
  </b-overlay>
</template>

<script>
  import {BOverlay, BAlert, BButton} from 'bootstrap-vue';
  import Locale from '@/mixins/locale';

  export default {
    name: 'AlertEventBusNotInstalled',
    mixins: [Locale],
    components: {
      BOverlay,
      BAlert,
      BButton,
    },
    props: {
      /**
       * Useful in order to display a loader if you perform some ajax.
       */
      installLoading: {
        type: Boolean,
        required: false,
      },
    },
    methods: {
      /**
       * Emitted when install button is clicked.
       * @type {Event}
       */
      installEventBus() {
        this.$emit('installEventBus');
      },
    },
  };
</script>

<style></style>
