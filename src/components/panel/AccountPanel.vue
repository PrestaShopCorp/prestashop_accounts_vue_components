<template>
  <BaseCard>
    <template #header>
      <AccountHeader :has-all-shops-linked="hasAllShopsLinked">
        {{ $tc('psaccounts.account.title', shopsWithUrl.length) }}
      </AccountHeader>
    </template>
    <template #body>
      <ShopUrlShouldExistsAlert
        v-if="hasShopsWithoutUrl"
        :has-all-shops-without-url="hasAllShopsWithoutUrl"
        :shop-names-without-url="shopNamesWithoutUrl"
      />

      <div
        class="acc-flex acc-flex-col acc-items-center md:acc-flex-row"
        :class="{'acc-mt-2': hasShopsWithoutUrl}">
        <AccountShopLinkMessage
          class="md:acc-mr-2"
          :shops="shopsWithUrl" />
        <AccountLinkToUi
          class="acc-mt-2 md:acc-mt-0"
          :accounts-ui-url="accountsUiUrl"
          :backend-user="backendUser"
          :onboarding-link="onboardingLink"
          :shops="shopsWithUrl"
          :shop-context="shopContext"
        />
      </div>

      <ModuleUpdateInformationAlert
        v-if="isLinkedV4"
        class="acc-mt-2"
      />

      <UserEmailNotValidatedAlert
        v-if="userHasEmailNotVerified"
        class="acc-mt-2"
        :sso-resend-verification-email="ssoResendVerificationEmail"
      />

      <UserNotSuperAdminAlert
        v-if="!backendUser.isSuperAdmin"
        class="acc-mt-2"
        :super-admin-email="superAdminEmail"
      />

      <div v-if="$slots.default" class="acc-mt-2">
        <slot />
      </div>
    </template>
  </BaseCard>
</template>

<script lang="ts">
import {
  computed, defineComponent, PropType,
} from '@vue/composition-api';
import i18n from '@/i18n';
import {Shop} from '@/types/context';
import BaseCard from '@/components/BaseCard.vue';
import AccountHeader from '@/components/panel/accountSubComponents/AccountHeader.vue';
import AccountLinkToUi from '@/components/panel/accountSubComponents/AccountLinkToUi.vue';
import AccountShopLinkMessage from '@/components/panel/accountSubComponents/AccountShopLinkMessage.vue';
import ModuleUpdateInformationAlert from '@/components/alert/ModuleUpdateInformationAlert.vue';
import ShopUrlShouldExistsAlert from '@/components/alert/ShopUrlShouldExistsAlert.vue';
import UserEmailNotValidatedAlert from '@/components/alert/UserEmailNotValidatedAlert.vue';
import UserNotSuperAdminAlert from '@/components/alert/UserNotSuperAdminAlert.vue';

/**
   * This sub-component can be used in a custom integration when the `PsAccounts` component
   * does not meets special needs.
   * This part will display a block to let the user link his account through a button.
   */
export default defineComponent({
  name: 'AccountPanel',
  i18n,
  components: {
    BaseCard,
    AccountHeader,
    AccountLinkToUi,
    AccountShopLinkMessage,
    ModuleUpdateInformationAlert,
    ShopUrlShouldExistsAlert,
    UserEmailNotValidatedAlert,
    UserNotSuperAdminAlert,
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
      type: Array as PropType<Shop[]>,
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
  setup(props) {
    const hasAllShopsLinked = computed(() => shopsWithUrl.value.every((shop) => shop.uuid));

    const hasAllShopsWithoutUrl = computed(() => props.shops.every((shop) => shop.domain === null));

    const hasShopsWithoutUrl = computed(() => props.shops.some((shop) => shop.domain === null));

    const isLinkedV4 = computed(() => shopsWithUrl.value.every((shop) => shop.isLinkedV4));

    const shopsWithUrl = computed(() => props.shops.filter((shop) => shop.domain));

    const shopNamesWithoutUrl = computed(
      () => props.shops.filter((shop) => shop.domain === null)
        .map((shop) => shop.name),
    );

    const userHasEmailNotVerified = computed(() => shopsWithUrl.value.some((shop) => {
      const isUser = shop.employeeId === props.backendUser.employeeId;
      const hasEmailVerified = shop.user && shop.user.emailIsValidated;

      return isUser && !hasEmailVerified && !shop.isLinkedV4;
    }));

    return {
      hasAllShopsLinked,
      hasAllShopsWithoutUrl,
      hasShopsWithoutUrl,
      isLinkedV4,
      shopsWithUrl,
      shopNamesWithoutUrl,
      userHasEmailNotVerified,
    };
  },
});
</script>
