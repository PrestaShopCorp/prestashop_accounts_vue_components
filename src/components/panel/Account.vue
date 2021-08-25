<template>
  <div>
    <b-card
      no-body
    >
      <template v-slot:header>
        <AccountHeader :has-all-shops-linked="hasAllShopsLinked" />
      </template>
      <b-card-body>
        <div class="d-flex flex-column flex-md-row">
          <AccountShopLinkMessage :shops="shops" />
          <AccountLinkToUi
            :accounts-ui-url="accountsUiUrl"
            :is-onboarded-v4="isOnboardedV4"
            :is-super-admin="user.isSuperAdmin"
            :onboarding-link="onboardingLink"
            :shops="shops"
            :user="user"
          />
        </div>

        <ModuleUpdateInformation
          v-if="isOnboardedV4"
          class="mt-3"
        />

        <AccountUserEmailNotValidated
          v-if="!user.emailIsValidated"
          :sso-resend-verification-email="ssoResendVerificationEmail"
          class="mt-3"
        />

        <AccountUserNotSuperAdmin
          v-if="!user.isSuperAdmin"
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
      ssoResendVerificationEmail: {
        type: String,
        required: true,
      },
      superAdminEmail: {
        type: String,
        required: true,
      },
      user: {
        type: Object,
        required: true,
      },
    },
    computed: {
      hasAllShopsLinked() {
        return this.shops.every((shop) => shop.uuid);
      },
    },
  };
</script>

<style scoped>
.flex-grow-1 {
  flex-grow: 1;
}

.slot-margin {
  margin-top: 1rem;
}

.fixed-size {
  /* Fix a chromium bug (SVG height/width attributes & CSS styles) */
  height: 20px;
  width: 20px;
  display: inline;
}

.fixed-size-small {
  /* Fix a chromium bug (SVG height/width attributes & CSS styles) */
  height: 20px;
  width: 20px;
  display: inline;
  font-size: 20px;
}

.settings-btn {
  color: #6c868e;
}

.settings-btn:hover {
  color: #25b9d7;
}
</style>
