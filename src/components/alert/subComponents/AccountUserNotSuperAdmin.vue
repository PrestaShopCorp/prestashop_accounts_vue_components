<template>
  <b-alert
    variant="warning"
    class="mt-4"
    show
  >
    <p>{{ t('psaccounts.account.needToBeAdmin') }}</p>
    <p v-if="adminEmail">
      {{ t('psaccounts.account.pleaseContact') }}
      <a
        @click="sendEmailConfirmation()"
        :href="'mailto:' + adminEmail"
      >
        {{ adminEmail }}
      </a>
    </p>
  </b-alert>
</template>

<script>
  import Locale from '@/mixins/locale';
  import {
    BAlert,
  } from 'bootstrap-vue';

  /**
   * This sub-component shows a message is the user is not a super-admin
   * and tell him to contact one to continue the process
   */
  export default {
    name: 'AccountUserNotSuperAdmin',
    mixins: [Locale],
    components: [
      BAlert,
    ],
    props: {
      adminEmail: {
        type: String,
        required: false,
        default: null,
      },
    },
    methods: {
      sendEmailConfirmation() {
        this.$segment.track('ACC Click BO Admin address', {
          category: 'Accounts',
        });
        if (this.resendEmailLink) {
          window.open(this.resendEmailLink, '_blank');
        }
      },
    },
    mounted() {
      this.$segment.track('ACC View Error display component', {
        category: 'Account',
      });
    },
  };
</script>
