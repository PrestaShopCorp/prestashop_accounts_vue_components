<template>
  <puik-alert
    variant="danger"
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
