// eslint-disable-next-line import/no-extraneous-dependencies
import {withKnobs, boolean} from '@storybook/addon-knobs';
// eslint-disable-next-line import/no-extraneous-dependencies
import {action} from '@storybook/addon-actions';
import i18n from '@/i18n/i18n';
import AccountNotEnabled from './AccountNotEnabled';

export default {
  title: 'Alert account not enabled',
  component: AccountNotEnabled,
  decorators: [withKnobs],
};

export const Disabled = () => ({
  components: {AccountNotEnabled},
  props: {
    accountIsEnabled: {
      default: boolean('AccountIsEnabled', false),
    },
  },
  methods: {
    event: action('enable'),
  },
  template: '<AccountNotEnabled class="m-4" :accountIsEnabled="accountIsEnabled" @enable="event" />',
  i18n,
});
