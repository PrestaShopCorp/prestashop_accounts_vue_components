import {shallowMount} from '@vue/test-utils';
import BaseAlert from '@/components/alert/BaseAlert.vue';

describe('BaseAlert.vue', () => {
  it('display slot content', () => {
    const defaultSlot = 'My slot content';
    const wrapper = shallowMount(BaseAlert, {
      slots: {
        default: defaultSlot,
      },
    });

    expect(wrapper.text()).toMatch(defaultSlot);
  });
});
