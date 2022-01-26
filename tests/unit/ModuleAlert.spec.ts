import {shallowMount} from '@vue/test-utils';
import ModuleAlert from '@/components/alert/ModuleAlert.vue';

describe('ModuleAlert.vue', () => {
  it('renders title', () => {
    const titleStr = 'Activate the PrestaShop Account module';
    const onAction = jest.fn();
    const wrapper = shallowMount(ModuleAlert, {
      propsData: {
        title: titleStr,
        message: 'random message',
        actionText: 'random action',
        loading: false,
        loadingText: 'random loading text',
      },
      listeners: {
        action: onAction,
      },
    });
    const title = wrapper.find('h3');
    expect(title.text()).toMatch(titleStr);
  });
});
