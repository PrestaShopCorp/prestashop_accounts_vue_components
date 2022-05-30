<template>
  <ModuleAlert
    v-if="alert.module && alert.action"
    :title="$t(`psaccounts.alert.${alert.module}.${alert.action}.title`)"
    :message="$t(`psaccounts.alert.${alert.module}.${alert.action}.message`)"
    :action-text="$t(`psaccounts.alert.${alert.module}.${alert.action}.action`)"
    :loading-text="$t(`psaccounts.alert.${alert.module}.${alert.action}.loading`)"
    :loading="loading"
    @action="onAction"
  />
</template>

<script lang="ts">
import {
  computed,
  defineComponent, ref,
} from 'vue-demi';
import ModuleAlert from '@/components/alert/ModuleAlert.vue';
import usePSModuleManagement, {Action, Module} from '@/composables/usePSModuleManagement';
import useSegmentTracking from '@/composables/useSegmentTracking';
import usePSAccountsContext from '@/composables/usePSAccountsContext';

/**
   * This sub-component can be used in a custom integration when the `PsAccounts`
   * component does not meets special needs. This part will display a warning message
   * telling the PS Accounts module is not enabled on the shop (and a button to enable it).
   */
export default defineComponent({
  name: 'PsAccountComponentAlertDisplay',
  components: {
    ModuleAlert,
  },
  setup(_, {emit}) {
    const loading = ref(false);

    const {
      context,
      eventbusShouldBeEnabled,
      eventbusShouldBeInstalled,
      eventbusInstallLink,
      eventbusEnableLink,
    } = usePSAccountsContext();

    const {manageModule} = usePSModuleManagement(context.value.psIs17 || false);

    const {trackModuleAction} = useSegmentTracking();

    const alert = computed(() => {
      if (!context.value.psAccountsIsInstalled) {
        return {
          module: Module.PsAccounts,
          action: Action.Install,
          link: context.value.psAccountsInstallLink,
        };
      }

      if (!context.value.psAccountsIsEnabled) {
        return {
          module: Module.PsAccounts,
          action: Action.Enable,
          link: context.value.psAccountsEnableLink,
        };
      }

      if (!context.value.psAccountsIsUptodate) {
        return {
          module: Module.PsAccounts,
          action: Action.Update,
          link: context.value.psAccountsUpdateLink,
        };
      }

      if (eventbusShouldBeInstalled.value) {
        return {
          module: Module.PsEventbus,
          action: Action.Install,
          link: eventbusInstallLink.value,
        };
      }

      if (eventbusShouldBeEnabled.value) {
        return {
          module: Module.PsEventbus,
          action: Action.Enable,
          link: eventbusEnableLink.value,
        };
      }

      return {
        module: null,
        action: null,
        link: null,
      };
    });

    async function onAction() {
      if (!alert.value.module || !alert.value.action || !alert.value.link) {
        return;
      }

      try {
        loading.value = true;

        trackModuleAction(alert.value.module, alert.value.action);

        await manageModule(
          alert.value.module,
          alert.value.action,
          alert.value.link,
        );
        window.location.reload();
      } catch (e) {
        loading.value = false;
        emit('hasError', e);
      }
    }

    return {
      alert,
      loading,
      onAction,
    };
  },
});
</script>
