<template>
  <div
    class="acc-gap-8 md:acc-gap-2 acc-items-center acc-flex"
  >
    <puik-button
      id="associate-shop-button"
      class="acc-w-1/2 md:acc-w-auto"
      data-testid="account-link-to-ui-link-shop-button"
      @click="openLinkShopModal()"
    >
      Connect to your account
    </puik-button>
  </div>
</template>

<script setup lang="ts">
interface AccountSetPointOfContactProps {
  identifyUrl: string;
}

const props = withDefaults(defineProps<AccountSetPointOfContactProps>(), {
});

function openLinkShopModal (path: string = '') {
  window.open(props.identifyUrl, 'identifyPopup', 'popup=true,width=650,height=700,left=150,top=100');
}
</script>
