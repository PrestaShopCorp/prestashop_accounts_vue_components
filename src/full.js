import Vue from 'vue';
import AccountNotInstalled from './components/alert/AccountNotInstalled';
import AccountNotEnabled from './components/alert/AccountNotEnabled';
import MultiStoreSelector from './components/alert/MultiStoreSelector';
import Account from './components/panel/Account';

const Components = {
  AccountNotInstalled,
  AccountNotEnabled,
  MultiStoreSelector,
  Account,
};

Object.keys(Components).forEach((name) => {
  Vue.component(name, Components[name]);
});

export default Components;

export {
  AccountNotInstalled,
  AccountNotEnabled,
  MultiStoreSelector,
  Account,
};
