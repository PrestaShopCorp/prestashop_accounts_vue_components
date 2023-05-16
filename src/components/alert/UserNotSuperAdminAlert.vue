<template>
  <puik-alert variant="warning">
    <p class="acc-m-0 acc-p-0">
      {{ $t('psaccounts.account.needToBeAdmin') }}
    </p>
    <p class="acc-m-0 acc-p-0">
      {{ $t('psaccounts.account.pleaseContact') }}
      <puik-link :href="'mailto:' + superAdminEmail">
        {{ superAdminEmail }}
      </puik-link>
    </p>
  </puik-alert>
</template>

<script setup lang="ts">
/**
 * This component shows a warning alert if the user is not a superadmin
 * and tell him to contact one to continue the process.
 */

interface UserNotSuperAdminAlert {
  /**
  * Super admin email
  */
  superAdminEmail: string;
}

defineProps<UserNotSuperAdminAlert>();
</script>
