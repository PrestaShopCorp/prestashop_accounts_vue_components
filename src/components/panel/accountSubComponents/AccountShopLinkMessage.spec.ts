import { multiShopNotLinked, multiShopLinkedV4, multiShopPartiallyLinked, multiShopLinked } from '../../../../tests/__mocks__/shops/MultiShopContext';
import { singleShopNotLinked, singleShopLinkedV4, singleShopLinked } from '../../../../tests/__mocks__/shops/SingleShopContext';
import { ShopContext } from '@/types/context';
import AccountShopLinkMessage from '@/components/panel/accountSubComponents/AccountShopLinkMessage.vue';
import { describe, it, expect } from 'vitest';
import { VueWrapper, MountingOptions, mount } from '@vue/test-utils';

type ComponentProps = InstanceType<typeof AccountShopLinkMessage>['$props'];

describe('AccountShopLinkMessage component tests', () => {
  let wrapper: VueWrapper<any>;
  const findNotLinkedMessage = () => wrapper.find('[data-testid=account-shop-link-message-not-linked]');
  const findSingleShopLinkedMessage = () => wrapper.find('[data-testid=account-shop-link-message-single-shop-linked]');
  const findSingleShopLinkedEmail = () => wrapper.find('[data-testid=account-shop-link-message-linked-email]');
  const findPartiallyLinkedShopsMessage = () => wrapper.find('[data-testid=account-shop-link-message-partially-linked-shops]');
  const findAllShopsLinkedMessage = () => wrapper.find('[data-testid=account-shop-link-message-all-shops-linked]');
  const factory = (props: Partial<ComponentProps>, options?: MountingOptions<any>) => {
    wrapper = mount(AccountShopLinkMessage, {
      props,
      ...options
    });
  };

  it('Single Shop - should display the not linked message when the shop is not linked', () => {
    factory({
      shopsInContext: singleShopNotLinked.shops,
      shopContext: ShopContext.Shop
    });
    expect(findNotLinkedMessage().exists()).toBeTruthy();
  });

  it('Single Shop - should display the not linked message when the shop is linked from V4', () => {
    factory({
      shopsInContext: singleShopLinkedV4.shops,
      shopContext: ShopContext.Shop
    });
    expect(findNotLinkedMessage().exists()).toBeTruthy();
  });

  it('Single Shop - should display the linked message when the shop is linked and the user email', () => {
    const shopsInContext = singleShopLinked.shops;
    factory({
      shopsInContext,
      shopContext: ShopContext.Shop
    });
    expect(findSingleShopLinkedMessage().exists()).toBeTruthy();
    expect(findSingleShopLinkedEmail().text()).toBe(shopsInContext[0].user?.email);
  });

  it('Multi Shop - should display the not linked message when all the shops aren\'t linked', () => {
    factory({
      shopsInContext: multiShopNotLinked.shops,
      shopContext: ShopContext.All
    });
    expect(findNotLinkedMessage().exists()).toBeTruthy();
  });

  it('Multi Shop - should display the not linked message when all the shops are linked in v4', () => {
    factory({
      shopsInContext: multiShopLinkedV4.shops,
      shopContext: ShopContext.All
    });
    expect(findNotLinkedMessage().exists()).toBeTruthy();
  });

  it('Multi Shop - should display the partially linked message when some of the shops are linked', () => {
    factory({
      shopsInContext: multiShopPartiallyLinked.shops,
      shopContext: ShopContext.All
    });
    expect(findPartiallyLinkedShopsMessage().exists()).toBeTruthy();
  });

  it('Multi Shop - should display the linked message when all the shops are linked', () => {
    factory({
      shopsInContext: multiShopLinked.shops,
      shopContext: ShopContext.All
    });
    expect(findAllShopsLinkedMessage().exists()).toBeTruthy();
  });

  it('Shop Group- should display the not linked message when all the shops aren\'t linked', () => {
    factory({
      shopsInContext: multiShopNotLinked.shops,
      shopContext: ShopContext.Group
    });
    expect(findNotLinkedMessage().exists()).toBeTruthy();
  });

  it('Shop Group - should display the not linked message when all the shops are linked in v4', () => {
    factory({
      shopsInContext: multiShopLinkedV4.shops,
      shopContext: ShopContext.Group
    });
    expect(findNotLinkedMessage().exists()).toBeTruthy();
  });

  it('Shop Group - should display the partially linked message when some of the shops are linked', () => {
    factory({
      shopsInContext: multiShopPartiallyLinked.shops,
      shopContext: ShopContext.Group
    });
    expect(findPartiallyLinkedShopsMessage().exists()).toBeTruthy();
  });

  it('Shop Group - should display the linked message when all the shops are linked', () => {
    factory({
      shopsInContext: multiShopLinked.shops,
      shopContext: ShopContext.Group
    });
    expect(findAllShopsLinkedMessage().exists()).toBeTruthy();
  });
});
