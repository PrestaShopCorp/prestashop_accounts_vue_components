import { describe, it, expect } from 'vitest';
import { MountingOptions, VueWrapper, mount } from '@vue/test-utils';
import ContextValidatorAlert from '@/components/alert/ContextValidatorAlert.vue';
import { faker } from '@faker-js/faker';
type ComponentProps = InstanceType<typeof ContextValidatorAlert>['$props'];

describe('ContextValidatorAlert component tests', () => {
  let wrapper: VueWrapper<any>;
  const findContextValidatorAlert = () => wrapper.find('[data-testid=account-context-validator-alert]');

  const factory = (props?: Partial<ComponentProps>, options?: MountingOptions<any>) => {
    wrapper = mount(ContextValidatorAlert, {
      props,
      ...options
    });
  };

  it('should display all the passed errors in a danger alert', async () => {
    const errors = Array.from({ length: 3 }).map(() => faker.lorem.sentence());
    factory({ errors });
    expect(findContextValidatorAlert().classes()).toContain('puik-alert--danger');
    expect(findContextValidatorAlert().text()).toContain(errors.join(';'));
  });
});
