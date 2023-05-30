import { multiShopNotLinked, multiShopPartiallyLinked } from '../../../../tests/__mocks__/shops/MultiShopContext';
import { singleShopNotLinked } from '../../../../tests/__mocks__/shops/SingleShopContext';
import AccountLinkToUi from '@/components/panel/accountSubComponents/AccountLinkToUi.vue';
import { faker } from '@faker-js/faker';
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, afterEach } from 'vitest';
import type { MountingOptions, VueWrapper } from '@vue/test-utils';
import * as linkShopComposable from '@/composables/useLinkShopCrossDomain';
type ComponentProps = InstanceType<typeof AccountLinkToUi>['$props'];
describe('AccountLinkToUi component tests', () => {
  const useLinkShopCrossDomainMock = vi.spyOn(linkShopComposable, 'useLinkShopCrossDomain');
  let wrapper: VueWrapper<any>;
  const open = vi.fn();
  const findLinkShopButton = () => wrapper.find('[data-testid=account-link-to-ui-link-shop-button]');
  const findManageShopsButton = () => wrapper.find('[data-testid=account-link-to-ui-manage-shops-button]');

  afterEach(() => {
    vi.clearAllMocks();
  });

  const factory = (
    props: Partial<ComponentProps> = {},
    options: MountingOptions<any> = {}
  ) => {
    const defaults = {
      app: faker.lorem.word(),
      accountsUiUrl: faker.internet.url()
    };
    useLinkShopCrossDomainMock.mockReturnValue({
      open,
      state: {
        accountsUiUrl: defaults.accountsUiUrl,
        app: faker.lorem.word(),
        shops: props.shops ?? [],
        specificUiUrl: ''
      }
    });

    wrapper = mount(AccountLinkToUi, {
      props: {
        isSuperAdmin: true,
        ...defaults,
        ...props
      },
      ...options
    });
  };

  it('Single Shop - should display a link shop button when the shop is not linked', async () => {
    factory({
      shops: singleShopNotLinked.shops,
      hasShopsLinked: false
    });
    expect(findLinkShopButton().exists()).toBeTruthy();
    await findLinkShopButton().trigger('click');
    expect(open).toBeCalled();
  });

  it('Single Shop - should display a disabled link shop button when the shop is not linked and the user isn\'t a super admin', async () => {
    factory({
      shops: singleShopNotLinked.shops,
      hasShopsLinked: false,
      isSuperAdmin: false
    });
    expect(findLinkShopButton().exists()).toBeTruthy();
    expect((findLinkShopButton().element as HTMLButtonElement).disabled).toBeTruthy();
    await findLinkShopButton().trigger('click');
    expect(open).toBeCalledTimes(0);
  });

  it('Single Shop - should only display the manage shop button when the shop is linked', async () => {
    factory({
      hasShopsLinked: true
    });
    expect(findManageShopsButton().exists()).toBeTruthy();
    await findManageShopsButton().trigger('click');
    expect(open).toBeCalled();
  });

  it('Multi Shop - should display a link shop button when the shops aren\'t linked', async () => {
    factory({
      shops: multiShopNotLinked.shops,
      hasShopsLinked: false
    });
    expect(findLinkShopButton().exists()).toBeTruthy();
    await findLinkShopButton().trigger('click');
    expect(open).toBeCalled();
  });

  it('Multi Shop - should display a disabled link shop button when the shops aren\'t linked and the user isn\'t a super admin', async () => {
    factory({
      shops: multiShopNotLinked.shops,
      hasShopsLinked: false,
      isSuperAdmin: false
    });
    expect(findLinkShopButton().exists()).toBeTruthy();
    expect((findLinkShopButton().element as HTMLButtonElement).disabled).toBeTruthy();
    await findLinkShopButton().trigger('click');
    expect(open).toBeCalledTimes(0);
  });

  it('Multi Shop - should display a link shop button & a manage shops button when the shops in the context aren\'t all linked', async () => {
    factory({
      shops: multiShopPartiallyLinked.shops,
      hasShopsLinked: true
    });
    expect(findLinkShopButton().exists()).toBeTruthy();
    expect(findManageShopsButton().exists()).toBeTruthy();
    await findManageShopsButton().trigger('click');
    expect(open).toBeCalled();
  });

  it('Multi Shop - should only display the manage shop button when all shops in the context are linked', async () => {
    factory({
      hasShopsLinked: true
    });
    expect(findManageShopsButton().exists()).toBeTruthy();
    await findManageShopsButton().trigger('click');
    expect(open).toBeCalled();
  });
});
