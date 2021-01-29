<template>
  <div>
    <b-overlay
      :show="installLoading"
      variant="white"
      :opacity="0.70"
      blur="0px"
    >
      <b-alert
        variant="warning"
        show
      >
        <h3>{{ t('psaccounts.alertAccountNeedsUpdate.title') }}</h3>
        <p>
          {{ t('psaccounts.alertAccountNeedsUpdate.message') }}
        </p>
        <p class="mt-2">
          <b-button
            variant="primary"
            @click="updateAccounts()"
          >
            {{ t('psaccounts.alertAccountNeedsUpdate.installButton') }}
          </b-button>
        </p>
      </b-alert>
    </b-overlay>
  </div>
</template>

<script>
  import {BOverlay, BAlert, BButton} from 'bootstrap-vue';
  import Locale from '@/mixins/locale';

  export default {
    name: 'AlertAccountNeedsUpdate',
    mixins: [Locale],
    components: {
      BOverlay,
      BAlert,
      BButton,
    },
    props: {
      installLoading: {
        type: Boolean,
        required: false,
      },
    },
    methods: {
      updateAccounts() {
        this.$emit('updateAccounts');
      },
    },
  };
</script>

<style scoped>

</style>
