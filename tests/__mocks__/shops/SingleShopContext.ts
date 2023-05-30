import { generateShops } from './Shop';
import { faker } from '@faker-js/faker';

export const singleShopNotLinked = {
  id: '1',
  moduleName: 'ps_accounts',
  multishop: false,
  name: faker.lorem.word(),
  psVersion: '8.0.2',
  shops: generateShops(1)
};

export const singleShopLinked = {
  id: '1',
  moduleName: 'ps_accounts',
  multishop: false,
  name: faker.lorem.word(),
  psVersion: '8.0.2',
  shops: generateShops(1, { isLinked: true })
};

export const singleShopLinkedV4 = {
  id: '1',
  moduleName: 'ps_accounts',
  multishop: false,
  name: faker.lorem.word(),
  psVersion: '8.0.2',
  shops: generateShops(1, { isLinkedV4: true })
};
