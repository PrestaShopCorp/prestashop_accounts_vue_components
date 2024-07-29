import AlertShopUnlinked from '@/components/alert/AlertShopUnlinked.vue';
import { VueWrapper, MountingOptions, mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';

type ComponentProps = InstanceType<typeof AlertShopUnlinked>['$props'];

describe('AlertShopUnlinked component tests', () => {
  let wrapper: VueWrapper<any>;
  const findAlert = () => wrapper.find('[data-testid=shop-unlinked-alert]');
  const findAlertDescription = () => wrapper.find('[data-testid=shop-unlinked-alert-message]');
  const factory = (
    props: Partial<ComponentProps> = {},
    options: MountingOptions<any> = {}
  ) => {
    wrapper = mount(AlertShopUnlinked, {
      props,
      ...options
    });
  };

  it('should display an alert on warning variant and display the superAdminEmail', () => {
    factory({});
    expect(findAlert().classes()).toContain('puik-alert--danger');
    expect(findAlertDescription().text()).toBeDefined();
  });
});
