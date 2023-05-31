<template>
  <puik-alert
    v-if="error"
    class="acc-mb-4"
    variant="danger"
    @dismissed="error = false"
  >
    {{ $t('psaccounts.accountManager.errorInstallEnable') }}
  </puik-alert>
  <puik-alert
    v-if="alert.module && alert.action"
    :title="$t(`psaccounts.alert.${alert.module}.${alert.action}.title`)"
    :button-label="loading ? $t(`psaccounts.alert.${alert.module}.${alert.action}.loading`) : $t(`psaccounts.alert.${alert.module}.${alert.action}.action`)"
    variant="warning"
    data-testid="account-module-dependencies-alert"
    @click="onAction"
  >
    {{ $t(`psaccounts.alert.${alert.module}.${alert.action}.message`) }}
  </puik-alert>
</template>

<script setup lang="ts">
import { Module, Action } from '@/lib/utils';
import { ref, computed } from 'vue';

interface AlertModuleDependenciesProps {
  psAccountsIsEnabled: boolean;
  psAccountsEnableLink: string | null;
  psAccountsIsInstalled: boolean;
  psAccountsInstallLink: string | null;
  psAccountsIsUptodate: boolean;
  psAccountsUpdateLink: string | null;
  psIs17: boolean;
}

const loading = ref(false);
const error = ref(false);

const props = defineProps<AlertModuleDependenciesProps>();

const alert = computed(() => {
  if (!props.psAccountsIsInstalled) {
    return {
      module: Module.PsAccounts,
      action: Action.Install,
      link: props.psAccountsInstallLink
    };
  }

  if (!props.psAccountsIsEnabled) {
    return {
      module: Module.PsAccounts,
      action: Action.Enable,
      link: props.psAccountsEnableLink
    };
  }

  if (!props.psAccountsIsUptodate) {
    return {
      module: Module.PsAccounts,
      action: Action.Update,
      link: props.psAccountsUpdateLink
    };
  }

  return {
    module: null,
    action: null,
    link: null
  };
});

async function onAction () {
  if (!alert.value.module || !alert.value.action || !alert.value.link) {
    return;
  }

  try {
    loading.value = true;
    const response = await fetch(alert.value.link, { method: 'POST' });
    if (props.psIs17) {
      if (!response.ok) {
        throw new Error(`An error has occured: ${response.status}`);
      }
      const data = await response.json();

      if (data[alert.value.module].status === false) {
        throw new Error(`Cannot ${alert.value.action} ${alert.value.module} module.`);
      }
      window.location.reload();
    }
  } catch (e) {
    loading.value = false;
    error.value = true;
  }
}
</script>

<style scoped>

</style>
