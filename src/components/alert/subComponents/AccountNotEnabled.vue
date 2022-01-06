<template>
  <b-alert
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
        @click="enablePsAccounts"
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
  import {BAlert, BButton, BLink} from 'bootstrap-vue';
  import Locale from '@/mixins/locale';
  import useSegmentTracking from '@/composables/useSegmentTracking';
  import enableModule from '../../../lib/moduleManager/EnableModule';

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
      validatedContext: {
        type: Object,
        required: true,
      },
    },
    setup() {
      const {trackPsAccountEnableButton} = useSegmentTracking();

      return {trackPsAccountEnableButton};
    },
    data() {
      return {
        isLoading: false,
      };
    },
    methods: {
      enablePsAccounts() {
        this.isLoading = true;

        this.trackPsAccountEnableButton();

        enableModule(
          'ps_accounts',
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
