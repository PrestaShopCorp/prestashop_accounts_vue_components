<template>
  <div />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import LinkShopCrossDomain from './linkShopCrossDomain';
import { Shop } from '@/types/context';

interface LinkShopModalProps {
  app: string;
  shops: Shop[];
  specificUiUrl: string;
  accountsUiUrl: string;
}

const props = defineProps<LinkShopModalProps>();

const emit = defineEmits(['closed']);

function close () {
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  linkShop?.close();
  emit('closed');
}

function triggerFallback () {
  const base64Shops = btoa(JSON.stringify(props.shops));
  let fallbackUrl = `${props.accountsUiUrl}${props.specificUiUrl}?`;
  fallbackUrl += `shops=${base64Shops}&return_to=${encodeURIComponent(window.location.href)}`;
  window.location.assign(fallbackUrl);
}

const linkShop = LinkShopCrossDomain({
  app: props.app,
  specificUiUrl: props.specificUiUrl,
  shops: props.shops,
  onBoardingFinished: close,
  accountsUiUrl: props.accountsUiUrl,
  triggerFallback,
  onDestroy: () => close(),
  onClose: () => close()
});

linkShop.render(undefined, 'popup');

onMounted(() => {
  // FallBack for crossdomain component
  setTimeout(() => {
    if (document.querySelector('.crossdomain .zoid-invisible')) {
      triggerFallback();
    }
  }, 60000);
});
</script>
