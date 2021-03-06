<template>
  <div>
    <b-card
      no-body
    >
      <template v-slot:header>
        <AccountHeader
          :user-is-connected="userIsConnected"
        />
      </template>
      <b-card-body>
        <div class="d-flex">
          <AccountShopLinkMessage
            :user-is-connected="userIsConnected"
            :validated-context="validatedContext"
          />
          <AccountLinkToUi
            :user-is-connected="userIsConnected"
            :validated-context="validatedContext"
          />
        </div>

        <ModuleUpdateInformation
          v-if="validatedContext.isOnboardedV4"
          class="mt-3"
        />

        <AccountUserEmailNotValidated
          v-if="userIsConnected && userIsSameAsCurrentShopuser && !userEmailIsValidated"
          :validated-context="validatedContext"
          class="mt-3"
        />

        <AccountUserNotSuperAdmin
          v-if="!validatedContext.user.isSuperAdmin"
          :validated-context="validatedContext"
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
      validatedContext: {
        type: Object,
        required: true,
      },
    },
    computed: {
      userIsConnected() {
        return this.validatedContext.user.email !== null;
      },
      userIsSameAsCurrentShopuser() {
        const backendUserEmployeeId = this.validatedContext.backendUser.employeeId;
        const currentShopEmployeeId = parseInt(this.validatedContext.currentShop.employeeId, 10);
        return backendUserEmployeeId === currentShopEmployeeId;
      },
      userEmailIsValidated() {
        return this.validatedContext.user.emailIsValidated;
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
