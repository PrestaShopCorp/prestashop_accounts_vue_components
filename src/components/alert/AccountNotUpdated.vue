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
        @click="updatePsAccounts()"
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
  import updateModule from '../../lib/moduleManager/UpdateModule';

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
      updatePsAccounts() {
        this.isLoading = true;
        this.$segment.track('ACC Click BO Update button', {
          category: 'Accounts',
        });
        updateModule(
          'ps_accounts',
          this.validatedContext.psAccountsUpdateLink,
          this.validatedContext.psIs17,
        ).catch(() => {
          this.isLoading = false;
          this.$emit('hasError');
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
