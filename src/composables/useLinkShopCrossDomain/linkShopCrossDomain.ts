import * as zoid from 'zoid/dist/zoid.frameworks';
import { Shop } from '@/types/context';

interface LinkShopCrossDomainProps {
  app: string
  cdc?: string
  shops: Shop[]
  specificUiUrl: string
  accountsUiUrl: string
  triggerFallback?: Function
}

const zoidExport = window?.psAccountZoidExport || zoid.create({
  tag: 'crossdomains-account-link-shop',
  url: ({ props }: { props: LinkShopCrossDomainProps }) =>
    `${props.accountsUiUrl}${props.specificUiUrl}/?isPopup=true`,

  defaultContext: 'popup',

  dimensions: {
    width: '900px',
    height: '600px'
  },

  props: {
    app: {
      type: 'string',
      required: true,
      queryParam: true
    },
    cdc: {
      type: 'boolean',
      required: false,
      default: function () {
        return true;
      },
      queryParam: true
    },
    shops: {
      type: 'array',
      required: true
    },
    specificUiUrl: {
      type: 'string',
      required: true
    },
    accountsUiUrl: {
      type: 'string',
      required: true
    },
    triggerFallback: {
      type: 'function',
      required: false
    }
  }
});

window.psAccountZoidExport = zoidExport;

export default zoidExport;
