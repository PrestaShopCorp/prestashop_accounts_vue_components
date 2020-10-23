<template>
  <b-card
    no-body
  >
    <template v-slot:header>
      <a
        @click="actionEventCallback('manage_account_link')"
        :href="manageAccountLink"
        target="_blank"
        v-if="!!manageAccountLink && userIsConnectedAndValidated"
        class="float-right tooltip-link"
        id="tooltip-target-3bd46b2a34b6628a1a73a31c91afd7ef"
      >
        <i class="material-icons fixed-size-small float-right">settings</i>
      </a>
      <b-tooltip
        target="tooltip-target-3bd46b2a34b6628a1a73a31c91afd7ef"
        triggers="hover"
        placement="top"
      >
        {{ t('psaccounts.account.manageAccountTooltip') }}
      </b-tooltip>

      <b-iconstack
        v-if="userIsConnectedAndValidated"
        font-scale="1.5"
        class="mr-2 align-bottom fixed-size"
        width="20"
        height="20"
      >
        <b-icon-circle-fill
          stacked
          variant="success"
        />
        <b-icon-check
          stacked
          variant="white"
        />
      </b-iconstack>
      <h3 class="d-inline">
        {{ t('psaccounts.account.title') }}
      </h3>
      <span
        v-if="!userEmailIsValidated && userIsConnected"
        class="float-right"
      >
        <b-badge variant="warning">
          {{ t('psaccounts.account.emailValidationWarningLabel') }}
        </b-badge>
      </span>
    </template>
    <b-card-body>
      <div class="d-flex">
        <div class="d-flex flex-grow-1">
          <img
            class="mr-2 align-self-center"
            src="~@/assets/img/puffin_logo.png"
            width="46"
          >
          <div class="align-self-center">
            <span
              v-if="!userIsConnected"
              class="align-middle"
            >{{ t('psaccounts.account.authorize') }}.</span>
            <template v-else>
              <span class="align-middle">{{ t('psaccounts.account.authorized') }}.</span><br>
              <span class="text-muted">{{ user.email }}</span>
            </template>
          </div>
        </div>
        <div class="align-self-center">
          <b-button
            v-if="!userIsConnected"
            class="float-right"
            :disabled="!isAdmin && !userIsConnected"
            variant="primary"
            @click="signIn()"
          >
            {{ t('psaccounts.account.connectButton') }}
          </b-button>
          <b-link
            v-else-if="userIsConnected && !userEmailIsValidated"
            @click="signOut()"
            class="float-right"
          >
            {{ t('psaccounts.account.disconnectButton') }}
          </b-link>
        </div>
      </div>
      <b-alert
        v-if="!userEmailIsValidated && userIsConnected"
        variant="warning"
        class="mt-4"
        show
      >
        <p>
          {{ t('psaccounts.account.emailConfirmationAlert') }}.
        </p>
        <p class="mt-2 text-muted">
          {{ t('psaccounts.account.noEmailReceived') }}?
        </p>
        <p class="mt-2">
          <b-button
            variant="primary"
            @click="sendEmailConfirmation()"
          >
            {{ t('psaccounts.account.sendEmail') }}
          </b-button>
        </p>
      </b-alert>
      <b-alert
        v-if="!isAdmin && !userIsConnected"
        variant="warning"
        class="mt-4"
        show
      >
        <p>{{ t('psaccounts.account.needToBeAdmin') }}.</p>
        <p v-if="adminEmail">
          {{ t('psaccounts.account.pleaseContact') }}
          <b-link
            @click="sendEmailConfirmation()"
            :href="'mailto:' + adminEmail"
          >
            {{ adminEmail }}
          </b-link>
        </p>
      </b-alert>
      <slot />
    </b-card-body>
  </b-card>
</template>

