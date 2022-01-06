import { configure } from '@storybook/vue';

// import css style
import 'bootstrap-vue/dist/bootstrap-vue';
import 'prestakit/dist/css/bootstrap-prestashop-ui-kit.css';
import Vue from "vue";
import { Segment, VueCompositionAPI } from '@/ExternalDependencies';

Vue.use(Segment, {
  id: process.env.VUE_APP_SEGMENT,
  pageCategory: "ps_accounts-ui",
  debug: true
})

Vue.use(VueCompositionAPI)

configure(require.context('../src', true, /\.stories\.(jsx?|mdx)$/), module);
