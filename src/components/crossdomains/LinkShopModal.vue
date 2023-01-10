<template>
  <transition name="fade">
    <div
      v-show="opened"
      class="acc-z-1500 acc-fixed acc-inset-0 acc-bg-black acc-bg-opacity-50 acc-overflow-hidden acc-outline-none"
    >
      <div
        class="acc-flex acc-flex-col acc-items-center acc-justify-center acc-w-full acc-h-full"
        role="document"
      >
        <div
          v-if="opened"
          class="acc-w-screen acc-h-screen acc-bg-white acc-rounded-lg acc-shadow-2xl acc-overflow-hidden crossdomain"
          v-click-outside="close"
        >
          <link-shop-crossdomain
            :app="app"
            :specificUiUrl="specificUiUrl"
            :shops="shops"
            :onBoardingFinished="close"
            :accountsUiUrl="accountsUiUrl"
            :triggerFallback="triggerFallback"
          />
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
// vue/attribute-hyphenation breaks props of cdc on lint
/* eslint vue/attribute-hyphenation: "off" */
import Vue from 'vue';
import {defineComponent, onMounted, ref} from 'vue-demi';
import vClickOutside from 'v-click-outside';
import LinkShopCrossDomain from './linkShopCrossDomain';

export default defineComponent({
  name: 'LinkShopModal',
  components: {
    'link-shop-crossdomain': LinkShopCrossDomain.driver('vue', Vue),
  },
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
    const opened = ref(false);

    function open() {
      opened.value = true;
    }

    function close() {
      opened.value = false;
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
      opened, open, close, triggerFallback,
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
