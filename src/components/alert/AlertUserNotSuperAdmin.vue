<template>
  <puik-alert
    variant="warning"
    data-testid="user-not-admin-alert"
  >
    <p
      class="acc-m-0 acc-p-0"
    >
      {{ t('psaccounts.account.needToBeAdmin') }}
    </p>
    <p
      class="acc-m-0 acc-p-0"
      data-testid="user-not-admin-alert-message"
    >
      {{ t('psaccounts.account.pleaseContact') }}
      <puik-link :href="'mailto:' + superAdminEmail">
        {{ superAdminEmail }}
      </puik-link>
    </p>
  </puik-alert>
</template>

<script setup lang="ts">
import { useLocale } from '@/composables/useLocale';
/**
 * This component shows a warning alert if the user is not a superadmin
 * and tell him to contact one to continue the process.
 */

interface AlertUserNotSuperAdminProps {
  /**
  * Super admin email
  */
  superAdminEmail: string;
}

defineProps<AlertUserNotSuperAdminProps>();

const { t } = useLocale();
</script>
