import Vue from 'vue';
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue';
import PsAccounts from '@/components/PsAccounts';
import Account from '@/components/panel/Account';
import AccountNotInstalled from '@/components/alert/AccountNotInstalled';
import AccountNotEnabled from '@/components/alert/AccountNotEnabled';
import MultiStoreSelector from '@/components/alert/MultiStoreSelector';

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

const Components = {
  PsAccounts,
  Account,
  AccountNotInstalled,
  AccountNotEnabled,
  MultiStoreSelector,
};

Object.keys(Components).forEach((name) => {
  Vue.component(name, Components[name]);
});

export default Components;

export {
  PsAccounts,
  Account,
  AccountNotInstalled,
  AccountNotEnabled,
  MultiStoreSelector,
};
