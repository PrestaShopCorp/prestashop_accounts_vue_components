import { describe, it, expect } from 'vitest';
import { MountingOptions, VueWrapper, mount } from '@vue/test-utils';
import BaseOverlay from './BaseOverlay.vue';
type ComponentProps = InstanceType<typeof BaseOverlay>['$props'];

describe('BaseOverlay component tests', () => {
  let wrapper: VueWrapper<any>;
  const findBaseOverlay = () => wrapper.find('[data-testid=account-base-overlay]');

  const factory = (props?: Partial<ComponentProps>, options?: MountingOptions<any>) => {
    wrapper = mount(BaseOverlay, {
      props,
      ...options
    });
  };

  it('should enable the content overlay', async () => {
    factory({ show: true });
    expect(findBaseOverlay().isVisible()).toBeTruthy();
  });

  it('should disable the content overlay', () => {
    factory();
    expect(findBaseOverlay().isVisible()).toBeFalsy();
  });
});
