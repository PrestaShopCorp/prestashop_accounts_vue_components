import { create } from '@storybook/theming/create';
import { addons } from '@storybook/addons';

addons.setConfig({
  theme: create({
    base: "light",
    colorPrimary: "#000000",
    colorSecondary: "#000000",
    appBg: "#FFF",
    appBorderRadius: 0,
    fontBase: '"IBM Plex Sans", Helvetica, Verdana, sans-serif',
    brandTitle: "PS Accounts Vue Components",
    brandImage:
      "https://www.shareicon.net/data/256x256/2015/10/06/112712_development_512x512.png",
  }),
});
