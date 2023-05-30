import { singleShopLinked, singleShopNotLinked } from '../../../tests/__mocks__/shops/SingleShopContext';
import { ShopContext } from '@/types/context';
import { faker } from '@faker-js/faker';
import AccountPanel from '@/components/panel/AccountPanel.vue';
import { describe, it, expect } from 'vitest';
import { MountingOptions, VueWrapper, mount } from '@vue/test-utils';
type ComponentProps = InstanceType<typeof AccountPanel>['$props'];

describe('AccountPanel component tests', () => {
  let wrapper: VueWrapper<any>;
  const findIconLinked = () => wrapper.find('[data-testid=account-panel-linked-icon]');
  const findSlot = () => wrapper.find('[data-testid=account-panel-slot]');
  const findSlotContent = () => wrapper.find('[data-testid=account-panel-slot-content]');
  const findLinkButtons = () => wrapper.find('[data-testid=account-link-buttons]');
  const factory = (
    props: Partial<ComponentProps> = {},
    options: MountingOptions<any> = {}
  ) => {
    wrapper = mount(AccountPanel, {
      props: {
        accountsUiUrl: faker.internet.url(),
        app: faker.lorem.word(),
        isSuperAdmin: true,
        shopContext: ShopContext.Shop,
        ...props
      },
      ...options
    });
  };

  it('should display a check icon if there are linked shops', async () => {
    factory({
      shopsInContext: singleShopLinked.shops
    });
    expect(findIconLinked().exists()).toBeTruthy();
  });

  it('should hide the AccountLinkToUi buttons if there is a shop without an url', () => {
    factory({
      shopsInContext: singleShopNotLinked.shops,
      shopsWithoutUrl: [faker.lorem.word()]
    });
    expect(findLinkButtons().exists()).toBeFalsy();
  });

  it('should allow passing html in slots', () => {
    factory({
      shopsInContext: singleShopNotLinked.shops
    }, {
      slots: {
        default: {
          template: '<div data-testid="account-panel-slot-content"></div>'
        }
      }
    });
    expect(findSlot().exists()).toBeTruthy();
    expect(findSlotContent().exists()).toBeTruthy();
  });
});
