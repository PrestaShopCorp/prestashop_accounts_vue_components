<template>
  <transition name="fade">
    <div
      class="modal accounts-modal d-block"
      v-if="displayed"
    >
      <div
        class="modal-dialog"
        role="document"
        v-click-outside="closeModal"
      >
        <div class="modal-content rounded-0">
          <div class="modal-header">
            <h2 v-if="headerTitle">
              {{ headerTitle }}
            </h2>
            <slot name="modal-header" />
            <button
              type="button"
              class="close"
              @click="closeModal()"
            >
              <span>×</span>
            </button>
          </div>
          <div class="modal-body">
            <p v-if="bodyText">
              {{ bodyText }}
            </p>
            <slot name="modal-body" />
            <div class="modal-footer">
              <slot name="modal-footer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import vClickOutside from 'v-click-outside';

  export default {
    name: 'Modal',
    directives: {
      clickOutside: vClickOutside.directive,
    },
    props: {
      headerTitle: {
        type: String,
        required: false,
      },
      bodyText: {
        type: String,
        required: false,
      },
      displayed: {
        type: Boolean,
        required: true,
        default: false,
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
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .25s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
