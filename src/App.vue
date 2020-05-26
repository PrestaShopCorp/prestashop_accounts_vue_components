<template>
  <div id="app">
    <Account class="mb-2" />
    <AccountNotInstalled :account-is-installed="false" />
    <AccountNotEnabled :account-is-enabled="false" />
    <MultiStoreSelector :shops-tree="shopsTree" />
  </div>
</template>

<script>
  import AccountNotInstalled from './components/alert/AccountNotInstalled';
  import AccountNotEnabled from './components/alert/AccountNotEnabled';
  import MultiStoreSelector from './components/alert/MultiStoreSelector';
  import Account from './components/panel/Account';

  export default {
    name: 'App',
    data() {
      return {
        shopsTree: [
          {
            id: 1,
            name: 'Default',
            shops: [
              {
                id: 1,
                name: 'PrestaShop',
                url: 'http://localhost:8082/admin-dev/index.php?controller=AdminModules&setShopContext=s-1&token=7e6ed965a445faaa639275d16418264d',
              },
              {
                id: 2,
                name: 'shop2',
                url: 'http://localhost:8082/admin-dev/index.php?controller=AdminModules&setShopContext=s-2&token=7e6ed965a445faaa639275d16418264d',
              },
            ],
          },
          {
            id: 3,
            name: 'shop_group2',
            shops: [
              {
                id: 3,
                name: 'shop3',
                url: 'http://localhost:8082/admin-dev/index.php?controller=AdminModules&setShopContext=s-3&token=7e6ed965a445faaa639275d16418264d',
              },
            ],
          },
          {
            id: 2,
            name: 'test',
            shops: [
              {
                id: 4,
                name: 'shop4',
                url: 'http://localhost:8082/admin-dev/index.php?controller=AdminModules&setShopContext=s-4&token=7e6ed965a445faaa639275d16418264d',
              },
            ],
          },
        ],
      };
    },
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
