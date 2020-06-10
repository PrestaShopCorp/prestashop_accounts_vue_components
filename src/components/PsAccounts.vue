<template>
  <div>
    <AccountNotInstalled
      v-if="!context.psAccountsIsInstalled"
      :account-is-installed="context.psAccountsIsInstalled"
    />
    <template v-else>
      <AccountNotEnabled
        v-if="!context.psAccountIsEnabled"
        :account-is-enabled="context.psAccountIsEnabled"
      />
      <template v-else>
        <MultiStoreSelector
          v-if="!context.currentShop"
          :shops="context.shops"
        />
        <Account
          :user="context.user"
          :onboarding-link="context.onboardingLink"
          class="mb-2"
        />
      </template>
    </template>
    <b-overlay
      :show="!userIsConnectedAndEmailIsValidated"
      variant="white"
      :opacity="0.70"
      blur="0px"
    >
      <slot name="body" />
    </b-overlay>
    <slot name="customBody" />
  </div>
</template>

<script>
  import AccountNotEnabled from '@/components/alert/AccountNotEnabled';
  import AccountNotInstalled from '@/components/alert/AccountNotInstalled';
  import MultiStoreSelector from '@/components/alert/MultiStoreSelector';
  import Account from '@/components/panel/Account';
  import context from '@/lib/ContextWrapper';
  import {BOverlay} from 'bootstrap-vue';

  export default {
    name: 'PsAccount',
    components: {
      AccountNotInstalled,
      AccountNotEnabled,
      MultiStoreSelector,
      Account,
      BOverlay,
    },
    props: {
      context: {
        type: Object,
        required: false,
        default: () => context,
      },
    },
    computed: {
      userIsConnectedAndEmailIsValidated() {
        return context.user.email !== '' && context.user.emailIsValidated;
      },
    },
  };
</script>
