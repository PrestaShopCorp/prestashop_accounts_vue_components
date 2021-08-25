<template>
  <div>
    <AccountNotInstalled
      v-if="!psAccountsIsInstalled"
      :link="context.psAccountsInstallLink"
      :psIs17="context.psIs17"
      @hasError="$emit('hasError')"
    />
    <AccountNotEnabled
      v-else-if="!psAccountsIsEnabled"
      :link="context.psAccountsEnableLink"
      :psIs17="context.psIs17"
      @hasError="$emit('hasError')"
    />
    <AccountNotUpdated
      v-else-if="!psAccountsIsUptodate"
      :link="context.psAccountsUpdateLink"
      :psIs17="context.psIs17"
      @hasError="$emit('hasError')"
    />
    <EventBusNotInstalled
      v-if="!eventbusIsInstalled"
      :link="context.dependencies.ps_eventbus.installLink"
      :psIs17="context.psIs17"
      @hasError="$emit('hasError')"
    />
  </div>
</template>

<script>
  import context, {eventbusIsInstalled} from '@/lib/context';
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
    computed: {
      context,
      eventbusIsInstalled,
      psAccountsIsInstalled() {
        return this.context.psAccountsIsInstalled;
      },

      psAccountsIsUptodate() {
        return this.context.psAccountsIsUptodate;
      },

      psAccountsIsEnabled() {
        return this.context.psAccountsIsEnabled;
      },
    },
  };
</script>
