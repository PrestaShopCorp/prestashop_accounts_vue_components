<template>
  <div>
    <b-card
      no-body
    >
      <template #header>
        <AccountHeader :has-all-shops-linked="hasAllShopsLinked" />
      </template>
      <b-card-body>
        <ShopUrlShouldExists
          v-if="hasShopsWithoutUrl"
          :has-all-shops-without-url="hasAllShopsWithoutUrl"
          :shop-names-without-url="shopNamesWithoutUrl"
        />

        <div class="d-flex flex-column flex-md-row">
          <AccountShopLinkMessage :shops="shopsWithUrl" />
          <AccountLinkToUi
            :accounts-ui-url="accountsUiUrl"
            :backend-user="backendUser"
            :is-super-admin="backendUser.isSuperAdmin"
            :onboarding-link="onboardingLink"
            :shops="shopsWithUrl"
            :shop-context="shopContext"
          />
        </div>

        <ModuleUpdateInformation
          v-if="isLinkedV4"
          class="mt-3"
        />

        <AccountUserEmailNotValidated
          v-if="userHasEmailNotVerified"
          :sso-resend-verification-email="ssoResendVerificationEmail"
          class="mt-3"
        />

        <AccountUserNotSuperAdmin
          v-if="!backendUser.isSuperAdmin"
          :super-admin-email="superAdminEmail"
        />
        <slot />
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import {
  BCard,
  BCardBody,
} from 'bootstrap-vue';
import Locale from '@/mixins/locale';
import AccountHeader from '@/components/panel/accountSubComponents/AccountHeader';
import AccountLinkToUi from '@/components/panel/accountSubComponents/AccountLinkToUi';
import ModuleUpdateInformation from '@/components/alert/ModuleUpdateInformation';
import AccountUserEmailNotValidated from '@/components/alert/AccountUserEmailNotValidated';
import AccountUserNotSuperAdmin from '@/components/alert/AccountUserNotSuperAdmin';
import AccountShopLinkMessage from '@/components/panel/accountSubComponents/AccountShopLinkMessage';
import ShopUrlShouldExists from '@/components/alert/ShopUrlShouldExists';
/**
   * This sub-component can be used in a custom integration when the `PsAccounts` component
   * does not meets special needs.
   * This part will display a block to let the user link his account through a button.
   */
export default {
  name: 'AccountPanel',
  mixins: [Locale],
  components: {
    BCard,
    BCardBody,
    AccountHeader,
    AccountLinkToUi,
    ModuleUpdateInformation,
    AccountUserEmailNotValidated,
    AccountUserNotSuperAdmin,
    AccountShopLinkMessage,
    ShopUrlShouldExists,
  },
  props: {
    /**
       * URL loaded inside the association workflow modal<br />
       * should be https://accounts.distribution.prestashop.net/en
       */
    accountsUiUrl: {
      type: String,
      required: true,
    },
    /**
       * User currently logged into the back office
       */
    backendUser: {
      type: Object,
      required: true,
    },
    /**
       * The onboarding link, generated
       * [by ps\_accounts module presenter function](https://github.com/PrestaShopCorp/prestashop-accounts-installer#register-as-a-service-in-your-psx-container-recommended)
       */
    onboardingLink: {
      type: String,
      required: true,
    },
    /**
       * In multistore context, contains the whole shop tree (all groups and all shops).
       * In single shop context, contains this shop information
       */
    shops: {
      type: Array,
      default: () => [],
    },
    /**
       * Current shop context, possible values :<br />
       * 4 - all shops<br />
       * 2 - group<br />
       * 1 - single shop
       */
    shopContext: {
      type: Number,
      required: true,
    },
    /**
       * URL used for activating PrestaShop Accounts<br />
       * should be https://auth.prestashop.com/account/send-verification-email
       */
    ssoResendVerificationEmail: {
      type: String,
      required: true,
    },
    /**
       * The super admin email used in the wording
       * [by ps\_accounts module presenter function](https://github.com/PrestaShopCorp/prestashop-accounts-installer#register-as-a-service-in-your-psx-container-recommended)
       */
    superAdminEmail: {
      type: String,
      required: true,
    },
  },
  computed: {
    hasAllShopsLinked() {
      return this.shopsWithUrl.every((shop) => shop.uuid);
    },
    hasAllShopsWithoutUrl() {
      return this.shops.every((shop) => shop.domain === null);
    },
    hasShopsWithoutUrl() {
      return this.shops.some((shop) => shop.domain === null);
    },
    isLinkedV4() {
      return this.shopsWithUrl.every((shop) => shop.isLinkedV4);
    },
    shopsWithUrl() {
      return this.shops.filter((shop) => shop.domain);
    },
    shopNamesWithoutUrl() {
      return this.shops.filter((shop) => shop.domain === null)
        .map((shop) => shop.name);
    },
    userHasEmailNotVerified() {
      return this.shopsWithUrl.some((shop) => {
        const isUser = parseInt(shop.employeeId, 10) === this.backendUser.employeeId;
        const hasEmailVerified = shop.user.emailIsValidated;

        return isUser && !hasEmailVerified && !shop.isLinkedV4;
      });
    },
  },
};
</script>

<style scoped>
.flex-grow-1 {
  flex-grow: 1;
}

.fixed-size {
  /* Fix a chromium bug (SVG height/width attributes & CSS styles) */
  height: 24px;
  width: 24px;
  display: inline;
}
</style>
