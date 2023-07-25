import { ShopContext } from '@/types/context';
import { faker } from '@faker-js/faker';
import InvitationBanner from '@/components/invitation/InvitationBanner.vue';
import { describe, it, expect } from 'vitest';
import { MountingOptions, mount } from '@vue/test-utils';
type ComponentProps = InstanceType<typeof InvitationBanner>['$props'];

describe('InvitationBanner component tests', () => {
  const factory = (
    props: Partial<ComponentProps> = {},
    options: MountingOptions<any> = {}
  ) => {
    mount(InvitationBanner, {
      props: {
        accountsUiUrl: faker.internet.url(),
        adminAjaxLink: faker.internet.url(),
        app: faker.lorem.word(),
        isSuperAdmin: true,
        shopContext: ShopContext.Shop,
        shops: [],
        shopsInContext: [],
        ...props
      },
      ...options
    });
  };

  it('should do an empty test (TODO)', () => {
    factory();
    expect(true).toBeTruthy();
  });
});
