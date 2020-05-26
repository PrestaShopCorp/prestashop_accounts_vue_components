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
    <slot v-if="context.user.email !== ''" />
  </div>
</template>

<script>
  import AccountNotEnabled from '@/components/alert/AccountNotEnabled';
  import AccountNotInstalled from '@/components/alert/AccountNotInstalled';
  import MultiStoreSelector from '@/components/alert/MultiStoreSelector';
  import Account from '@/components/panel/Account';
  import context from '@/lib/ContextWrapper';

  export default {
    name: 'PsAccount',
    components: {
      AccountNotInstalled,
      AccountNotEnabled,
      MultiStoreSelector,
      Account,
    },
    props: {
      context: {
        type: Object,
        required: false,
        default: () => context,
      },
    },
  };
</script>
