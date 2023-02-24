import * as zoid from 'zoid/dist/zoid.frameworks';

export default zoid.create({
  tag: "crossdomains-account-link-shop",
  url: ({ props }: { props: Record<string, unknown> }) =>
    `${props.accountsUiUrl}${props.specificUiUrl}/?isPopup=true`,

  defaultContext: "popup",

  dimensions: {
    width: "900px",
    height: "600px"
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
