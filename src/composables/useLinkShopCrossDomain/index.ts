import { reactive } from 'vue';
import LinkShopCrossDomain from './linkShopCrossDomain';
import { Shop } from '@/types/context';
interface LinkShopOptions {
  app: string
  shops: Shop[]
  accountsUiUrl: string
}

export const useLinkShopCrossDomain = (options: LinkShopOptions) => {
  const state = reactive({
    ...options,
    specificUiUrl: ''
  });

  const linkShop = LinkShopCrossDomain({
    ...state,
    onBoardingFinished: close,
    onDestroy: () => close(),
    onClose: () => close()
  });

  function open () {
    linkShop.updateProps({ ...state });
    linkShop.render(undefined, 'popup');
  }

  function close () {
    linkShop?.close();
    window.location.reload();
  }

  return { open, state };
};
