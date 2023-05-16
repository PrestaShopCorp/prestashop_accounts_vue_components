<template>
  <div
    class="acc-flex acc-space-x-4"
  >
    <puik-button
      v-if="shops.length"
      id="associate-shop-button"
      :disabled="!isSuperAdmin"
      @click="openLinkShopModal()"
    >
      {{ $t(`psaccounts.account.${isLinkedV4 ? 'reonboard' : 'connect'}Button`) }}
    </puik-button>

    <puik-button
      v-if="hasShopsLinked"
      id="manage-shops-button"
      variant="secondary"
      @click="openLinkShopModal('/shop')"
    >
      {{ $t(`psaccounts.account.manageAccountButton`) }}
    </puik-button>
  </div>
</template>

<script setup lang="ts">
import { Shop } from '@/types/context';
import { useLinkShopCrossDomain } from '@/composables/useLinkShopCrossDomain';

interface AccountLinkToUiProps {
  accountsUiUrl: string;
  app: string;
  isSuperAdmin: boolean;
  shops?: Shop[];
  hasShopsLinked: boolean;
  isLinkedV4?: boolean;
}

const props = withDefaults(defineProps<AccountLinkToUiProps>(), {
  shops: () => []
});

const { open, state } = useLinkShopCrossDomain({
  accountsUiUrl: props.accountsUiUrl,
  app: props.app,
  shops: props.shops
});

function openLinkShopModal (path: string = '') {
  if (!props.isSuperAdmin) {
    return;
  }

  state.specificUiUrl = path;

  open();
}
</script>

<style>
</style>
