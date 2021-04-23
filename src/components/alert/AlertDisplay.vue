<template>
  <div>
    <AccountNotInstalled
      v-if="!psAccountsIsInstalled"
      :account-is-installed="psAccountsIsInstalled"
      :is-loading="installLoading"
      @install="installPsAccounts()"
    />
    <AccountNotEnabled
      v-else-if="!psAccountsIsEnabled"
      :account-is-enabled="psAccountsIsEnabled"
      :is-loading="enableLoading"
      @enabled="enablePsAccounts()"
    />
    <AccountNotUpdated
      v-else-if="!psAccountsIsUptodate"
      :account-is-uptodate="psAccountsIsUptodate"
      :is-loading="installLoading"
      @install="updatePsAccounts()"
    />
    <EventBusNotInstalled
      v-if="undefined !== validatedContext.dependencies
      && !validatedContext.dependencies.ps_eventbus.isInstalled"
      :install-loading="installLoading"
      @installEventBus="installEventBus"
    />
  </div>
</template>

<script>
  import Locale from '@/mixins/locale';
  import AccountNotEnabled from '@/components/alert/AccountNotEnabled';
  import AccountNotInstalled from '@/components/alert/AccountNotInstalled';
  import AccountNotUpdated from '@/components/alert/AccountNotUpdated';
  import EventBusNotInstalled from '@/components/alert/EventBusNotInstalled';

  /**
   * This sub-component can be used in a custom integration when the `PsAccounts`
   * component does not meets special needs. This part will display a warning message
   * telling the PS Accounts module is not enabled on the shop (and a button to enable it).
   */
  export default {
    name: 'AlertDisplay',
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
    data() {
      return {
        installLoading: false,
        enableLoading: false,
        hasError: false,
      };
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
    methods: {
      userIsConnected() {
        return this.validatedContext.user.email !== null;
      },

      manageModuleAction17(action) {
        return fetch(action.actionLink, {
          method: 'POST',
        }).then((response) => response.json(),
        ).then((json) => {
          if (json[action.module].status === false) {
            throw new Error(`Cannot ${action.action} ${action.module} module.`);
          }
          return json;
        });
      },

      async manageModuleAction16(action) {
        window.location.href = action.actionLink;
      },

      manageModuleAction(action) {
        // if on ps before 1.7.3 just reload the page
        if (!this.validatedContext.psIs17) {
          return this.manageModuleAction16(action);
        }
        return this.manageModuleAction17(action);
      },

      installModule(moduleName, actionLink) {
        this.hasError = false;
        this.installLoading = true;

        this.manageModuleAction({
          module: moduleName,
          action: 'install',
          actionLink,
        }).then(() => {
          window.location.reload();
        }).catch(() => {
          this.installLoading = false;
          this.hasError = true;
        });
      },

      installPsAccounts() {
        this.eventCallback('install_ps_accounts');

        this.installModule(
          'ps_accounts',
          this.validatedContext.psAccountsInstallLink,
        );
      },

      installEventBus() {
        this.installModule(
          'ps_eventbus',
          this.validatedContext.dependencies.ps_eventbus.installLink,
        );
      },

      enableModule(moduleName, actionLink) {
        this.hasError = false;
        this.enableLoading = true;

        this.manageModuleAction({
          module: moduleName,
          action: 'enable',
          actionLink,
        }).then(() => {
          window.location.reload();
        }).catch(() => {
          this.enableLoading = false;
          this.hasError = true;
        });
      },

      enablePsAccounts() {
        this.eventCallback('enable_ps_accounts');

        this.enableModule(
          'ps_accounts',
          this.validatedContext.psAccountsEnableLink,
        );
      },

      updateModule(moduleName, actionLink) {
        this.hasError = false;
        this.installLoading = true;

        return this.manageModuleAction({
          module: moduleName,
          action: 'update',
          actionLink,
        }).then(() => {
          window.location.reload();
        }).catch(() => {
          this.installLoading = false;
          this.hasError = true;
        });
      },

      updatePsAccounts() {
        this.updateModule(
          'ps_accounts',
          this.validatedContext.psAccountsUpdateLink,
        );
      },
    },
    mounted() {
      this.$segment.track('ACC View Error display component', {
        category: 'Account',
      });
    },
  };
</script>
