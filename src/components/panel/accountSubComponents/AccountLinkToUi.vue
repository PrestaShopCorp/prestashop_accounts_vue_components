<template>
  <div v-if="!hasAllShopsWithoutUrl" class="align-self-center">
    <component
      :is="hasShopsLinked ? 'b-dropdown' : 'b-button'"
      v-if="!hasAllShopsLinked"
      :id="`associate-shop-${hasShopsLinked ? 'dropdown' : 'button'}`"
      right
      split
      split-variant="outline-primary"
      variant="primary"
      :text="t(`psaccounts.account.${isLinkedV4 ? 'reonboard' : 'connect'}Button`)"
      :disabled="!backendUser.isSuperAdmin"
      @click="openLinkShopModal(isLinkedV4 ? 'reonboard' : 'associate')"
    >
      <b-dropdown-item-button
        v-if="hasShopsLinked"
        @click="openLinkShopModal('manage')"
      >
        {{ t(`psaccounts.account.manageAccountButton`) }}
      </b-dropdown-item-button>
      <template v-else>
        {{ t(`psaccounts.account.${isLinkedV4 ? 'reonboard' : 'connect'}Button`) }}
      </template>
    </component>

    <component
      :is="isShopContext && hasShopsLinkedByUserInBackoffice ? 'b-dropdown' : 'b-button'"
      v-else-if="hasShopsLinked"
      :id="`manage-shops-${ isShopContext ? 'dropdown' : 'button'}`"
      right
      split
      split-variant="outline-primary"
      variant="primary"
      :text="t(`psaccounts.account.manageAccountButton`)"
      :disabled="!backendUser.isSuperAdmin"
      @click="openLinkShopModal('manage')"
    >
      <b-dropdown-item-button
        v-if="isShopContext && hasShopsLinkedByUserInBackoffice"
        @click="openLinkShopModal('unlink')"
      >
        {{ t(`psaccounts.account.unlinkButton`) }}
      </b-dropdown-item-button>
      <template v-else>
        {{ t(`psaccounts.account.manageAccountButton`) }}
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

<script>
  import {CONTEXT_SHOP} from '@/lib/context';
  import Locale from '@/mixins/locale';
  import useSegmentTracking from '@/composables/useSegmentTracking';
  import {
    BButton,
    BDropdown,
    BDropdownItemButton,
  } from 'bootstrap-vue';
  import LinkShopModal from '@/components/crossdomains/LinkShopModal';

  export default {
    name: 'AccountLinkToUi',
    mixins: [Locale],
    components: {
      BButton,
      BDropdown,
      BDropdownItemButton,
      LinkShopModal,
    },
    data() {
      return {
        action: 'associate',
        cdcUiDisplayed: false,
      };
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
        type: Array,
        default: () => [],
      },
      shopContext: {
        type: Number,
        required: true,
      },
    },
    setup() {
      const {trackAssociateOrManageAccountButton} = useSegmentTracking();

      return {trackAssociateOrManageAccountButton};
    },
    computed: {
      hasAllShopsLinked() {
        return this.unlinkedShops.length === 0;
      },
      hasAllShopsWithoutUrl() {
        return this.shops.every((shop) => shop.domain === null);
      },
      hasShopsLinked() {
        return this.hasShopsLinkedByUserInBackoffice || this.hasShopsLinkedWithoutEmployeeId;
      },
      hasShopsLinkedByUserInBackoffice() {
        return this.shops.some(
          (shop) => parseInt(shop.employeeId, 10) === this.backendUser.employeeId,
        );
      },
      hasShopsLinkedWithoutEmployeeId() {
        return this.shops.some(
          (shop) => shop.uuid !== null && !shop.isLinkedV4 && shop.employeeId === null,
        );
      },
      isLinkedV4() {
        return this.shops.every((shop) => shop.isLinkedV4);
      },
      isShopContext() {
        return this.shopContext === CONTEXT_SHOP;
      },
      specificUiUrl() {
        if (['reonboard', 'associate'].includes(this.action)) {
          return '';
        }

        if (['unlink'].includes(this.action)) {
          return `/shop/${this.shops[0].uuid}`;
        }

        return '/shop';
      },
      trackEventName() {
        if (['reonboard', 'associate'].includes(this.action)) {
          return '[ACC] Associate Button Clicked';
        }

        if (['unlink'].includes(this.action)) {
          return '[ACC] Unlink Shop Button Clicked';
        }

        return '[ACC] Manage Account Button Clicked';
      },
      unlinkedShops() {
        return this.shops.filter((shop) => !shop.uuid || (shop.uuid && shop.isLinkedV4));
      },
      unlinkedShopsWithEmployeeId() {
        return this.unlinkedShops.map((shop) => ({
          ...shop,
          employeeId: this.backendUser.employeeId.toString(),
        }));
      },
    },
    methods: {
      openLinkShopModal() {
        this.trackAssociateOrManageAccountButton();

        this.cdcUiDisplayed = true;
      },
      closeOnBoarding() {
        this.cdcUiDisplayed = false;
        window.location.reload();
      },
    },
    watch: {
      cdcUiDisplayed: (cdcUiDisplayed) => {
        if (cdcUiDisplayed) {
          document.body.classList.add('ui-displayed');
          return;
        }

        document.body.classList.remove('ui-displayed');
      },
    },
  };
</script>

<style>
body.ui-displayed {
  overflow: hidden;
}
</style>
