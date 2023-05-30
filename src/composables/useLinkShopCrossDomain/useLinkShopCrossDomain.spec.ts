import { useLinkShopCrossDomain } from '@/composables/useLinkShopCrossDomain';
import { it, describe, expect, vi, afterEach } from 'vitest';
import { faker } from '@faker-js/faker';
import { singleShopNotLinked } from '../../../tests/__mocks__/shops/SingleShopContext';

describe('useLinkShopCrossDomain Composable tests', () => {
  const mocks = vi.hoisted(() => {
    return {
      updateProps: vi.fn(),
      render: vi.fn(),
      close: vi.fn()
    };
  });
  vi.mock('@/composables/useLinkShopCrossDomain/linkShopCrossDomain', () => ({
    default: () => ({
      updateProps: mocks.updateProps,
      render: mocks.render
    })
  }));

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should return a reactive state containing the passed data', () => {
    const data = {
      accountsUiUrl: faker.internet.url(),
      app: faker.lorem.word(),
      shops: singleShopNotLinked.shops
    };
    const { state } = useLinkShopCrossDomain(data);
    expect(state).toStrictEqual({
      ...data,
      specificUiUrl: ''
    });
  });

  it('should update the props and render the crossdomain when open is called', async () => {
    const data = {
      accountsUiUrl: faker.internet.url(),
      app: faker.lorem.word(),
      shops: singleShopNotLinked.shops
    };
    const { open } = useLinkShopCrossDomain(data);
    await open();
    expect(mocks.updateProps).toHaveBeenCalled();
    expect(mocks.render).toHaveBeenCalled();
  });
});
