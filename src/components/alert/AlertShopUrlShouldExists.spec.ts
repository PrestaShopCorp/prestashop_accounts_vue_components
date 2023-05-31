import AlertShopUrlShouldExists from '@/components/alert/AlertShopUrlShouldExists.vue';
import { describe, it, expect } from 'vitest';
import { MountingOptions, VueWrapper, mount } from '@vue/test-utils';
import { faker } from '@faker-js/faker';

type ComponentProps = InstanceType<typeof AlertShopUrlShouldExists>['$props'];

describe('AlertShopUrlShouldExists component tests', () => {
  let wrapper: VueWrapper<any>;
  const findAlert = () => wrapper.find('[data-testid=shop-url-alert]');
  const findAlertShopList = () => wrapper.find('[data-testid=shop-url-alert-shop-list]');
  const factory = (props: Partial<ComponentProps>, options?: MountingOptions<any>) => {
    wrapper = mount(AlertShopUrlShouldExists, {
      props,
      ...options
    });
  };

  it('should display an alert on danger variant listing all the shops without url', () => {
    const shopsWithoutUrl = Array.from({ length: 3 }).map(() => faker.company.name());
    factory({
      shopsWithoutUrl
    });
    expect(findAlert().classes()).toContain('puik-alert--danger');
    expect(findAlertShopList().text()).toContain(shopsWithoutUrl.join(', '));
  });
});
