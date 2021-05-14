import * as zoid from 'zoid/dist/zoid.frameworks';

// eslint-disable-next-line
console.log('ok');

export default zoid.create({
  tag: 'crossdomains-account-link-shop',
  // TODO Put accounts-ui prod url when there is no env
  url: ({props}) => `${process.env.VUE_APP_ACCOUNTS_UI_URL}${props.isLinked ? '/shop' : ''}/?cdc=true`,

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
    isLinked: {
      type: 'boolean',
      required: false,
      queryParam: true,
    },
    onBoardingFinished: {
      type: 'function',
      required: false,
    },
  },
});
