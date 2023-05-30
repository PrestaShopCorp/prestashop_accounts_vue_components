<template>
  <puik-alert
    variant="danger"
    data-testid="account-context-validator-alert"
  >
    &lt;PsAccounts&gt; integration: Given context is invalid:
    {{ errors.join(';') }}
  </puik-alert>
</template>

<script setup lang="ts">
interface ContextValidatorAlertProps {
  errors: string[]
}
defineProps<ContextValidatorAlertProps>();
</script>

<style scoped>

</style>
