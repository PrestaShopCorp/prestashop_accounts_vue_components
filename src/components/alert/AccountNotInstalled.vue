<template>
  <b-alert
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
    methods: {
      installEvent() {
        this.$emit('install');
      },
    },
  };
</script>
