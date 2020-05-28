<template>
  <div id="app">
    <PsAccounts>
      PSX
    </PsAccounts>
  </div>
</template>

<script>
  import PsAccounts from '@/components/PsAccounts';

  export default {
    name: 'App',
    components: {
      PsAccounts,
    },
  };
</script>

<style lang="scss">
  #app {
    @import '~bootstrap-vue/dist/bootstrap-vue';
    @import '~prestakit/dist/css/bootstrap-prestashop-ui-kit';
  }
</style>
