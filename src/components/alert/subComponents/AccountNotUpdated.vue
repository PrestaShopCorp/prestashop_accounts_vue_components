<template>
  <b-alert
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
        @click="updatePsAccounts"
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
import {BAlert, BButton, BLink} from 'bootstrap-vue';
import Locale from '@/mixins/locale';
import useSegmentTracking from '@/composables/useSegmentTracking';
import updateModule from '../../../lib/moduleManager/UpdateModule';

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
  setup() {
    const {trackPsAccountUpdateButton} = useSegmentTracking();

    return {trackPsAccountUpdateButton};
  },
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    updatePsAccounts() {
      this.isLoading = true;

      this.trackPsAccountUpdateButton();

      updateModule(
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
