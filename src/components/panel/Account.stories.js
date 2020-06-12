// eslint-disable-next-line import/no-extraneous-dependencies
import {withKnobs, boolean, object} from '@storybook/addon-knobs';
// eslint-disable-next-line import/no-extraneous-dependencies
import {action} from '@storybook/addon-actions';
import Account from './Account';

export default {
  title: 'Components|Panels/Panel account',
  component: Account,
  decorators: [withKnobs],
};

export const NeedToBeAdmin = () => ({
  components: {Account},
  props: {
    isAdmin: {
      default: boolean('isAdmin', false),
    },
  },
  template: '<Account :isAdmin="isAdmin" class="m-4" />',
});

export const NotConnected = () => ({
  components: {Account},
  template: '<Account class="m-4" />', // TODO !0: onboardingLink is mandatory, where it is ?
});

export const Connected = () => ({
  components: {Account},
  props: {
    user: {
      default: object('user', {
        email: 'support@prestashop.com',
        emailIsValidated: true,
      }),
    },
  },
  methods: {
    event: action('sign-out'),
  },
  template: '<Account :user="user" @sign-out="event" class="m-4" />',
});

export const EmailValidationNeeded = () => ({
  components: {Account},
  props: {
    user: {
      default: object('user', {
        email: 'support@prestashop.com',
        emailIsValidated: false,
      }),
    },
  },
  methods: {
    event: action('sign-out'),
    sendEmail: action('send-email'),
  },
  template: '<Account :user="user" @sign-out="event" @send-email="sendEmail" class="m-4" />',
});
