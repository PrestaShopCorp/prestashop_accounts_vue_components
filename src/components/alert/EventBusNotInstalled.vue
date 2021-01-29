<template>
  <b-overlay
    :show="installLoading"
    variant="white"
    :opacity="0.70"
    blur="0px"
  >
    <b-alert
      show
      class="d-flex event-bus-not-installed"
      variant="warning"
    >
      <div class="d-flex flex-grow-1">
        <p class="align-self-center">
          {{ t('psaccounts.alertEventBusNotInstalled.message') }}
        </p>
      </div>
      <div class="align-self-center">
        <b-button
          variant="primary"
          class="float-right"
          @click="installEventBus"
        >
          {{ t('psaccounts.alertEventBusNotInstalled.installButton') }}
        </b-button>
      </div>
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
      installLoading: {
        type: Boolean,
        required: false,
      },
    },
    methods: {
      installEventBus() {
        this.$emit('installEventBus');
      },
    },
  };
</script>

<style>
.event-bus-not-installed.alert:before {
  top: 24px !important;
}
</style>
