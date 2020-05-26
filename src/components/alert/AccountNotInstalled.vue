<template>
  <b-alert
    v-if="!accountIsInstalled"
    variant="warning"
    show
  >
    <h3>{{ $t('alertAccountNotInstalled.title') }}</h3>
    <p>
      {{ $t('alertAccountNotInstalled.message') }}.
    </p>
    <p class="mt-2">
      <b-button
        variant="primary"
        @click="installEvent()"
      >
        {{ $t('alertAccountNotInstalled.installButton') }}
      </b-button>
    </p>
  </b-alert>
</template>

<script>
  export default {
    name: 'AlertAccountNotInstalled',
    props: {
      accountIsInstalled: {
        type: Boolean,
        default: false,
      },
    },
    methods: {
      installEvent() {
        /**
         * Emitted when install button is clicked.
         * @event install
         * @type {Event}
         */
        this.$emit('install', true);
      },
    },
  };
</script>
