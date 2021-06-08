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

        <AccountUserEmailNotValidated
          v-if="userIsConnected && userIsSameAsCurrentShopuser && !userEmailIsValidated"
          :resend-email-link="validatedContext.ssoResendVerificationEmail"
          class="mt-3"
        />

        <AccountUserNotSuperAdmin
          v-if="!validatedContext.user.isSuperAdmin"
          :admin-email="validatedContext.superAdminEmail"
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
  import AccountUserEmailNotValidated from '@/components/alert/subComponents/AccountUserEmailNotValidated';
  import AccountUserNotSuperAdmin from '@/components/alert/subComponents/AccountUserNotSuperAdmin';
  import AccountShopLinkMessage from '@/components/panel/accountSubComponents/AccountShopLinkMessage';

  export default {
    name: 'Account',
    mixins: [Locale],
    components: {
      BCard,
      BCardBody,
      AccountHeader,
      AccountLinkToUi,
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
    methods: {
      trackingComponent() {
        let trackingEvent = '';
        if (!this.validatedContext.user.isSuperAdmin) {
          trackingEvent = 'ACC View admin component';
        } else if (!this.userIsConnected) {
          trackingEvent = 'ACC View onboarding component - not connected state';
        } else if (!this.userEmailIsValidated) {
          trackingEvent = 'ACC View onboarding component - email not validated state';
        } else {
          trackingEvent = 'ACC View onboarding component - connected validated state';
        }

        this.$segment.track(trackingEvent, {
          category: 'Account',
        });
      },
    },
    computed: {
      userIsConnected() {
        return this.validatedContext.user.email !== null;
      },
      userIsSameAsCurrentShopuser() {
        const userEmployeeId = this.validatedContext.employeeId;
        const currentShopEmployeeId = parseInt(this.validatedContext.currentShop.employeeId, 10);

        return userEmployeeId === currentShopEmployeeId;
      },
      userEmailIsValidated() {
        return this.validatedContext.user.emailIsValidated;
      },
    },
    mounted() {
      this.trackingComponent();
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
