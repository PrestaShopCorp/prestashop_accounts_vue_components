import * as zoid from 'zoid/dist/zoid.frameworks';

export default zoid.create({
  tag: 'crossdomains-account-link-shop',
  // TODO Put accounts-ui prod url when there is no env
  url: ({props}) => `${props.accountsUiUrl}${props.specificUiUrl}/?cdc=true`,

  context: 'iframe',

  // The size of the component on their page. Only px and % strings are supported
  dimensions: {
    height: '100%',
    width: '100%',
  },

  props: {
    shop: {
      type: 'object',
      required: false,
    },
    specificUiUrl: {
      type: 'string',
      required: true,
    },
    onBoardingFinished: {
      type: 'function',
      required: false,
    },
    tracking: {
      type: 'object',
      required: false,
    },
    onLogout: {
      type: 'function',
      required: false,
    },
    accountsUiUrl: {
      type: 'string',
      required: true,
    },
    triggerFallback: {
      type: 'function',
      required: false,
    },
  },
});
