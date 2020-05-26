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
        <b-icon
          stacked
          icon="circle-fill"
          variant="success"
        />
        <b-icon
          stacked
          icon="check"
          variant="white"
        />
      </b-iconstack>
      <h3 class="d-inline">
        {{ $t('account.title') }}
      </h3>
      <span
        v-if="!userEmailIsValidated && userIsConnected"
        class="float-right"
      >
        <b-badge variant="warning">{{ $t('account.emailValidationWarningLabel') }}</b-badge>
      </span>
    </template>
    <b-card-body>
      <div class="d-flex">
        <div class="d-flex flex-grow-1">
          <img
            class="mr-2 align-self-center"
            src="@/assets/puffin_logo.png"
            width="46"
          >
          <div class="align-self-center">
            <span
              v-if="!userIsConnected"
              class="align-middle"
            >{{ $t('account.authorize') }}.</span>
            <template v-else>
              <span class="align-middle">{{ $t('account.authorized') }}.</span><br>
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
          >
            {{ $t('account.connectButton') }}
          </b-button>
          <b-link
            v-else
            @click="signOut()"
            class="float-right"
            :class="{disabled: !isAdmin && !userIsConnected}"
          >
            {{ $t('account.disconnectButton') }}
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
          {{ $t('account.emailConfirmationAlert') }}.
        </p>
        <p class="mt-2 text-muted">
          {{ $t('account.noEmailReceived') }}?
        </p>
        <p class="mt-2">
          <b-button
            variant="primary"
            @click="sendEmailConfirmation()"
          >
            {{ $t('account.sendEmail') }}
          </b-button>
        </p>
      </b-alert>
      <b-alert
        v-if="!isAdmin && !userIsConnected"
        variant="warning"
        class="mt-4"
        show
      >
        <p>{{ $t('account.needToBeAdmin') }}.</p>
        <p>
          {{ $t('account.pleaseContact') }}
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
  export default {
    name: 'Account',
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
    },
    methods: {
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
    created() {
      console.log(this.userIsConnectedAndValidated);
    },
  };
</script>

<style scoped>
.flex-grow-1 {
  flex-grow: 1;
}
</style>
