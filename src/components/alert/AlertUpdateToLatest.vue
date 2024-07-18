<template>
  <PuikAlert
    :title="t('psaccounts.alert.ps_accounts.update.title')"
    :button-label="t('psaccounts.alert.ps_accounts.update.action')"
    variant="info"
    @click="update"
  >
    {{ t('psaccounts.alert.ps_accounts.update.message') }}
  </PuikAlert>
</template>

<script setup lang="ts">
import { useLocale } from '@/composables/useLocale';
import { PuikSnackbar } from '@prestashopcorp/puik';

interface AlertUpdateToLatestProps {
  updateLink: string | null;
}

const props = defineProps<AlertUpdateToLatestProps>();

const { t } = useLocale();

const update = async () => {
  if (props.updateLink) {
    try {
      // TODO:
      const response = await fetch('', { method: 'POST' });
      if (!response.ok) {
        throw new Error(`An error has occured: ${response.status}`);
      }
      const data = await response.json();

      if (data.update.status === false) {
        throw new Error('Cannot update ps_accounts module.');
      }
      window.location.reload();
    } catch (e) {
      PuikSnackbar({
        text: t('psaccounts.accountManager.errorInstallEnable'),
        variant: 'danger'
      });
    }
  }
};
</script>

<style scoped>

</style>
