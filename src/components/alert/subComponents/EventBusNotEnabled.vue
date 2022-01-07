<template>
  <b-alert
    variant="warning"
    show
  >
    <h3>{{ t('psaccounts.alertEventBusNotEnabled.title') }}</h3>
    <p>
      {{ t('psaccounts.alertEventBusNotEnabled.message') }}.
    </p>
    <p class="mt-2">
      <b-button
        v-if="!isLoading"
        variant="primary"
        @click="enableEventBus()"
      >
        {{ t('psaccounts.alertEventBusNotEnabled.enableButton') }}
      </b-button>
      <b-link
        href="#"
        disabled
        v-else
      >
        {{ t('psaccounts.alertEventBusNotEnabled.loading') }}
      </b-link>
    </p>
  </b-alert>
</template>

<script>
  import Alert from './Alert';
  import enableModule from '../../../lib/moduleManager/EnableModule';

  /**
   * This sub-component can be used in a custom integration when the `EventBus`
   * component does not meets special needs. This part will display a warning message
   * telling the PS EventBus module is not enabled on the shop (and a button to enable it).
   */
  export default {
    name: 'AlertEventBusNotEnabled',
    mixins: [Alert],
    props: {
      link: {
        type: [ String, null ],
        required: false,
        default: null,
      },
      psIs17: {
        type: Boolean,
        required: false,
        default: true,
      },
    },
    methods: {
      enableEventBus() {
        this.isLoading = true;

        this.$tracking.track('[ACC] PSEventBus Enable Button Clicked');

        enableModule(
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
