import Vue from 'vue';
import PsAccounts from '@/components/PsAccounts';
import Account from '@/components/panel/Account';
import AccountNotInstalled from '@/components/alert/AccountNotInstalled';
import AccountNotEnabled from '@/components/alert/AccountNotEnabled';
import MultiStoreSelector from '@/components/alert/MultiStoreSelector';
import {isOnboardingCompleted} from '@/lib/Helpers';

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
  isOnboardingCompleted,
};
