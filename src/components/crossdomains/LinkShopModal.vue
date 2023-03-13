<template>
  <div></div>
</template>

<script lang="ts">
import {defineComponent, onMounted} from 'vue-demi';
import LinkShopCrossDomain from './linkShopCrossDomain';

export default defineComponent({
  name: 'LinkShopModal',
  props: {
    app: {
      type: String,
      required: true,
    },
    shops: {
      type: Array,
      required: true,
    },
    specificUiUrl: {
      type: String,
      required: true,
    },
    onBoardingLink: {
      type: String,
      required: true,
    },
    accountsUiUrl: {
      type: String,
      required: true,
    },
  },
  setup(props, {emit}) {
    const linkShop = LinkShopCrossDomain({
      app: props.app,
      specificUiUrl: props.specificUiUrl,
      shops: props.shops,
      onBoardingFinished: close,
      accountsUiUrl: props.accountsUiUrl,
      triggerFallback,
      onDestroy: () => close(),
      onClose: () => close()
    });

    linkShop.render(undefined, 'popup');

    function close() {
      linkShop?.close();
      emit('closed');
    }

    function triggerFallback() {
      const base64Shops = btoa(JSON.stringify(props.shops));
      let fallbackUrl = `${props.accountsUiUrl}${props.specificUiUrl}?`;
      fallbackUrl += `shops=${base64Shops}&return_to=${encodeURIComponent(window.location.href)}`;
      window.location.assign(fallbackUrl);
    }

    onMounted(() => {
    // FallBack for crossdomain component
      setTimeout(() => {
        if (document.querySelector('.crossdomain .zoid-invisible')) {
          triggerFallback();
        }
      }, 60000);
    });

    return {
      open, close, triggerFallback,
    };
  },
});
</script>
