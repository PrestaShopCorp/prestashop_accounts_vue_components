import { generateContext, ShopContextStatus } from '../../tests/__mocks__/Context';
import PsAccounts from '@/components/PsAccounts.vue';
import { describe, it, expect } from 'vitest';
import { MountingOptions, VueWrapper, mount } from '@vue/test-utils';
type ComponentProps = InstanceType<typeof PsAccounts>['$props'];

describe('PsAccounts component tests', () => {
  let wrapper: VueWrapper<any>;
  const findContextValidatorAlert = () => wrapper.find('[data-testid=account-context-validator-alert]');
  const findShopUrlsAlert = () => wrapper.find('[data-testid=account-shop-url-should-exists-alert]');
  const findModuleUpdateInformationAlert = () => wrapper.find('[data-testid=account-module-information-alert]');
  const findUserNotSuperAdminAlert = () => wrapper.find('[data-testid=account-user-not-super-admin]');
  const findAccountPanel = () => wrapper.find('[data-testid=account-panel]');
  const findAccountFooterSlotContent = () => wrapper.find('[data-testid=account-footer-content]');

  const factory = (props?: Partial<ComponentProps>, options?: MountingOptions<any>) => {
    wrapper = mount(PsAccounts, {
      props: {
        ...props
      },
      global: {
        stubs: {
          'i18n-t': true
        }
      },
      ...options
    });
  };

  it('should display the context validator alert if the context isn\'t valid', () => {
    factory(
      {
        context: {
          ...generateContext({
            shopContextStatus: ShopContextStatus.SingleShopNotLinked
          }),
          // @ts-expect-error Needed for testing purposes
          psIs17: null
        }
      }
    );
    expect(findContextValidatorAlert().exists()).toBeTruthy();
  });

  it('should display the ShopUrlShouldExistsAlert if there is a shop without an url in the context', () => {
    factory({
      context: generateContext({
        shopContextStatus: ShopContextStatus.MultiShopWithoutUrls
      })
    });
    expect(findShopUrlsAlert().exists()).toBeTruthy();
  });

  it('should hide the Account panel when there is a blocking alert', () => {
    factory({
      context: generateContext({
        shopContextStatus: ShopContextStatus.SingleShopNotLinked,
        hasBlockingAlert: true
      })
    });
    expect(findAccountPanel().exists()).toBeFalsy();
  });

  it('should display the V4 alert when the shops are linked in v4', () => {
    factory({
      context: generateContext({
        shopContextStatus: ShopContextStatus.SingleShopLinkedV4
      })
    });
    expect(findModuleUpdateInformationAlert().exists()).toBeTruthy();
  });

  it('should display the not super admin alert if the current user isn\'t super admin', () => {
    factory({
      context: generateContext({
        shopContextStatus: ShopContextStatus.SingleShopNotLinked,
        isSuperAdmin: false
      })
    });
    expect(findUserNotSuperAdminAlert().exists()).toBeTruthy();
  });

  it('should disable the account footer slot if there is shops to link', () => {
    factory({
      context: generateContext({
        shopContextStatus: ShopContextStatus.SingleShopNotLinked
      })
    }, {
      slots: {
        'account-footer': {
          template: '<button data-testid="account-footer-content"></button>'
        }
      }
    });
    expect(findAccountFooterSlotContent().exists()).toBeFalsy();
  });
});
