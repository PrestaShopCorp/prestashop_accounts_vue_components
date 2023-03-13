<template>
  <div v-if="!hasAllShopsWithoutUrl">
    <component
      :is="hasShopsLinked ? 'BaseDropdown' : 'BaseButton'"
      v-if="!hasAllShopsLinked"
      :id="`associate-shop-${hasShopsLinked ? 'dropdown' : 'button'}`"
      :text="$t(`psaccounts.account.${isLinkedV4 ? 'reonboard' : 'connect'}Button`)"
      :disabled="!backendUser.isSuperAdmin"
      @click="openLinkShopModal(isLinkedV4 ? 'reonboard' : 'associate')"
    >
      <BaseDropdownItemButton
        v-if="hasShopsLinked"
        @click="openLinkShopModal('manage')"
      >
        {{ $t(`psaccounts.account.manageAccountButton`) }}
      </BaseDropdownItemButton>
      <template v-else>
        {{ $t(`psaccounts.account.${isLinkedV4 ? 'reonboard' : 'connect'}Button`) }}
      </template>
    </component>

    <component
      :is="isShopContext && hasShopsLinkedByUserInBackoffice ? 'BaseDropdown' : 'BaseButton'"
      v-else-if="hasShopsLinked"
      :id="`manage-shops-${ isShopContext ? 'dropdown' : 'button'}`"
      variant="secondary"
      :text="$t(`psaccounts.account.manageAccountButton`)"
      :disabled="!backendUser.isSuperAdmin"
      @click="openLinkShopModal('manage')"
    >
      <BaseDropdownItemButton
        v-if="isShopContext && hasShopsLinkedByUserInBackoffice"
        @click="openLinkShopModal('unlink')"
      >
        {{ $t(`psaccounts.account.unlinkButton`) }}
      </BaseDropdownItemButton>
      <template v-else>
        {{ $t(`psaccounts.account.manageAccountButton`) }}
      </template>
    </component>

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

<script lang="ts">
import {
  computed, defineComponent, PropType, ref,
} from 'vue-demi';
import {Shop, ShopContext} from '@/types/context';
import BaseButton from '@/components/BaseButton.vue';
import BaseDropdown from '@/components/BaseDropdown.vue';
import BaseDropdownItemButton from '@/components/BaseDropdownItemButton.vue';
import LinkShopModal from '@/components/crossdomains/LinkShopModal.vue';

type actionToUrlType = {
  reonboard: string,
  associate: string,
  unlink: string,
  manage: string,
  connect: string
}

type actions = "reonboard"|"associate"|"unlink"|"manage"|"connect";

export default defineComponent({
  name: 'AccountLinkToUi',
  components: {
    BaseButton,
    BaseDropdown,
    BaseDropdownItemButton,
    LinkShopModal,
  },
  props: {
    accountsUiUrl: {
      type: String,
      required: true,
    },
    app: {
      type: String,
      required: true,
    },
    backendUser: {
      type: Object,
      required: true,
    },
    onboardingLink: {
      type: String,
      required: true,
    },
    shops: {
      type: Array as PropType<Shop[]>,
      default: () => [],
    },
    shopContext: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const cdcUiDisplayed = ref(false);


    const hasAllShopsLinked = computed(() => unlinkedShops.value.length === 0);

    const hasAllShopsWithoutUrl = computed(() => props.shops.every((shop) => shop.domain === null));

    const hasShopsLinked = computed(
      () => hasShopsLinkedByUserInBackoffice.value || hasShopsLinkedWithoutEmployeeId.value,
    );

    const hasShopsLinkedByUserInBackoffice = computed(() => props.shops.some(
      (shop) => shop.employeeId === props.backendUser.employeeId,
    ));

    const hasShopsLinkedWithoutEmployeeId = computed(() => props.shops.some(
      (shop) => shop.uuid !== null && !shop.isLinkedV4 && shop.employeeId === null,
    ));

    const isLinkedV4 = computed(() => props.shops.every((shop) => shop.isLinkedV4));

    const isShopContext = computed(() => props.shopContext === ShopContext.Shop);

    const specificUiUrl = ref('');
    const chooseUiUrlFromAction: actionToUrlType  = {
      reonboard: '',
      associate: '',
      unlink: `/shop/${props.shops[0].uuid}`,
      manage: '/shop',
      connect: '/shop'
    }

    const unlinkedShops = computed(
      () => props.shops.filter((shop) => !shop.uuid || (shop.uuid && shop.isLinkedV4)),
    );

    const unlinkedShopsWithEmployeeId = computed(() => unlinkedShops.value.map((shop) => ({
      ...shop,
      employeeId: props.backendUser.employeeId.toString(),
    })));

    function openLinkShopModal(act: actions) {
      if (!props.backendUser.isSuperAdmin) {
        return;
      }

      specificUiUrl.value = chooseUiUrlFromAction?.[act];

      cdcUiDisplayed.value = true;
    }

    function closeOnBoarding() {
      cdcUiDisplayed.value = false;
      window.location.reload();
    }

    return {
      cdcUiDisplayed,
      hasAllShopsLinked,
      hasAllShopsWithoutUrl,
      hasShopsLinked,
      hasShopsLinkedByUserInBackoffice,
      isLinkedV4,
      isShopContext,
      specificUiUrl,
      unlinkedShopsWithEmployeeId,
      openLinkShopModal,
      closeOnBoarding,
    };
  },
});
</script>

<style>
</style>
