<template>
  <b-alert
    v-if="!accountIsUpToDate"
    variant="warning"
    show
  >
    <h3>{{ t('psaccounts.alertAccountNeedsUpdate.title') }}</h3>
    <p>
      {{ t('psaccounts.alertAccountNeedsUpdate.message') }}.
    </p>
    <p class="mt-2">
      <b-button
        v-if="!isLoading"
        variant="primary"
        @click="updateEvent()"
      >
        {{ t('psaccounts.alertAccountNeedsUpdate.installButton') }}
      </b-button>
      <b-link
        href="#"
        disabled
        v-else
      >
        {{ t('psaccounts.alertAccountNotInstalled.loading') }}
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
   * telling the PS Accounts module is not installed on the shop (and a button to install it).
   */
  export default {
    name: 'AlertAccountNotUpdated',
    mixins: [Locale],
    components: {
      BAlert,
      BButton,
      BLink,
    },
    props: {
      /**
       * This is the display condition (do not use v-if="...", use this prop instead).
       */
      accountIsUptodate: {
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
      updateEvent() {
        /**
         * Emitted when update button is clicked.
         * @type {Event}
         */
        this.$emit('update', true);
        this.$segment.track('ACC Click BO Update button', {
          category: 'Accounts',
        });
      },
    },
    mounted() {
      this.$segment.track('ACC View Update component - update state', {
        category: 'Account',
      });
    },
  };
</script>
