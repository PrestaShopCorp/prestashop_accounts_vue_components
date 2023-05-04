<template>
  <div
    v-if="!hasAllShopsWithoutUrl"
    class="acc-flex acc-space-x-4"
  >
    <puik-button
      v-if="!hasAllShopsLinked"
      id="associate-shop-button"
      :disabled="!backendUser.isSuperAdmin"
      @click="openLinkShopModal()"
    >
      {{ $t(`psaccounts.account.${isLinkedV4 ? 'reonboard' : 'connect'}Button`) }}
    </puik-button>

    <puik-button
      v-if="hasShopsLinked"
      id="manage-shops-button"
      variant="secondary"
      :disabled="!backendUser.isSuperAdmin"
      @click="openLinkShopModal('/shop')"
    >
      {{ $t(`psaccounts.account.manageAccountButton`) }}
    </puik-button>
  </div>
</template>

<script setup lang="ts">
import {
  computed
} from 'vue';
import { Shop } from '@/types/context';
import { PuikButton } from '@prestashopcorp/puik';
import { useLinkShopCrossDomain } from '@/composables/useLinkShopCrossDomain';

interface AccountLinkToUiProps {
  accountsUiUrl: string;
  app: string;
  backendUser: Record<string, any>;
  onboardingLink: string;
  shops?: Shop[];
  shopContext: number;
}

const props = withDefaults(defineProps<AccountLinkToUiProps>(), {
  shops: () => []
});

const unlinkedShops = computed(
  () => props.shops.filter((shop) => !shop.uuid || (shop.uuid && shop.isLinkedV4))
);

const unlinkedShopsWithEmployeeId = computed(() => unlinkedShops.value.map((shop) => ({
  ...shop,
  employeeId: props.backendUser.employeeId.toString()
})));

const { open, state } = useLinkShopCrossDomain({
  accountsUiUrl: props.accountsUiUrl,
  app: props.app,
  shops: unlinkedShopsWithEmployeeId.value
});

const hasAllShopsLinked = computed(() => unlinkedShops.value.length === 0);

const hasAllShopsWithoutUrl = computed(() => props.shops.every((shop) => shop.domain === null));

const hasShopsLinkedByUserInBackoffice = computed(() => props.shops.some(
  (shop) => shop.employeeId === props.backendUser.employeeId
));

const hasShopsLinkedWithoutEmployeeId = computed(() => props.shops.some(
  (shop) => shop.uuid !== null && !shop.isLinkedV4 && shop.employeeId === null
));

const hasShopsLinked = computed(
  () => hasShopsLinkedByUserInBackoffice.value || hasShopsLinkedWithoutEmployeeId.value
);

const isLinkedV4 = computed(() => props.shops.every((shop) => shop.isLinkedV4));

function openLinkShopModal (path: string = '') {
  if (!props.backendUser.isSuperAdmin) {
    return;
  }

  state.specificUiUrl = path;

  open();
}
</script>

<style>
</style>
