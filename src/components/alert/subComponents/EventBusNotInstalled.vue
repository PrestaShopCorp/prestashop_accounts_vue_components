<template>
  <b-overlay
    variant="white"
    :show="isLoading"
    :opacity="0.70"
    blur="0px"
  >
    <b-alert
      show
      variant="warning"
    >
      <h3>{{ $t('psaccounts.alertEventBusNotInstalled.title') }}</h3>
      <p>
        {{ $t('psaccounts.alertEventBusNotInstalled.message') }}
      </p>
      <p class="mt-2">
        <b-button
          variant="primary"
          @click="installEventBus"
        >
          {{ $t('psaccounts.alertEventBusNotInstalled.installButton') }}
        </b-button>
      </p>
    </b-alert>
  </b-overlay>
</template>

<script>
import {BOverlay} from 'bootstrap-vue';
import Alert from './Alert';
import installModule from '@/lib/moduleManager/InstallModule';
import useSegmentTracking from '@/composables/useSegmentTracking';

export default {
  name: 'AlertEventBusNotInstalled',
  mixins: [Alert],
  components: {
    BOverlay,
  },
  setup() {
    const {trackPsEventBusInstallButton} = useSegmentTracking();

    return {trackPsEventBusInstallButton};
  },
  methods: {
    /**
       * Emitted when install button is clicked.
       * @type {Event}
       */
    installEventBus() {
      this.isLoading = true;

      this.trackPsEventBusInstallButton();

      installModule(
        'ps_eventbus',
        this.link,
        this.psIs17,
      ).catch(() => {
        this.isLoading = false;
        this.$emit('hasError');
      });
    },
  },
};
</script>

<style></style>
