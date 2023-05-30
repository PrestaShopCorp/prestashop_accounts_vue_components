<template>
  <div
    class="acc-flex acc-flex-col acc-flex-grow acc-items-center md:acc-flex-row"
  >
    <img
      :src="PsLogo"
      class="acc-w-11 acc-h-11 md:acc-mr-3"
    >
    <div
      class="acc-mt-2 puik-body-default acc-text-center acc-align-middle md:acc-mt-0 md:acc-text-left"
      data-testid="account-shop-link-message"
    >
      <template v-if="linkedShops.length">
        <div v-if="shopContext === ShopContext.All || props.shopContext === ShopContext.Group">
          <p
            v-if="linkedShops.length === shopsInContext.length"
            class="acc-m-0"
            data-testid="account-shop-link-message-all-shops-linked"
          >
            {{ $t('psaccounts.account.authorizedMultishop') }}
          </p>
          <span
            v-else
            data-testid="account-shop-link-message-partially-linked-shops"
          >
            {{ $t('psaccounts.account.authorizedPartially') }}
          </span>
        </div>
        <div v-else>
          <p
            class="acc-m-0"
            data-testid="account-shop-link-message-single-shop-linked"
          >
            {{ $t('psaccounts.account.authorized') }}
          </p>
          <p
            class="acc-m-0 acc-text-font-500 acc-break-words"
            data-testid="account-shop-link-message-linked-email"
          >
            {{ linkedUserEmail }}
          </p>
        </div>
      </template>
      <p
        v-else
        class="acc-m-0"
        data-testid="account-shop-link-message-not-linked"
      >
        {{ $tc('psaccounts.account.authorize', shopsInContext.length) }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Shop, ShopContext } from '@/types/context';
import PsLogo from '@/assets/img/logo.png';
interface AccountShopLinkMessageProps {
  shopsInContext?: Shop[];
  shopContext: number;
}

const props = withDefaults(defineProps<AccountShopLinkMessageProps>(), {
  shopsInContext: () => []
});

const linkedShops = computed(() => props.shopsInContext.filter((shop) => shop.uuid && !shop.isLinkedV4));

const linkedUserEmail = computed(() => linkedShops.value[0]?.user?.email ?? '');
</script>
