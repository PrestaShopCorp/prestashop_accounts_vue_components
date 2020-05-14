<template>
  <b-alert
    v-if="isMultiShop"
    variant="warning"
    show
  >
    <h2>{{ $t('multiShopSelector.title') }}</h2>
    <p>{{ $t('multiShopSelector.subtitle') }}.</p>
    <p>{{ $t('multiShopSelector.selectStore') }}:</p>
    <b-list-group
      v-for="group in shopsTree"
      :key="group.id"
      class="my-3"
    >
      <p>
        <label class="text-muted">{{ $t('multiShopSelector.group') }}:</label> {{ group.name }}
      </p>
      <b-list-group-item
        v-for="shop in group.shops"
        :key="shop.id"
        href="#"
        @click="event(shop)"
        class="list-group-item"
      >
        {{ $t('multiShopSelector.configure') }} <b>{{ shop.name }}</b>
      </b-list-group-item>
    </b-list-group>
    <p>{{ $t('multiShopSelector.tips') }}.</p>
  </b-alert>
</template>

<script>
  export default {
    name: 'MultiStoreSelector',
    props: {
      isMultiShop: {
        type: Boolean,
        required: false,
        default: false,
      },
      shopsTree: {
        type: Array,
        required: true,
      },
    },
    methods: {
      event(selectedShop) {
        /**
         * Emitted when a shop is selected.
         * @event selected-shop
         * @type {Object}
         */
        this.$emit('selected-shop', selectedShop);
      },
    },
  };
</script>

<style scoped>
.list-group-item {
  max-width: 400px;
}
</style>
