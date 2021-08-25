<template>
  <div class="d-flex flex-column flex-grow-1 flex-md-row">
    <img
      class="mr-2 align-self-center"
      src="~@/assets/img/puffin_logo.png"
      width="46" />
    <div class="align-self-center">
      <template v-if="hasAllShopsLinked">
        <template v-if="hasShopsLinkedBySameUser">
          <span class="align-middle">{{ t('psaccounts.account.authorized') }}</span><br>
          <span class="text-muted">{{ linkedUserEmail }}</span>
        </template>
        <span
          v-else
          class="align-middle">
          Vos boutiques sont associées à plusieurs comptes PrestaShop
        </span>
      </template>
      <span
        v-else
        class="align-middle">
        {{ t('psaccounts.account.authorize') }}
      </span>
    </div>
  </div>
</template>

<script>
  import Locale from '@/mixins/locale';

  export default {
    name: 'AccountShopLinkMessage',
    mixins: [Locale],
    props: {
      shops: {
        type: Array,
        default: () => [],
      },
    },
    computed: {
      hasAllShopsLinked() {
        return this.shops.every((shop) => shop.uuid);
      },
      hasShopsLinkedBySameUser() {
        return this.shops.every((shop) => shop.user.uuid === this.shops[0].user.uuid);
      },
      linkedShops() {
        return this.shops.filter((shop) => shop.uuid);
      },
      linkedUserEmail() {
        return this.linkedShops[0]?.user?.email || '';
      },
    },
  };
</script>
