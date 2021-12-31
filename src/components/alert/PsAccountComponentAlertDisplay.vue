<template>
  <div>
    <AccountNotInstalled
      v-if="!context.psAccountsIsInstalled"
      :link="context.psAccountsInstallLink"
      :ps-is17="context.psIs17"
      @hasError="$emit('hasError')"
    />
    <AccountNotEnabled
      v-else-if="!context.psAccountsIsEnabled"
      :link="context.psAccountsEnableLink"
      :ps-is17="context.psIs17"
      @hasError="$emit('hasError')"
    />
    <AccountNotUpdated
      v-else-if="!context.psAccountsIsUptodate"
      :link="context.psAccountsUpdateLink"
      :ps-is17="context.psIs17"
      @hasError="$emit('hasError')"
    />
    <EventBusNotInstalled
      v-if="!eventbusIsInstalled"
      :link="context.dependencies.ps_eventbus.installLink"
      :ps-is17="context.psIs17"
      @hasError="$emit('hasError')"
    />
    <EventBusNotEnabled
      v-if="!eventbusIsEnabled"
      :link="context.dependencies.ps_eventbus.enableLink"
      :ps-is17="context.psIs17"
      @hasError="$emit('hasError')"
    />
  </div>
</template>

<script>
  import context, {eventbusIsEnabled, eventbusIsInstalled} from '@/lib/context';
  import Locale from '@/mixins/locale';
  import AccountNotEnabled from '@/components/alert/subComponents/AccountNotEnabled';
  import AccountNotInstalled from '@/components/alert/subComponents/AccountNotInstalled';
  import AccountNotUpdated from '@/components/alert/subComponents/AccountNotUpdated';
  import EventBusNotEnabled from '@/components/alert/subComponents/EventBusNotEnabled';
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
      EventBusNotEnabled,
      EventBusNotInstalled,
    },
    mixins: [Locale],
    computed: {
      context,
      eventbusIsEnabled,
      eventbusIsInstalled,
    },
  };
</script>
