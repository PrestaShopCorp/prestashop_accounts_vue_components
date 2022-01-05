<template>
  <b-alert
    variant="warning"
    show
  >
    <h3>{{ t('psaccounts.alertAccountNotInstalled.title') }}</h3>
    <p>
      {{ t('psaccounts.alertAccountNotInstalled.message') }}.
    </p>
    <p class="mt-2">
      <b-button
        v-if="!isLoading"
        variant="primary"
        @click="installPsAccounts"
      >
        {{ t('psaccounts.alertAccountNotInstalled.installButton') }}
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
import {BAlert, BButton, BLink} from 'bootstrap-vue';
import Locale from '@/mixins/locale';
import useSegmentTracking from '@/composables/useSegmentTracking';
import installModule from '../../../lib/moduleManager/InstallModule';

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
    BLink,
  },
  props: {
    validatedContext: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const {trackPsAccountInstallButton} = useSegmentTracking();

    return {trackPsAccountInstallButton};
  },
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    installPsAccounts() {
      this.isLoading = true;

      this.trackPsAccountInstallButton();

      installModule(
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
