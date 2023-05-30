import { multiShopLinked, multiShopNotLinked, multiShopWithoutUrls, multiShopPartiallyLinked, multiShopLinkedV4 } from './shops/MultiShopContext';
import { singleShopLinked, singleShopNotLinked, singleShopLinkedV4 } from './shops/SingleShopContext';
import { Context } from '@/types/context';
import { ShopContext } from './../../src/types/context';
import { faker } from '@faker-js/faker';

interface GenerateContextOptions {
  shopContextStatus: ShopContextStatus
  hasBlockingAlert?: boolean
  isSuperAdmin?: boolean
}

export enum ShopContextStatus {
  SingleShopNotLinked,
  SingleShopLinkedV4,
  SingleShopLinked,
  MultiShopNotLinked,
  MultiShopWithoutUrls,
  MultiShopLinkedV4,
  MultiShopPartiallyLinked,
  MultiShopLinked,
}

const getShops = [
  singleShopNotLinked,
  singleShopLinkedV4,
  singleShopLinked,
  multiShopNotLinked,
  multiShopWithoutUrls,
  multiShopLinkedV4,
  multiShopPartiallyLinked,
  multiShopLinked
];

export const generateContext = (options: GenerateContextOptions): Context => {
  return {
    accountsUiUrl: faker.internet.url(),
    backendUser: {
      email: faker.internet.email(),
      employeeId: 1,
      isSuperAdmin: options?.isSuperAdmin ?? true
    },
    currentContext: {
      id: options?.shopContextStatus <= 2 ? 1 : null,
      type: options?.shopContextStatus > 2 ? ShopContext.All : ShopContext.Shop
    },
    onboardingLink: faker.internet.url(),
    psAccountsEnableLink: faker.internet.url(),
    psAccountsInstallLink: faker.internet.url(),
    psAccountsIsEnabled: !options?.hasBlockingAlert ?? true,
    psAccountsIsInstalled: !options?.hasBlockingAlert ?? true,
    psAccountsIsUptodate: !options?.hasBlockingAlert ?? true,
    psAccountsUpdateLink: faker.internet.url(),
    psIs17: true,
    psxName: faker.company.name(),
    shops: [getShops[options.shopContextStatus]],
    ssoResendVerificationEmail: faker.internet.url(),
    superAdminEmail: faker.internet.email(),
    user: {
      email: faker.internet.email(),
      emailIsValidated: true,
      isSuperAdmin: options?.isSuperAdmin ?? true,
      uuid: faker.string.uuid()
    }
  };
};
