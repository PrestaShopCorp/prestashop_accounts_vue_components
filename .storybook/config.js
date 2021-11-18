import { configure } from '@storybook/vue';

// import css style
import 'bootstrap-vue/dist/bootstrap-vue';
import 'prestakit/dist/css/bootstrap-prestashop-ui-kit.css';
import Vue from "vue";
import VueI18n from "vue-i18n";
import Segment from "@prestashopcorp/segment-vue";

Vue.use(VueI18n);

Vue.use(Segment, {
  id: process.env.VUE_APP_SEGMENT,
  pageCategory: "ps_accounts-ui",
  debug: true
})

configure(require.context('../src', true, /\.stories\.(jsx?|mdx)$/), module);
