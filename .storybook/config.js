import { configure } from '@storybook/vue';
import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
// import css style
import 'bootstrap-vue/dist/bootstrap-vue';
import 'prestakit/dist/css/bootstrap-prestashop-ui-kit.css';

Vue.use(BootstrapVue);

configure(require.context('../src', true, /\.stories\.(jsx?|mdx)$/), module);
