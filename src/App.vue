<template>
  <div id="app">
    <Account class="mb-2" />
    <AccountNotInstalled />
    <AccountNotEnabled />
    <MultiStoreSelector />
  </div>
</template>

<script>
  import AccountNotInstalled from './components/alert/AccountNotInstalled';
  import AccountNotEnabled from './components/alert/AccountNotEnabled';
  import MultiStoreSelector from './components/alert/MultiStoreSelector';
  import Account from './components/panel/Account';

  export default {
    name: 'App',
    components: {
      Account,
      AccountNotInstalled,
      AccountNotEnabled,
      MultiStoreSelector,
    },
  };
</script>

<style lang="scss">
  #app {
    @import '~bootstrap-vue/dist/bootstrap-vue';
    @import '~prestakit/dist/css/bootstrap-prestashop-ui-kit';
  }
</style>
