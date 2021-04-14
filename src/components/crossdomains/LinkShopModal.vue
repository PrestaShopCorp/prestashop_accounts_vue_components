<template>
  <transition name="fade">
    <div
      class="modal accounts-modal d-block"
      v-if="displayed"
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
            :isLinked="isLinked"
            :shop="shop"
            :onBoardingFinished="closeModal"
          />
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="js">
  import Vue from 'vue';
  import vClickOutside from 'v-click-outside';
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
      displayed: {
        type: Boolean,
        required: true,
        default: false,
      },
      shop: {
        type: Object,
        required: true,
      },
      isLinked: {
        type: Boolean,
        required: true,
      },
    },
    methods: {
      closeModal() {
        this.$emit('closed');
      },
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
