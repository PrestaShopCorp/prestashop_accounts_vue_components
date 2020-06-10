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
            :class="{disabled: !isAdmin && !userIsConnected}"
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
        <p>
          {{ t('psaccounts.account.pleaseContact') }}
          <b-link
            @click="sendEmailConfirmation()"
            href="mailto:support@prestashop.com"
          >
            support@prestashop.com
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
      isAdmin: {
        type: Boolean,
        required: false,
        default: true,
      },
      user: {
        type: Object,
        required: false,
        default: () => ({
          email: '',
          emailIsValidated: false,
        }),
      },
      onboardingLink: {
        type: String,
        required: true,
      },
    },
    methods: {
      signIn() {
        window.location.href = this.onboardingLink;
      },
      signOut() {
        this.$emit('sign-out', this.user);
        this.user.email = '';
      },
      sendEmailConfirmation() {
        this.$emit('send-email', this.user.email);
      },
    },
    computed: {
      userIsConnected() {
        return Boolean(this.user.email !== '');
      },
      userEmailIsValidated() {
        return this.user.emailIsValidated;
      },
      userIsConnectedAndValidated() {
        return this.userIsConnected && this.userEmailIsValidated;
      },
    },
  };
</script>

<style scoped>
.flex-grow-1 {
  flex-grow: 1;
}
</style>
