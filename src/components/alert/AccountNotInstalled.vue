<template>
  <b-alert
    v-if="!accountIsInstalled"
    variant="warning"
    show
  >
    <h3>{{ t('psaccounts.alertAccountNotInstalled.title') }}</h3>
    <p>
      {{ t('psaccounts.alertAccountNotInstalled.message') }}.
    </p>
    <p class="mt-2">
      <b-button
        variant="primary"
        @click="installEvent()"
      >
        {{ t('psaccounts.alertAccountNotInstalled.installButton') }}
      </b-button>
    </p>
  </b-alert>
</template>

<script>
  import Locale from '@/mixins/locale';
  import {BAlert, BButton} from 'bootstrap-vue';

  /**
   * This sub-component can be used in a custom integration when the `PsAccounts`
   * component does not meets special needs. This part will display a warning message
   * telling the PS Accounts module is not installed on the shop (and a button to install it).
   */
  export default {
    name: 'AlertAccountNotInstalled',
    mixins: [Locale],
    components: {
      BAlert,
      BButton,
    },
    props: {
      /**
       * This is the display condition (do not use v-if="...", use this prop instead).
       */
      accountIsInstalled: {
        type: Boolean,
        default: false,
      },
    },
    methods: {
      installEvent() {
        /**
         * Emitted when install button is clicked.
         * @type {Event}
         */
        this.$emit('install', true);
      },
    },
  };
</script>
