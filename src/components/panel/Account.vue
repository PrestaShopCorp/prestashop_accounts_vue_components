<template>
  <b-card
    no-body
  >
    <template v-slot:header>
      {{ $t('account.title') }}
    </template>
    <b-card-body>
      Hello !
    </b-card-body>
  </b-card>
</template>

<script>
  export default {
    name: 'Account',
  };
</script>
