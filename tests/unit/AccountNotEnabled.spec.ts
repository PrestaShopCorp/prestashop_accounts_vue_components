import {shallowMount} from '@vue/test-utils';
import AccountNotEnabled from '@/components/alert/subComponents/AccountNotEnabled.vue';

describe('AccountNotEnabled.vue', () => {
  it('renders title', () => {
    const titleStr = 'Activate the PrestaShop Account module';
    const wrapper = shallowMount(AccountNotEnabled);
    const title = wrapper.find('h3');
    expect(title.text()).toMatch(titleStr);
  });
});
