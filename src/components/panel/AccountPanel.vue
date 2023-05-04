<template>
  <puik-card
    variant="highlight"
    class="acc-p-6"
  >
    <p class="acc-m-0 puik-h5">
      {{ $tc('psaccounts.account.title', shopsWithUrl.length) }}
    </p>
    <ShopUrlShouldExistsAlert
      v-if="hasShopsWithoutUrl"
      :has-all-shops-without-url="hasAllShopsWithoutUrl"
      :shop-names-without-url="shopNamesWithoutUrl"
    />

    <div
      class="acc-flex acc-flex-col acc-items-center md:acc-flex-row"
      :class="{'acc-mt-2': hasShopsWithoutUrl}"
    >
      <AccountShopLinkMessage
        class="md:acc-mr-2"
        :shops="shopsWithUrl"
      />
      <AccountLinkToUi
        class="acc-mt-2 md:acc-mt-0"
        :accounts-ui-url="accountsUiUrl"
        :app="app"
        :backend-user="backendUser"
        :onboarding-link="onboardingLink"
        :shops="shopsWithUrl"
        :shop-context="shopContext"
      />
    </div>

    <ModuleUpdateInformationAlert
      v-if="isLinkedV4"
    />

    <UserEmailNotValidatedAlert
      v-if="userHasEmailNotVerified"
      :sso-resend-verification-email="ssoResendVerificationEmail"
    />

    <UserNotSuperAdminAlert
      v-if="!backendUser.isSuperAdmin"
      :super-admin-email="superAdminEmail"
    />

    <div
      v-if="hasSlotContent($slots.default)"
      class="acc-mt-6"
    >
      <slot />
    </div>
  </puik-card>
</template>

<script setup lang="ts">
import {
  computed
} from 'vue';
import { Shop } from '@/types/context';
import { hasSlotContent } from '@/lib/utils';

/**
   * This sub-component can be used in a custom integration when the `PsAccounts` component
   * does not meets special needs.
   * This part will display a block to let the user link his account through a button.
   */
  interface AccountPanelProps {
    /**
    * URL loaded inside the association workflow modal<br />
    * should be https://accounts.distribution.prestashop.net/en
    */
    accountsUiUrl: string;
    /**
    * Name of the module
    */
    app: string;
    /**
    * User currently logged into the back office
    */
    backendUser: Record<string, any>;
    /**
    * The onboarding link, generated
    * [by ps\_accounts module presenter function](https://github.com/PrestaShopCorp/prestashop-accounts-installer#register-as-a-service-in-your-psx-container-recommended)
    */
    onboardingLink: string;
    /**
    * In multistore context, contains the whole shop tree (all groups and all shops).
    * In single shop context, contains this shop information
    */
    shops?: Shop[];
    /**
    * Current shop context, possible values :<br />
    * 4 - all shops<br />
    * 2 - group<br />
    * 1 - single shop
    */
    shopContext: number;
    /**
    * URL used for activating PrestaShop Accounts<br />
    * should be https://auth.prestashop.com/account/send-verification-email
    */
    ssoResendVerificationEmail: string;
    /**
    * The super admin email used in the wording
    * [by ps\_accounts module presenter function](https://github.com/PrestaShopCorp/prestashop-accounts-installer#register-as-a-service-in-your-psx-container-recommended)
    */
    superAdminEmail: string;
  }

const props = withDefaults(defineProps<AccountPanelProps>(), {
  shops: () => []
});

const shopsWithUrl = computed(() => props.shops.filter((shop) => shop.domain));

const hasAllShopsWithoutUrl = computed(() => props.shops.every((shop) => shop.domain === null));

const hasShopsWithoutUrl = computed(() => props.shops.some((shop) => shop.domain === null));

const isLinkedV4 = computed(() => shopsWithUrl.value.every((shop) => shop.isLinkedV4));

const shopNamesWithoutUrl = computed(
  () => props.shops.filter((shop) => shop.domain === null)
    .map((shop) => shop.name)
);

const userHasEmailNotVerified = computed(() => shopsWithUrl.value.some((shop) => {
  const isUser = shop.employeeId === props.backendUser.employeeId;
  const hasEmailVerified = shop.user && shop.user.emailIsValidated;

  return isUser && !hasEmailVerified && !shop.isLinkedV4;
}));

</script>
