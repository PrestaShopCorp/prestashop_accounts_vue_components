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
