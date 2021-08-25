<template>
  <div class="align-self-center">
    <component
      :is="hasShopsLinkedByUserInBackoffice ? 'b-dropdown' : 'b-button'"
      v-if="!hasAllShopsLinked"
      :id="`associate-shop-${hasShopsLinkedByUserInBackoffice ? 'dropdown' : 'button'}`"
      right
      split
      split-variant="outline-primary"
      variant="primary"
      :text="t(`psaccounts.account.${isOnboardedV4 ? 'reonboard' : 'connect'}Button`)"
      :disabled="!user.isSuperAdmin"
      @click="openLinkShopModal(isOnboardedV4 ? 'reonboard' : 'associate')"
    >
      <b-dropdown-item-button
        v-if="hasShopsLinkedByUserInBackoffice"
        @click="openLinkShopModal('manage')"
      >
        {{ t(`psaccounts.account.manageAccountButton`) }}
      </b-dropdown-item-button>
      <template v-else>
        {{ t(`psaccounts.account.${isOnboardedV4 ? 'reonboard' : 'connect'}Button`) }}
      </template>
    </component>
    <b-button
      v-else-if="hasShopsLinkedByUser"
      id="manage-shops-button"
      class="float-right"
      variant="primary"
      :disabled="!user.isSuperAdmin"
      @click="openLinkShopModal('manage')"
    >
      {{ t(`psaccounts.account.manageAccountButton`) }}
    </b-button>

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
  import Locale from '@/mixins/locale';
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
      isOnboardedV4: {
        type: Boolean,
        default: false,
      },
      onboardingLink: {
        type: String,
        required: true,
      },
      shops: {
        type: Array,
        default: () => [],
      },
      user: {
        type: Object,
        required: true,
      },
    },
    computed: {
      hasAllShopsLinked() {
        return this.unlinkedShops.length === 0;
      },
      hasShopsLinkedByUserInBackoffice() {
        return this.shops.some(
          (shop) => parseInt(shop.employeeId, 10) === this.user.employeeId,
        );
      },
      hasShopsLinkedByUser() {
        return this.shops.some(
          (shop) => parseInt(shop.employeeId, 10) === this.user.employeeId,
        );
      },
      specificUiUrl() {
        return ['reonboard', 'associate'].includes(this.action)
          ? ''
          : '/shop';
      },
      unlinkedShops() {
        return this.shops.filter((shop) => !shop.uuid);
      },
      unlinkedShopsWithEmployeeId() {
        return this.unlinkedShops.map((shop) => ({
          ...shop,
          employeeId: this.user.employeeId.toString(),
        }));
      },
    },
    methods: {
      openLinkShopModal(action = 'associate') {
        this.action = action;
        this.track();

        this.cdcUiDisplayed = true;
      },
      closeOnBoarding() {
        this.cdcUiDisplayed = false;
        window.location.reload();
      },
      track() {
        const eventName = ['reonboard', 'associate'].includes(this.action)
          ? '[ACC] Associate Button Clicked'
          : '[ACC] Manage Account Button Clicked';

        this.$tracking.track(eventName);
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
