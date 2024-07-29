<template>
  <div
    class="acc-gap-8 md:acc-gap-2 acc-items-center acc-flex"
  >
    <puik-button
      v-if="shops.length"
      id="associate-shop-button"
      class="acc-w-1/2 md:acc-w-auto"
      :disabled="!isSuperAdmin"
      data-testid="account-link-to-ui-link-shop-button"
      @click="openLinkShopModal()"
    >
      {{ t(`psaccounts.account.connectButton`) }}
    </puik-button>

    <puik-button
      v-if="hasShopsLinked"
      id="manage-shops-button"
      class="acc-w-1/2 md:acc-w-auto"
      variant="secondary"
      data-testid="account-link-to-ui-manage-shops-button"
      :disabled="!isSuperAdmin"
      @click="openLinkShopModal('/shop')"
    >
      {{ t(`psaccounts.account.manageAccountButton`) }}
    </puik-button>
  </div>
</template>

<script setup lang="ts">
import { Shop } from '@/types/context';
import { useLinkShopCrossDomain } from '@/composables/useLinkShopCrossDomain';
import { useLocale } from '@/composables/useLocale';

interface AccountLinkToUiProps {
  accountsUiUrl: string;
  app: string;
  isSuperAdmin: boolean;
  shops?: Shop[];
  hasShopsLinked: boolean;
}

const props = withDefaults(defineProps<AccountLinkToUiProps>(), {
  shops: () => []
});

const { t } = useLocale();

const { open, state } = useLinkShopCrossDomain({
  accountsUiUrl: props.accountsUiUrl,
  app: props.app,
  shops: props.shops
});

function openLinkShopModal (path: string = '') {
  state.specificUiUrl = path;

  open();
}
</script>
