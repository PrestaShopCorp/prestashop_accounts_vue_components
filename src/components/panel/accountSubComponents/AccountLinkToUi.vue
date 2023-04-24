<template>
  <div
    v-if="!hasAllShopsWithoutUrl"
    class="acc-flex acc-space-x-4"
  >
    <puik-button
      v-if="!hasAllShopsLinked"
      id="associate-shop-button"
      :disabled="!backendUser.isSuperAdmin"
      @click="openLinkShopModal(isLinkedV4 ? 'reonboard' : 'associate')"
    >
      {{ $t(`psaccounts.account.${isLinkedV4 ? 'reonboard' : 'connect'}Button`) }}
    </puik-button>

    <puik-button
      v-if="hasShopsLinked"
      id="manage-shops-button"
      variant="secondary"
      :disabled="!backendUser.isSuperAdmin"
      @click="openLinkShopModal('manage')"
    >
      {{ $t(`psaccounts.account.manageAccountButton`) }}
    </puik-button>

    <link-shop-modal
      v-if="cdcUiDisplayed"
      :accounts-ui-url="accountsUiUrl"
      :app="app"
      :on-boarding-link="onboardingLink"
      :shops="unlinkedShopsWithEmployeeId"
      :specific-ui-url="specificUiUrl"
      @closed="closeOnBoarding"
    />
  </div>
</template>

<script setup lang="ts">
import {
  computed, ref
} from 'vue';
import { Shop, ShopContext } from '@/types/context';
import { PuikButton } from '@prestashopcorp/puik';
import LinkShopModal from '@/components/crossdomains/LinkShopModal.vue';

type actionToUrlType = {
  reonboard: string,
  associate: string,
  unlink: string,
  manage: string,
  connect: string
};

type actions = 'reonboard'|'associate'|'manage'|'connect';

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

const cdcUiDisplayed = ref(false);

const unlinkedShops = computed(
  () => props.shops.filter((shop) => !shop.uuid || (shop.uuid && shop.isLinkedV4))
);

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

const specificUiUrl = ref('');
const chooseUiUrlFromAction: actionToUrlType = {
  reonboard: '',
  associate: '',
  unlink: `/shop/${props.shops[0].uuid}`,
  manage: '/shop',
  connect: '/shop'
};

const unlinkedShopsWithEmployeeId = computed(() => unlinkedShops.value.map((shop) => ({
  ...shop,
  employeeId: props.backendUser.employeeId.toString()
})));

function openLinkShopModal (act: actions) {
  if (!props.backendUser.isSuperAdmin) {
    return;
  }

  specificUiUrl.value = chooseUiUrlFromAction?.[act];

  cdcUiDisplayed.value = true;
}

function closeOnBoarding () {
  cdcUiDisplayed.value = false;
  window.location.reload();
}
</script>

<style>
</style>
