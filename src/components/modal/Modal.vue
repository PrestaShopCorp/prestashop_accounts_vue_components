<template>
  <div
    aria-hidden="true"
    class="modal accounts-modal"
  >
    <div
      class="modal-dialog"
      role="document"
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
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">×</span>
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
</template>

<script>
  export default {
    name: 'Modal',
    props: {
      headerTitle: {
        type: String,
        required: false,
      },
      bodyText: {
        type: String,
        required: false,
      },
    },
  };
</script>

<style scoped>
.accounts-modal .close {
  margin-top: -42px !important;
}
</style>
