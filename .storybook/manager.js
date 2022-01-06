import { addons } from '@storybook/addons';
import { create } from '@storybook/theming/create';

addons.setConfig({ theme: create({
        base: 'light',

        colorPrimary: '#DF0067',
        colorSecondary: '#251B5B',
        appBg: '#E5E1F9',
        appBorderRadius: 5,
        fontBase: '"Open Sans", Helvetica, Verdana, sans-serif',

        brandTitle: 'PS Accounts Vue Components',
        brandImage: 'https://www.shareicon.net/data/256x256/2015/10/06/112712_development_512x512.png',
    })
});