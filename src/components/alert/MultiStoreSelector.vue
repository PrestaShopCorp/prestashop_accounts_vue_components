<template>
  <div
    v-if="!isShopContext"
  >
    <b-alert
      variant="warning"
      show
    >
      <h2>{{ $t('multiShopSelector.title') }}</h2>
      <p>{{ $t('multiShopSelector.subtitle') }}</p>
      <p>{{ $t('multiShopSelector.selectStore') }}</p>
      <b-list-group
        v-for="group in shopsTree"
        :key="group.id"
        class="mt-3 mb-3 col-4"
      >
        <p class="text-muted">
          {{ $t('general.multiShop.group') }} {{ group.name }}
        </p>
        <b-list-group-item
          v-for="shop in group.shops"
          :key="shop.id"
          :href="shop.url"
        >
          {{ $t('general.multiShop.configure') }} <b>{{ shop.name }}</b>
        </b-list-group-item>
      </b-list-group>
      <p>{{ $t('multiShopSelector.tips') }}</p>
    </b-alert>
  </div>
</template>

<script>
  export default {
    name: 'MultiStoreSelector',
    props: {
      isMultiShop: {
        type: Boolean,
        default: false,
      },
      shops: {
        type: Object,
        required: true,
      },
    },
  };
</script>
