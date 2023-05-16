<template>
  <div class="acc-flex acc-flex-col acc-flex-grow acc-items-center md:acc-flex-row">
    <img
      :src="PsLogo"
      class="acc-w-11 acc-h-11 md:acc-mr-3" />
    <div class="acc-mt-2 puik-body-default acc-text-center acc-align-middle md:acc-mt-0 md:acc-text-left">
      <template v-if="linkedShops.length">
        <div
          v-if="hasShopsLinkedBySameUser"
        >
          <p class="acc-m-0">
            {{ $tc('psaccounts.account.authorized', linkedShops.length) }}
          </p>
          <p class="acc-m-0 acc-text-font-500 acc-break-words">
            {{ linkedUserEmail }}
          </p>
        </div>
        <span
          v-else-if="linkedShops.length !== shopsInContext.length"
        >
          {{ $t('psaccounts.account.authorizedPartially') }}
        </span>
      </template>
      <span
        v-else
      >
        {{ $t('psaccounts.account.authorize') }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Shop } from '@/types/context';
import PsLogo from '@/assets/img/logo.png';
interface AccountShopLinkMessageProps {
  shopsInContext?: Shop[];
}

const props = withDefaults(defineProps<AccountShopLinkMessageProps>(), {
  shopsInContext: () => []
});

const hasShopsLinkedBySameUser = computed(
  () => props.shopsInContext.every((shop) => shop.employeeId === props.shopsInContext[0].employeeId)
);

const linkedShops = computed(() => props.shopsInContext.filter((shop) => shop.uuid && !shop.isLinkedV4));

const linkedUserEmail = computed(() => linkedShops.value[0]?.user?.email || '');
</script>
