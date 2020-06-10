<template>
  <b-alert
    v-if="!accountIsEnabled"
    variant="warning"
    show
  >
    <h3>{{ t('psaccounts.alertAccountNotEnabled.title') }}</h3>
    <p>
      {{ t('psaccounts.alertAccountNotEnabled.message') }}.
    </p>
    <p class="mt-2">
      <b-button
        variant="primary"
        @click="enableEvent()"
      >
        {{ t('psaccounts.alertAccountNotEnabled.enableButton') }}
      </b-button>
    </p>
  </b-alert>
</template>

<script>
  import Locale from '@/mixins/locale';
  import {BAlert, BButton} from 'bootstrap-vue';

  export default {
    name: 'AlertAccountNotEnabled',
    components: {
      BAlert,
      BButton,
    },
    mixins: [Locale],
    props: {
      accountIsEnabled: {
        type: Boolean,
        default: false,
      },
    },
    methods: {
      enableEvent() {
        /**
         * Emitted when enable button is clicked.
         * @event enable
         * @type {Event}
         */
        this.$emit('enabled', true);
      },
    },
  };
</script>
