<template>
  <b-card
    no-body
  >
    <template v-slot:header>
      <b-iconstack
        v-if="userIsConnectedAndValidated"
        font-scale="1.5"
        class="mr-2 align-bottom"
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
       * [by prestashop\_accounts\_auth library presenter function](http://perdu.com).
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
       * [by prestashop\_accounts\_auth library presenter function](http://perdu.com).
       */
      onboardingLink: {
        type: String,
        required: true,
      },
      /**
       * The super admin email used in the wording
       * [by prestashop\_accounts\_auth library presenter function](http://perdu.com).
       */
      adminEmail: {
        type: String,
        required: false,
        default: null,
      },
      /**
       * The link to sso to trigger a new verification email
       * [by prestashop\_accounts\_auth library presenter function](http://perdu.com).
       */
      resendEmailLink: {
        type: String,
        required: false,
        default: null,
      },
    },
    methods: {
      signIn() {
        window.location.href = this.onboardingLink;
      },
      signOut() {
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
        if (this.resendEmailLink) {
          window.open(this.resendEmailLink, '_blank');
        }
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
</style>
