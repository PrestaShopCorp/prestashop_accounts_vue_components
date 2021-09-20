<template>
  <transition name="fade">
    <div
      class="modal accounts-modal d-block"
    >
      <div
        class="crossdomain-container"
        role="document"
      >
        <div
          class="crossdomain"
          v-click-outside="closeModal"
        >
          <link-shop-crossdomain
            :specificUiUrl="specificUiUrl"
            :shop="shop"
            :onBoardingFinished="closeModal"
            :tracking="tracking"
            :onLogout="onLogout"
            :accountsUiUrl="accountsUiUrl"
            :triggerFallback="triggerFallback"
          />
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="js">
  // vue/attribute-hyphenation breaks props of cdc on lint
  /* eslint vue/attribute-hyphenation: "off" */
  import Vue from 'vue';
  import vClickOutside from 'v-click-outside';
  import useSegmentTracking from '@/composables/useSegmentTracking';
  import LinkShopCrossDomain from './linkShopCrossDomain';

  export default {
    name: 'Modal',
    components: {
      'link-shop-crossdomain': LinkShopCrossDomain.driver('vue', Vue),
    },
    directives: {
      clickOutside: vClickOutside.directive,
    },
    props: {
      shop: {
        type: Object,
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
    setup() {
      const {properties: tracking, reset} = useSegmentTracking();

      return {tracking, reset};
    },
    methods: {
      closeModal() {
        this.$emit('closed');
      },
      onLogout() {
        this.reset();
      },
      triggerFallback() {
        const base64Shop = btoa(JSON.stringify(this.shop));
        const fallbackUrl = `${this.accountsUiUrl}${this.specificUiUrl}?shopPayload=${base64Shop}`;
        window.location.assign(fallbackUrl);
      },
    },
    mounted() {
      // FallBack for crossdomain component
      setTimeout(() => {
        if (document.querySelector('.crossdomain .zoid-invisible')) {
          this.triggerFallback();
        }
      }, 60000);
    },
  };
</script>

<style lang="scss" scoped>
.accounts-modal {
  background-color: rgba(0, 0, 0, 0.5);
  .close {
    margin-top: -42px !important;
  }
  .crossdomain-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    .crossdomain {
      width: 80%;
      height: 80%;
      background: #FFFFFF;
      box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      border-radius: 6px;
      & > div {
        height: 100%;
      }
    }
  }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .25s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
