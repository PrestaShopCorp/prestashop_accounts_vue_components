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
      :on-boarding-link="onboardingLink"
      :shops="unlinkedShopsWithEmployeeId"
      :specific-ui-url="specificUiUrl"
      @closed="closeOnBoarding"
    />
  </div>
</template>

<script lang="ts">
import {
  computed, defineComponent, PropType, ref, watch,
} from '@vue/composition-api';
import i18n from '@/i18n';
import {Shop, ShopContext} from '@/types/context';
import BaseButton from '@/components/BaseButton.vue';
import BaseDropdown from '@/components/BaseDropdown.vue';
import BaseDropdownItemButton from '@/components/BaseDropdownItemButton.vue';
import LinkShopModal from '@/components/crossdomains/LinkShopModal.vue';
import useSegmentTracking from '@/composables/useSegmentTracking';

export default defineComponent({
  name: 'AccountLinkToUi',
  i18n,
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
    const action = ref('associate');
    const cdcUiDisplayed = ref(false);

    const {trackAssociateOrManageAccountButton} = useSegmentTracking();

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

    const specificUiUrl = computed(() => {
      if (['reonboard', 'associate'].includes(action.value)) {
        return '';
      }

      if (['unlink'].includes(action.value)) {
        return `/shop/${props.shops[0].uuid}`;
      }

      return '/shop';
    });

    const unlinkedShops = computed(
      () => props.shops.filter((shop) => !shop.uuid || (shop.uuid && shop.isLinkedV4)),
    );

    const unlinkedShopsWithEmployeeId = computed(() => unlinkedShops.value.map((shop) => ({
      ...shop,
      employeeId: props.backendUser.employeeId.toString(),
    })));

    function openLinkShopModal(act: string) {
      if (!props.backendUser.isSuperAdmin) {
        return;
      }

      action.value = act;
      trackAssociateOrManageAccountButton(action.value);

      cdcUiDisplayed.value = true;
    }

    function closeOnBoarding() {
      cdcUiDisplayed.value = false;
      window.location.reload();
    }

    watch(cdcUiDisplayed, (cdcUiDisplayed) => {
      if (cdcUiDisplayed) {
        document.body.classList.add('ui-displayed');
        return;
      }

      document.body.classList.remove('ui-displayed');
    });

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
body.ui-displayed {
  overflow: hidden;
}
</style>
