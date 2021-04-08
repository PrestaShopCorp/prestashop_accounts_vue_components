import * as zoid from 'zoid/dist/zoid.frameworks';

export default zoid.create({
  tag: 'crossdomains-account-link-shop',
  url: 'http://localhost:3000/en/',
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
    },
  },
});
