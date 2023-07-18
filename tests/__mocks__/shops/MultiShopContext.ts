import { faker } from '@faker-js/faker';
import { generateShops } from './Shop';

export const multiShopNotLinked = {
  id: '1',
  moduleName: 'ps_accounts',
  multishop: true,
  name: faker.lorem.word(),
  psVersion: '8.0.2',
  shops: generateShops(3)
};

export const multiShopWithoutUrls = {
  id: '1',
  moduleName: 'ps_accounts',
  multishop: true,
  name: faker.lorem.word(),
  psVersion: '8.0.2',
  shops: generateShops(3, { shopsWithoutUrl: true })
};

export const multiShopLinked = {
  id: '1',
  moduleName: 'ps_accounts',
  multishop: true,
  name: faker.lorem.word(),
  psVersion: '8.0.2',
  shops: generateShops(3, { isLinked: true })
};

export const multiShopPartiallyLinked = {
  id: '1',
  moduleName: 'ps_accounts',
  multishop: true,
  name: faker.lorem.word(),
  psVersion: '8.0.2',
  shops: [
    ...generateShops(2, { isLinked: true }),
    ...generateShops(1)
  ]
};

export const multiShopLinkedV4 = {
  id: '1',
  moduleName: 'ps_accounts',
  multishop: true,
  name: faker.lorem.word(),
  psVersion: '8.0.2',
  shops: generateShops(3, { isLinkedV4: true })
};
