<template>
  <div class="d-flex flex-column flex-grow-1 flex-md-row mr-md-3">
    <img
      class="mr-md-2 align-self-center"
      src="~@/assets/img/puffin_logo.png"
      width="44"
      height="44"
    >
    <div class="my-3 text-center align-middle align-self-center my-md-0 text-md-left">
      <template v-if="hasSomeShopsLinked">
        <div
          v-if="hasShopsLinkedBySameUser"
          class="text-left text-sm-center text-md-left"
        >
          <p class="m-0 align-middle">
            {{ t('psaccounts.account.authorized') }}
          </p>
          <p class="m-0 align-middle text-break text-muted d-md-block">
            {{ linkedUserEmail }}
          </p>
        </div>
        <span
          v-else-if="hasOneOrMoreNotLinkedShop"
        >
          {{ t('psaccounts.account.authorizedPartially') }}
        </span>
        <span
          v-else
        >
          {{ t('psaccounts.account.authorizedSeveral') }}
        </span>
      </template>
      <span
        v-else
      >
        {{ t('psaccounts.account.authorize') }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, PropType} from '@vue/composition-api';
import {Shop} from '@/types/context';
import Locale from '@/mixins/locale';

export default defineComponent({
  name: 'AccountShopLinkMessage',
  mixins: [Locale],
  props: {
    shops: {
      type: Array as PropType<Shop[]>,
      default: () => [],
    },
  },
  setup(props) {
    const hasOneOrMoreNotLinkedShop = computed(() => props.shops.some((shop) => !shop.uuid));

    const hasSomeShopsLinked = computed(
      () => props.shops.some((shop) => shop.uuid && !shop.isLinkedV4),
    );

    const hasShopsLinkedBySameUser = computed(
      () => props.shops.every((shop) => shop.employeeId === props.shops[0].employeeId),
    );

    const linkedShops = computed(() => props.shops.filter((shop) => shop.uuid && !shop.isLinkedV4));

    const linkedUserEmail = computed(() => linkedShops.value[0]?.user?.email || '');

    return {
      hasOneOrMoreNotLinkedShop,
      hasSomeShopsLinked,
      hasShopsLinkedBySameUser,
      linkedUserEmail,
    };
  },
});
</script>
