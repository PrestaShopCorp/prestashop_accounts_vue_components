import AlertUserNotSuperAdmin from '@/components/alert/AlertUserNotSuperAdmin.vue';
import { faker } from '@faker-js/faker';
import { VueWrapper, MountingOptions, mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';

type ComponentProps = InstanceType<typeof AlertUserNotSuperAdmin>['$props'];

describe('AlertUserNotSuperAdmin component tests', () => {
  let wrapper: VueWrapper<any>;
  const findAlert = () => wrapper.find('[data-testid=user-not-admin-alert]');
  const findAlertDescription = () => wrapper.find('[data-testid=user-not-admin-alert-message]');
  const factory = (
    props: Partial<ComponentProps> = {},
    options: MountingOptions<any> = {}
  ) => {
    wrapper = mount(AlertUserNotSuperAdmin, {
      props,
      ...options
    });
  };

  it('should display an alert on warning variant and display the superAdminEmail', () => {
    const superAdminEmail = faker.internet.email();
    factory({
      superAdminEmail
    });
    expect(findAlert().classes()).toContain('puik-alert--warning');
    expect(findAlertDescription().text()).toContain(superAdminEmail);
  });
});
