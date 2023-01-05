<template>
  <div></div>
</template>

<script lang="ts">
import {defineComponent, onMounted} from 'vue-demi';
import vClickOutside from 'v-click-outside';
import useSegmentTracking from '@/composables/useSegmentTracking';
import LinkShopCrossDomain from './linkShopCrossDomain';

export default defineComponent({
  name: 'LinkShopModal',
  directives: {
    clickOutside: vClickOutside.directive,
  },
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
    const {properties: trackingProps, reset} = useSegmentTracking();
    const linkShop = LinkShopCrossDomain({
      app: props.app,
      specificUiUrl: props.specificUiUrl,
      shops: props.shops,
      onBoardingFinished: close,
      tracking: trackingProps,
      onLogout,
      accountsUiUrl: props.accountsUiUrl,
      triggerFallback
    });

    function open() {
      linkShop.render(undefined, 'popup');
    }

    function close() {
      linkShop.close();
      emit('closed');
    }

    function onLogout() {
      reset();
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
      open, close, onLogout, trackingProps, triggerFallback,
    };
  },
});
</script>

<style scoped>
@screen md {
  .crossdomain {
    width: 90% !important;
    height: 90% !important;
    max-width: 990px;
    max-height: 810px;
  }
}
.crossdomain > div {
  width: 100%;
  height: 100%;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .25s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
