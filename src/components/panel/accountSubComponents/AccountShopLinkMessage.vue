<template>
  <div class="acc-flex acc-flex-col acc-flex-grow acc-items-center md:acc-flex-row">
    <img
      :src="require('@/assets/img/logo.png')"
      class="acc-w-11 acc-h-11 md:acc-mr-3" />
    <div class="acc-mt-2 acc-font-primary acc-text-sm acc-text-center acc-align-middle md:acc-mt-0 md:acc-text-left">
      <template v-if="hasSomeShopsLinked">
        <div
          v-if="hasShopsLinkedBySameUser"
        >
          <p class="acc-m-0">
            {{ $tc('psaccounts.account.authorized', linkedShops.length) }}
          </p>
          <p class="acc-m-0 acc-text-font-500 acc-break-words">
            {{ linkedUserEmail }}
          </p>
        </div>
        <span
          v-else-if="hasOneOrMoreNotLinkedShop"
        >
          {{ $t('psaccounts.account.authorizedPartially') }}
        </span>
        <span
          v-else
        >
          {{ $t('psaccounts.account.authorizedSeveral') }}
        </span>
      </template>
      <span
        v-else
      >
        {{ $t('psaccounts.account.authorize') }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import PuffinLogo from '@/assets/img/puffin_logo.vue';
import { Shop } from '@/types/context';
interface AccountShopLinkMessageProps {
  shops?: Shop[];
}

const props = withDefaults(defineProps<AccountShopLinkMessageProps>(), {
  shops: () => []
});

const hasOneOrMoreNotLinkedShop = computed(() => props.shops.some((shop) => !shop.uuid));

const hasSomeShopsLinked = computed(
  () => props.shops.some((shop) => shop.uuid && !shop.isLinkedV4)
);

const hasShopsLinkedBySameUser = computed(
  () => props.shops.every((shop) => shop.employeeId === props.shops[0].employeeId)
);

const linkedShops = computed(() => props.shops.filter((shop) => shop.uuid && !shop.isLinkedV4));

const linkedUserEmail = computed(() => linkedShops.value[0]?.user?.email || '');
</script>
