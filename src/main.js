import Vue from 'vue';
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue';
import App from './App.vue';
import i18n from './i18n/i18n';

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.config.productionTip = false;

new Vue({
  i18n,
  render: (h) => h(App),
}).$mount('#app');
