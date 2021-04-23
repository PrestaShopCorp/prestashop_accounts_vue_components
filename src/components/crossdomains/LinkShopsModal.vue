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
          <link-shops-crossdomain
            :shop="shops"
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
  import LinkShopsCrossDomain from './linkShopsCrossDomain';

  export default {
    name: 'Modal',
    components: {
      'link-shops-crossdomain': LinkShopsCrossDomain.driver('vue', Vue),
    },
    directives: {
      clickOutside: vClickOutside.directive,
    },
    props: {
      shops: {
        type: Array,
        required: true,
      },
    },
    methods: {
      closeModal() {
        this.$emit('closed');
      },
    },
    mounted() {
      // FallBack for crossdomain component
      setTimeout(() => {
        if (document.querySelector('.crossdomain .zoid-invisible')) {
          window.location.assign(this.onBoardingLink);
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
