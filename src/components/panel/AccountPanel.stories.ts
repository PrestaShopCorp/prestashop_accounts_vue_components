import { ShopContext } from './../../types/context';
import type { Meta, StoryObj } from '@storybook/vue3';

import AccountPanel from './AccountPanel.vue';

const meta: Meta<typeof AccountPanel> = {
  title: 'Components/Panels/AccountPanel',
  component: AccountPanel
};

export default meta;
type Story = StoryObj<typeof AccountPanel>;

export const NotLinked: Story = {
  args: {
    accountsUiUrl: 'https://accounts.distribution.prestashop.net/en',
    app: 'ps_accounts',
    isSuperAdmin: true,
    shops: [{
      domain: 'myshop.com',
      domainSsl: 'myshop.com',
      id: '1',
      name: 'PrestaShop',
      publicKey: '',
      url: '',
      employeeId: null,
      isLinkedV4: false,
      user: {
        email: null,
        uuid: null
      },
      uuid: null
    }],
    shopsInContext: [{
      domain: 'myshop.com',
      domainSsl: 'myshop.com',
      id: '1',
      name: 'PrestaShop',
      publicKey: '',
      url: '',
      employeeId: null,
      isLinkedV4: false,
      user: {
        email: null,
        uuid: null
      },
      uuid: null
    }],
    shopContext: ShopContext.Shop
  }
};

export const PartiallyLinked: Story = {
  args: {
    accountsUiUrl: 'https://accounts.distribution.prestashop.net/en',
    app: 'ps_accounts',
    isSuperAdmin: true,
    shops: [{
      domain: 'myshop2.com',
      domainSsl: 'myshop2.com',
      id: '2',
      name: 'PrestaShop 2',
      publicKey: '',
      url: '',
      employeeId: null,
      isLinkedV4: false,
      user: {
        email: null,
        uuid: null
      },
      uuid: null
    }],
    shopsInContext: [{
      domain: 'myshop.com',
      domainSsl: 'myshop.com',
      id: '1',
      name: 'PrestaShop',
      publicKey: '',
      url: '',
      employeeId: null,
      isLinkedV4: false,
      user: {
        email: 'user@example.com',
        emailIsValidated: true
      },
      uuid: 'abcde-fghij'
    },
    {
      domain: 'myshop2.com',
      domainSsl: 'myshop2.com',
      id: '2',
      name: 'PrestaShop 2',
      publicKey: '',
      url: '',
      employeeId: null,
      isLinkedV4: false,
      user: {
        email: null,
        uuid: null
      },
      uuid: null
    }
    ],
    shopContext: ShopContext.All
  }
};

export const Linked: Story = {
  args: {
    accountsUiUrl: 'https://accounts.distribution.prestashop.net/en',
    app: 'ps_accounts',
    isSuperAdmin: true,
    shops: [],
    shopsInContext: [{
      domain: 'myshop.com',
      domainSsl: 'myshop.com',
      id: '1',
      name: 'PrestaShop',
      publicKey: '',
      url: '',
      employeeId: null,
      isLinkedV4: false,
      user: {
        email: 'user@example.com',
        emailIsValidated: true
      },
      uuid: '44b22bff-52e9-43f4-811f-9d9bd2f91cf0'
    }],
    shopContext: ShopContext.Shop
  }
};

export const SlotTemplate: Story = {
  args: {
    accountsUiUrl: 'https://accounts.distribution.prestashop.net/en',
    app: 'ps_accounts',
    isSuperAdmin: true,
    shops: [],
    shopsInContext: [{
      domain: 'myshop.com',
      domainSsl: 'myshop.com',
      id: '1',
      name: 'PrestaShop',
      publicKey: '',
      url: '',
      employeeId: null,
      isLinkedV4: false,
      user: {
        email: 'user@example.com',
        emailIsValidated: true
      },
      uuid: '44b22bff-52e9-43f4-811f-9d9bd2f91cf0'
    }],
    shopContext: ShopContext.Shop,
    default: 'Slot content here'
  }
};
