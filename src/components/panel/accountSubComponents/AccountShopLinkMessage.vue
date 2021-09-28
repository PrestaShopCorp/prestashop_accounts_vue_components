<template>
  <div class="d-flex flex-column flex-grow-1 flex-md-row">
    <img
      class="mr-md-2 align-self-center"
      src="~@/assets/img/puffin_logo.png"
      width="46"
    >
    <div class="my-2 text-center my-md-0 align-self-center text-md-left">
      <template v-if="hasSomeShopsLinked">
        <template v-if="hasShopsLinkedBySameUser">
          <span class="align-middle">{{ t('psaccounts.account.authorized') }}</span><br>
          <span class="text-muted">{{ linkedUserEmail }}</span>
        </template>
        <span
          v-else
          class="align-middle"
        >
          {{ t('psaccounts.account.authorizedSeveral') }}
        </span>
      </template>
      <span
        v-else
        class="align-middle"
      >
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
      hasSomeShopsLinked() {
        return this.shops.some((shop) => shop.uuid);
      },
      hasShopsLinkedBySameUser() {
        return this.shops.every((shop) => shop.employeeId === this.shops[0].employeeId);
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
