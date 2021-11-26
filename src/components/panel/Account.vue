<template>
  <div>
    <b-card
      no-body
    >
      <template v-slot:header>
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
  import Locale from '@/mixins/locale';
  import {
    BCard,
    BCardBody,
  } from 'bootstrap-vue';
  import AccountHeader from '@/components/panel/accountSubComponents/AccountHeader';
  import AccountLinkToUi from '@/components/panel/accountSubComponents/AccountLinkToUi';
  import ModuleUpdateInformation from '@/components/alert/ModuleUpdateInformation';
  import AccountUserEmailNotValidated from '@/components/alert/AccountUserEmailNotValidated';
  import AccountUserNotSuperAdmin from '@/components/alert/AccountUserNotSuperAdmin';
  import AccountShopLinkMessage from '@/components/panel/accountSubComponents/AccountShopLinkMessage';
  import ShopUrlShouldExists from '@/components/alert/ShopUrlShouldExists';

  export default {
    name: 'Account',
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
      ssoResendVerificationEmail: {
        type: String,
        required: true,
      },
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
