import * as zoid from 'zoid/dist/zoid.frameworks';

export default zoid.create({
  tag: 'crossdomains-account-link-shops',
  url: 'https://accounts.prestashop.localhost/en/?cdc=true',
  context: 'iframe',

  // The size of the component on their page. Only px and % strings are supported
  dimensions: {
    height: '100%',
    width: '100%',
  },

  props: {
    shops: {
      type: 'array',
      required: false,
    },
  },
});
