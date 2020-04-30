<template>
  <b-alert
    variant="warning"
    show
  >
    <h3>{{ $t('alertAccountNotEnabled.title') }}</h3>
    <p>
      {{ $t('alertAccountNotEnabled.message') }}.
    </p>
    <p class="mt-2">
      <b-button
        variant="primary"
        @click="enableEvent()"
      >
        {{ $t('alertAccountNotEnabled.enableButton') }}
      </b-button>
    </p>
  </b-alert>
</template>

<script>
  export default {
    name: 'AlertAccountNotEnabled',
    methods: {
      enableEvent() {
        this.$emit('enable');
      },
    },
  };
</script>
