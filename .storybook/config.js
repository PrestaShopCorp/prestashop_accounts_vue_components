import { configure } from '@storybook/vue';

// import css style
import 'bootstrap-vue/dist/bootstrap-vue';
import 'prestakit/dist/css/bootstrap-prestashop-ui-kit.css';

configure(require.context('../src', true, /\.stories\.(jsx?|mdx)$/), module);
