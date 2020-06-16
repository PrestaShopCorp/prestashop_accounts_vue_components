<template>
  <b-alert
    v-if="isMultiShop"
    variant="warning"
    show
  >
    <h2>{{ t('psaccounts.multiShopSelector.title') }}</h2>
    <p>{{ t('psaccounts.multiShopSelector.subtitle') }}.</p>
    <p>{{ t('psaccounts.multiShopSelector.selectStore') }}:</p>
    <b-list-group
      v-for="group in shops"
      :key="group.id"
      class="my-3"
    >
      <p v-if="isMultiGroup">
        <label class="text-muted">
          {{ t('psaccounts.multiShopSelector.group') }}:
        </label>
        {{ group.name }}
      </p>
      <b-list-group-item
        v-for="shop in group.shops"
        :key="shop.id"
        href="#"
        @click="event(shop)"
        class="list-group-item"
      >
        {{ t('psaccounts.multiShopSelector.configure') }} <b>{{ shop.name }}</b>
      </b-list-group-item>
    </b-list-group>
    <p>{{ t('psaccounts.multiShopSelector.tips') }}.</p>
  </b-alert>
</template>

<script>
  import Locale from '@/mixins/locale';
  import {BAlert, BListGroup, BListGroupItem} from 'bootstrap-vue';

  /**
   * TODO
   */
  export default {
    name: 'MultiStoreSelector',
    mixins: [Locale],
    components: {
      BAlert,
      BListGroup,
      BListGroupItem,
    },
    props: {
      /**
       * TODO
       */
      shops: {
        type: Array,
        required: true,
      },
    },
    methods: {
      event(selectedShop) {
        /**
         * Emitted when a shop is selected.
         * @type {Event}
         */
        this.$emit('shop-selected', selectedShop);
      },
    },
    computed: {
      isMultiShop() {
        return Boolean(this.shops.length >= 1);
      },
      isMultiGroup() {
        return Boolean(this.shops.length > 1);
      },
    },
  };
</script>

<style scoped>
.list-group-item {
  max-width: 400px;
}
</style>
