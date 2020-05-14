// eslint-disable-next-line import/no-extraneous-dependencies
import {withKnobs, object, boolean} from '@storybook/addon-knobs';
// eslint-disable-next-line import/no-extraneous-dependencies
import {action} from '@storybook/addon-actions';
import i18n from '@/i18n/i18n';
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

export const multiGroup = () => ({
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
    event: action('selected-shop'),
  },
  template: '<MultiStoreSelector class="m-4" :isMultiShop="isMultiShop" :shopsTree="shops" @selected-shop="event" />',
  i18n,
});
