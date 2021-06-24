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

        this.$segment.track('[ACC] PSAccount Install Button Clicked', {
          shop_bo_id: this.validatedContext.currentShop.id,
          ps_module_from: this.validatedContext.psxName,
          v4_onboarded: this.validatedContext.isOnboardedV4,
          multishop_numbers: this.validatedContext.shops.length || 1,
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
  };
</script>
