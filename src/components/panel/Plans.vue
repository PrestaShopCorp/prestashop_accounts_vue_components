<template>
  <div style="background-color:yellow;padding:2rem;">
    PLANS ! Page TODO<br><br>
    <b-button @click="back()">
      BACK !
    </b-button>
    <b-button
      class="float-right"
      @click="next(42)"
    >
      PAY for plan 42!
    </b-button>
  </div>
</template>

<script>
  import Locale from '@/mixins/locale';
  import {
    BButton,
  } from 'bootstrap-vue';

  /**
   * This sub-component can be used in a custom integration when the `PsAccounts`
   * component does not meets special needs. This part will display a block to
   * show the available paying plans, if any.
   */
  export default {
    name: 'Plans',
    mixins: [Locale],
    components: {
      BButton,
    },
    props: {
      /**
       * The billing object, generated
       * [by prestashop\_accounts\_auth library presenter function](https://github.com/PrestaShopCorp/prestashop_accounts_auth#usage).
       */
      billing: {
        type: Object,
        required: true,
      },
    },
    methods: {
      back() {
        /**
         * Emitted when the Back feature is clicked
         * @type {Event}
         */
        this.$emit('back');
      },
      next(plan) {
        /**
         * Emitted when a plan is chosen. The selected plan is given as argument.
         * @type {Event}
         */
        this.$emit('next', plan);
      },
    },
    computed: {
    },
    watch: {
    },
  };
</script>

<style scoped>

</style>
