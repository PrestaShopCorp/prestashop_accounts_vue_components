<template>
  <div class="d-flex flex-column flex-grow-1 flex-md-row mr-md-3">
    <img
      class="mr-md-2 align-self-center"
      src="~@/assets/img/puffin_logo.png"
      width="44"
      height="44"
    >
    <div class="my-3 text-center align-middle align-self-center my-md-0 text-md-left">
      <template v-if="hasSomeShopsLinked">
        <div
          v-if="hasShopsLinkedBySameUser"
          class="text-left text-sm-center text-md-left"
        >
          <p class="m-0 align-middle">
            {{ t('psaccounts.account.authorized') }}
          </p>
          <p class="m-0 align-middle text-break text-muted d-md-block">
            {{ linkedUserEmail }}
          </p>
        </div>
        <span
          v-else-if="hasOneOrMoreNotLinkedShop"
        >
          {{ t('psaccounts.account.authorizedPartially') }}
        </span>
        <span
          v-else
        >
          {{ t('psaccounts.account.authorizedSeveral') }}
        </span>
      </template>
      <span
        v-else
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
    hasOneOrMoreNotLinkedShop() {
      return this.shops.some((shop) => !shop.uuid);
    },
    hasSomeShopsLinked() {
      return this.shops.some((shop) => shop.uuid && !shop.isLinkedV4);
    },
    hasShopsLinkedBySameUser() {
      return this.shops.every((shop) => shop.employeeId === this.shops[0].employeeId);
    },
    linkedShops() {
      return this.shops.filter((shop) => shop.uuid && !shop.isLinkedV4);
    },
    linkedUserEmail() {
      return this.linkedShops[0]?.user?.email || '';
    },
  },
};
</script>
