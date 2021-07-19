<template>
  <div class="d-flex flex-column flex-grow-1 flex-md-row">
    <img
      class="mr-2 align-self-center"
      src="~@/assets/img/puffin_logo.png"
      width="46"
    >
    <div class="align-self-center">
      <span
        v-if="!userIsConnected"
        class="align-middle"
      >
        {{ t('psaccounts.account.authorize') }}
      </span>
      <template v-else>
        <span class="align-middle">{{ t('psaccounts.account.authorized') }}</span><br>
        <span class="text-muted">{{ validatedContext.user.email }}</span>
      </template>
    </div>
  </div>
</template>

<script>
  import Locale from '@/mixins/locale';

  export default {
    name: 'AccountShopLinkMessage',
    mixins: [Locale],
    props: {
      validatedContext: {
        type: Object,
        required: true,
      },
      userIsConnected: {
        type: Boolean,
        required: true,
      },
    },
  };
</script>
