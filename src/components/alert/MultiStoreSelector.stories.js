// eslint-disable-next-line import/no-extraneous-dependencies
import {withKnobs, object, boolean} from '@storybook/addon-knobs';
// eslint-disable-next-line import/no-extraneous-dependencies
import {action} from '@storybook/addon-actions';
import MultiStoreSelector from './MultiStoreSelector';

const shopsTree = [
  {
    id: 1,
    name: 'Default',
    shops: [
      {
        id: 1,
        name: 'PrestaShop',
        url: 'http://localhost:8082/admin-dev/index.php?controller=AdminModules&setShopContext=s-1&token=7e6ed965a445faaa639275d16418264d',
      },
      {
        id: 2,
        name: 'shop2',
        url: 'http://localhost:8082/admin-dev/index.php?controller=AdminModules&setShopContext=s-2&token=7e6ed965a445faaa639275d16418264d',
      },
    ],
  },
];

const shopsTreeMultiGroup = [
  {
    id: 1,
    name: 'Default',
    shops: [
      {
        id: 1,
        name: 'PrestaShop',
        url: 'http://localhost:8082/admin-dev/index.php?controller=AdminModules&setShopContext=s-1&token=7e6ed965a445faaa639275d16418264d',
      },
      {
        id: 2,
        name: 'shop2',
        url: 'http://localhost:8082/admin-dev/index.php?controller=AdminModules&setShopContext=s-2&token=7e6ed965a445faaa639275d16418264d',
      },
    ],
  },
  {
    id: 3,
    name: 'shop_group2',
    shops: [
      {
        id: 3,
        name: 'shop3',
        url: 'http://localhost:8082/admin-dev/index.php?controller=AdminModules&setShopContext=s-3&token=7e6ed965a445faaa639275d16418264d',
      },
    ],
  },
  {
    id: 2,
    name: 'test',
    shops: [
      {
        id: 4,
        name: 'shop4',
        url: 'http://localhost:8082/admin-dev/index.php?controller=AdminModules&setShopContext=s-4&token=7e6ed965a445faaa639275d16418264d',
      },
    ],
  },
];

export default {
  title: 'Alert multi store selector',
  component: MultiStoreSelector,
  decorators: [withKnobs],
};

export const OneGroup = () => ({
  components: {MultiStoreSelector},
  props: {
    isMultiShop: {
      default: boolean('isMultiShop', true),
    },
    shops: {
      default: object('shops', shopsTree),
    },
  },
  methods: {
    event: action('shop-selected'),
  },
  template: '<MultiStoreSelector class="m-4" :isMultiShop="isMultiShop" :shops="shops" @shop-selected="event" />',
});

export const multiGroup = () => ({
  components: {MultiStoreSelector},
  props: {
    isMultiShop: {
      default: boolean('isMultiShop', true),
    },
    shops: {
      default: object('shops', shopsTreeMultiGroup),
    },
  },
  methods: {
    event: action('shop-selected'),
  },
  template: '<MultiStoreSelector class="m-4" :isMultiShop="isMultiShop" :shops="shops" @shop-selected="event" />',
});
