<template>
  <b-alert
    v-if="!accountIsEnabled"
    variant="warning"
    show
  >
    <h3>{{ t('psaccounts.alertAccountNotEnabled.title') }}</h3>
    <p>
      {{ t('psaccounts.alertAccountNotEnabled.message') }}.
    </p>
    <p class="mt-2">
      <b-button
        v-if="!isLoading"
        variant="primary"
        @click="enableEvent()"
      >
        {{ t('psaccounts.alertAccountNotEnabled.enableButton') }}
      </b-button>
      <b-link
        href="#"
        disabled
        v-else
      >
        {{ t('psaccounts.alertAccountNotEnabled.loading') }}
      </b-link>
    </p>
  </b-alert>
</template>

<script>
  import Locale from '@/mixins/locale';
  import {BAlert, BButton, BLink} from 'bootstrap-vue';

  /**
   * This sub-component can be used in a custom integration when the `PsAccounts`
   * component does not meets special needs. This part will display a warning message
   * telling the PS Accounts module is not enabled on the shop (and a button to enable it).
   */
  export default {
    name: 'AlertAccountNotEnabled',
    components: {
      BAlert,
      BButton,
      BLink,
    },
    mixins: [Locale],
    props: {
      /**
       * This is the display condition (do not use v-if="...", use this prop instead).
       */
      accountIsEnabled: {
        type: Boolean,
        default: false,
      },
      /**
      * Useful in order to display a loader if you perform some ajax.
      */
      isLoading: {
        type: Boolean,
        default: false,
      },
    },
    methods: {
      enableEvent() {
        /**
         * Emitted when enable button is clicked.
         * @type {Event}
         */
        this.$emit('enabled', true);
        this.$segment.track('ACC Click BO Activate Button', {
          Category: 'Accounts',
        });
      },
    },
    mounted() {
      this.$segment.track('ACC View Install component - activate state', {
        Category: 'Account',
      });
    },
  };
</script>
