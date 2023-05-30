import { describe, it, expect } from 'vitest';
import { MountingOptions, VueWrapper, mount } from '@vue/test-utils';
import ModuleUpdateInformationAlert from '@/components/alert/ModuleUpdateInformationAlert.vue';
type ComponentProps = InstanceType<typeof ModuleUpdateInformationAlert>['$props'];

describe('ContextValidatorAlert component tests', () => {
  let wrapper: VueWrapper<any>;
  const findModuleUpdateInformationAlert = () => wrapper.find('[data-testid=account-module-update-information-alert]');

  const factory = (props?: Partial<ComponentProps>, options?: MountingOptions<any>) => {
    wrapper = mount(ModuleUpdateInformationAlert, {
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
