<template>
  <div>
    <AccountNotInstalled
      v-if="!psAccountsIsInstalled"
      :validated-context="validatedContext"
      @hasError="$emit('hasError')"
    />
    <AccountNotEnabled
      v-else-if="!psAccountsIsEnabled"
      :validated-context="validatedContext"
      @hasError="$emit('hasError')"
    />
    <AccountNotUpdated
      v-else-if="!psAccountsIsUptodate"
      :validated-context="validatedContext"
      @hasError="$emit('hasError')"
    />
    <EventBusNotInstalled
      v-if="undefined !== validatedContext.dependencies
        && !validatedContext.dependencies.ps_eventbus.isInstalled"
      :validated-context="validatedContext"
      @hasError="$emit('hasError')"
    />
  </div>
</template>

<script>
  import Locale from '@/mixins/locale';
  import AccountNotEnabled from '@/components/alert/subComponents/AccountNotEnabled';
  import AccountNotInstalled from '@/components/alert/subComponents/AccountNotInstalled';
  import AccountNotUpdated from '@/components/alert/subComponents/AccountNotUpdated';
  import EventBusNotInstalled from '@/components/alert/subComponents/EventBusNotInstalled';

  /**
   * This sub-component can be used in a custom integration when the `PsAccounts`
   * component does not meets special needs. This part will display a warning message
   * telling the PS Accounts module is not enabled on the shop (and a button to enable it).
   */
  export default {
    name: 'PsAccountComponentAlertDisplay',
    components: {
      AccountNotEnabled,
      AccountNotInstalled,
      AccountNotUpdated,
      EventBusNotInstalled,
    },
    mixins: [Locale],
    props: {
      validatedContext: {
        type: Object,
        required: true,
      },
    },
    computed: {
      psAccountsIsInstalled() {
        return this.validatedContext.psAccountsIsInstalled;
      },

      psAccountsIsUptodate() {
        return this.validatedContext.psAccountsIsUptodate;
      },

      psAccountsIsEnabled() {
        return this.validatedContext.psAccountsIsEnabled;
      },
    },
  };
</script>
