<template>
  <puik-alert variant="warning">
    <p class="acc-m-0 acc-p-0">
      {{ $t('psaccounts.account.needToBeAdmin') }}
    </p>
    <p class="acc-m-0 acc-p-0">
      {{ $t('psaccounts.account.pleaseContact') }}
      <a
        :href="'mailto:' + superAdminEmail"
        class="acc-font-semibold acc-text-grey-900 acc-underline hover:acc-text-grey-600"
      >
        {{ superAdminEmail }}
      </a>
    </p>
  </puik-alert>
</template>

<script setup lang="ts">
/**
 * This component shows a warning alert isfthe user is not a superadmin
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
