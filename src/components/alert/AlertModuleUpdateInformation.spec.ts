import { describe, it, expect } from 'vitest';
import { MountingOptions, VueWrapper, mount } from '@vue/test-utils';
import AlertModuleUpdateInformation from '@/components/alert/AlertModuleUpdateInformation.vue';
type ComponentProps = InstanceType<typeof AlertModuleUpdateInformation>['$props'];

describe('AlertModuleUpdateInformation component tests', () => {
  let wrapper: VueWrapper<any>;
  const findModuleUpdateInformationAlert = () => wrapper.find('[data-testid=account-module-update-information-alert]');

  const factory = (props?: Partial<ComponentProps>, options?: MountingOptions<any>) => {
    wrapper = mount(AlertModuleUpdateInformation, {
      props,
      global: {
        stubs: {
          'i18n-t': true
        }
      },
      ...options
    });
  };

  it('should display an information alert', async () => {
    factory();
    expect(findModuleUpdateInformationAlert().classes()).toContain('puik-alert--info');
  });
});