<script>
  import Locale from '@/mixins/locale';
  import {
    BAlert,
    BButton,
    BLink,
    BBadge,
    BCard,
    BCardBody,
    BIconstack,
    BIconCircleFill,
    BIconCheck,
    BTooltip,
  } from 'bootstrap-vue';

  /**
   * This sub-component can be used in a custom integration when the `PsAccounts`
   * component does not meets special needs. This part will display a block to
   * let the user link his account through a button.
   */
  export default {
    name: 'Account',
    mixins: [Locale],
    components: {
      BAlert,
      BButton,
      BLink,
      BBadge,
      BCard,
      BCardBody,
      BIconstack,
      BIconCircleFill,
      BIconCheck,
      BTooltip,
    },
    props: {
      /**
       * Whether or not the current user has admin rights.
       */
      isAdmin: {
        type: Boolean,
        required: false,
        default: true,
      },
      /**
       * The user object, generated
       * [by prestashop\_accounts\_auth library presenter function](https://github.com/PrestaShopCorp/prestashop_accounts_auth#usage).
       */
      user: {
        type: Object,
        required: false,
        default: () => ({
          email: '',
          emailIsValidated: false,
        }),
      },
      /**
       * The onboarding link, generated
       * [by prestashop\_accounts\_auth library presenter function](https://github.com/PrestaShopCorp/prestashop_accounts_auth#usage).
       */
      onboardingLink: {
        type: String,
        required: true,
      },
      /**
       * The super admin email used in the wording
       * [by prestashop\_accounts\_auth library presenter function](https://github.com/PrestaShopCorp/prestashop_accounts_auth#usage).
       */
      adminEmail: {
        type: String,
        required: false,
        default: null,
      },
      /**
       * The link to sso to trigger a new verification email
       * [by prestashop\_accounts\_auth library presenter function](https://github.com/PrestaShopCorp/prestashop_accounts_auth#usage).
       */
      resendEmailLink: {
        type: String,
        required: false,
        default: null,
      },
      /**
       * The link to sso account management page
       * [by prestashop\_accounts\_auth library presenter function](https://github.com/PrestaShopCorp/prestashop_accounts_auth#usage).
       */
      manageAccountLink: {
        type: String,
        required: false,
        default: null,
      },
    },
    data() {
      return {
        panelShown: null,
      };
    },
    methods: {
      signIn() {
        this.actionEventCallback('sign_in');
        this.$segment.track('ACC Click BO Connect button', {
          category: 'Accounts',
        });
        window.location.href = this.onboardingLink;
      },
      signOut() {
        this.actionEventCallback('sign_out', this.user);
        /**
         * Logout the current user to let another user account to be linked
         * (user is given in parameter).
         * @type {Event}
         */
        this.$emit('sign-out', this.user);
        this.user.email = null;
        this.signIn();
      },
      sendEmailConfirmation() {
        /**
         * Send the confirmation email again to the user (email address is given in parameter).
         * @type {Event}
         */
        this.$emit('send-email', this.user.email);
        this.$segment.track('ACC Click BO Admin address', {
          category: 'Accounts',
        });
        if (this.resendEmailLink) {
          window.open(this.resendEmailLink, '_blank');
        }
      },
      tracking(status) {
        const trackByUserStatus = {
          user_not_connected: () => {
            this.$segment.track('ACC View onboarding component - not connected state', {
              category: 'Account',
            });
          },
          user_connected_not_validated: () => {
            this.$segment.track('ACC View onboarding component - connected not validated state', {
              category: 'Account',
            });
          },
          user_connected: () => {
            this.$segment.track('ACC View onboarding component - connected validated state', {
              category: 'Account',
            });
          },
          user_not_admin: () => {
            this.$segment.track('ACC View admin component', {
              category: 'Account',
            });
          },
        };
        return trackByUserStatus[status].call();
      },
      viewingPanel() {
        const previousPanel = this.panelShown;

        if (!this.isAdmin) {
          this.panelShown = 'user_not_admin';
        } else if (!this.userIsConnected) {
          this.panelShown = 'user_not_connected';
        } else if (!this.userEmailIsValidated) {
          this.panelShown = 'user_connected_not_validated';
        } else {
          this.panelShown = 'user_connected';
        }
        this.tracking(this.panelShown);
        if (this.panelShown && (previousPanel !== this.panelShown)) {
          // Need to make call async in order to let callbacks ready.
          setTimeout(() => {
            /**
             * Emitted when user action occurred on a panel.
             * @type {Event}
             */
            this.$emit('viewed', this.panelShown);
          }, 100);
        }
      },
      actionEventCallback(eventType, event) {
        /**
         * Emitted when user action occurred on a panel.
         * @type {Event}
         */
        this.$emit('actioned', eventType, event);
      },
    },
    computed: {
      userIsConnected() {
        return Boolean(this.user.email !== null);
      },
      userEmailIsValidated() {
        return this.user.emailIsValidated;
      },
      userIsConnectedAndValidated() {
        return this.userIsConnected && this.userEmailIsValidated;
      },
    },
    mounted() {
      this.viewingPanel();
    },
    updated() {
      this.viewingPanel();
    },
    watch: {
      'user.email': function () {
        this.$forceUpdate();
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
