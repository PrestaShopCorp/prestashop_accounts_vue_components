import * as zoid from 'zoid/dist/zoid.frameworks';

// eslint-disable-next-line
// @ts-ignore
const zoidExport = window.psAccountZoidExport || zoid.create({
  tag: "crossdomains-account-link-shop",
  // TODO Put accounts-ui prod url when there is no env
  url: ({ props }: { props: Record<string, unknown> }) =>
    `${props.accountsUiUrl}${props.specificUiUrl}/`,

  context: "iframe",

  // The size of the component on their page. Only px and % strings are supported
  dimensions: {
    height: "100%",
    width: "100%",
  },

  props: {
    app: {
      type: "string",
      required: true,
      queryParam: true,
    },
    cdc: {
      type: "boolean",
      required: false,
      default: function () {
        return true;
      },
      queryParam: true,
    },
    shops: {
      type: "array",
      required: true,
    },
    specificUiUrl: {
      type: "string",
      required: true,
    },
    onBoardingFinished: {
      type: "function",
      required: false,
    },
    tracking: {
      type: "object",
      required: false,
    },
    onLogout: {
      type: "function",
      required: false,
    },
    accountsUiUrl: {
      type: "string",
      required: true,
    },
    triggerFallback: {
      type: "function",
      required: false,
    },
  },
});

// eslint-disable-next-line
// @ts-ignore
window.psAccountZoidExport = zoidExport;

export default zoidExport;
