import { Shop } from '@/types/context';
import { faker } from '@faker-js/faker';
interface GenerateShopOptions {
  isLinked?: boolean
  isLinkedV4?: boolean
  emailIsValidated?: boolean
  shopsWithoutUrl?: boolean
}

export const generateShops = (nbShops: number, options?: GenerateShopOptions) => {
  const shops: Shop[] = [];
  for (let i = 0; i < nbShops; i++) {
    shops.push({
      domain: options?.shopsWithoutUrl ? null : faker.internet.domainName(),
      domainSsl: options?.shopsWithoutUrl ? null : faker.internet.domainName(),
      employeeId: null,
      frontUrl: faker.internet.url(),
      id: String(i + 1),
      isLinkedV4: options?.isLinkedV4 ?? false,
      moduleName: 'ps_accounts',
      multishop: false,
      name: faker.lorem.word(),
      physicalUri: '/',
      psVersion: '8.0.2',
      publicKey: 'publicKey',
      url: faker.internet.url(),
      user: {
        email: options?.isLinked ? faker.internet.email() : null,
        emailIsValidated: options?.emailIsValidated ?? false,
        uuid: options?.isLinked ? faker.string.uuid() : null
      },
      uuid: options?.isLinked ? faker.string.uuid() : null,
      virtualUri: ''
    });
  }
  return shops;
};
