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
  import installModule from '../../../lib/moduleManager/InstallModule';

  export default {
    name: 'AlertEventBusNotInstalled',
    mixins: [Locale],
    components: {
      BOverlay,
      BAlert,
      BButton,
    },
    props: {
      validatedContext: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        isLoading: false,
      };
    },
    methods: {
      /**
       * Emitted when install button is clicked.
       * @type {Event}
       */
      installEventBus() {
        this.isLoading = true;

        this.$segment.track('[ACC] PSEventBus Install Button Clicked', {
          shop_bo_id: this.validatedContext.currentShop.id,
          ps_module_from: this.validatedContext.psxName,
          v4_onboarded: this.validatedContext.isOnboardedV4,
          multishop_numbers: this.validatedContext.shops.length || 1,
        });
        
        installModule(
          'ps_eventbus',
          this.validatedContext.dependencies.ps_eventbus.installLink,
          this.validatedContext.psIs17,
        ).catch(() => {
          this.isLoading = false;
          this.$emit('hasError');
        });
      },
    },
  };
</script>

<style></style>
