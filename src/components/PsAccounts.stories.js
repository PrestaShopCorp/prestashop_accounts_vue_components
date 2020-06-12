import { withKnobs, object } from '@storybook/addon-knobs';
import PsAccounts from './PsAccounts';

export default {
  title: 'Integration|Ps-Accounts panel',
  component: PsAccounts,
  decorators: [withKnobs],
};

export const Connected = () => ({
  components: { PsAccounts },
  props: {
    context: {
      default: object('context', {
        psAccountsIsInstalled: true,
        psAccountIsEnabled: true,
        currentShop: {
          id: 1,
          name: 'PrestaShop',
          url: 'http://localhost:8082/admin-dev/index.php?controller=AdminModules&setShopContext=s-1&token=7e6ed965a445faaa639275d16418264d',
        },
        shops: [
          {
            id: 1,
            name: 'Default',
            shops: [
              {
                id: 1,
                name: 'PrestaShop',
                url: 'http://localhost:8082/admin-dev/index.php?controller=AdminModules&setShopContext=s-1&token=7e6ed965a445faaa639275d16418264d',
              },
              {
                id: 2,
                name: 'shop2',
                url: 'http://localhost:8082/admin-dev/index.php?controller=AdminModules&setShopContext=s-2&token=7e6ed965a445faaa639275d16418264d',
              },
            ],
          },
        ],
        user: {
          email: 'support@prestashop.com',
          emailIsValidated: true,
        },
        onboardingLink: 'http://perdu.com'
      })
    },
  },
  template: '<PsAccounts :context="context">' +
    '<template v-slot:body>- I am connected -</template>' +
    '<template v-slot:customBody>- Custom body, always present -</template>' +
  '</PsAccounts>',
});

export const InvalidContext = () => ({
  components: { PsAccounts },
  props: {
    context: {
      default: object('context', {
        psAccountsIsInstalled: 'true', // will pass: can be casted to boolean by Joi
        psAccountIsEnabled: 'ptet-ben-k-non',
        currentShop: 42,
        shops: [
          {
            id: 1,
            name: 'Default',
            shops: [
              {
                id: 1,
                name: 'PrestaShop',
                url: 'http://localhost:8082/admin-dev/index.php?controller=AdminModules&setShopContext=s-1&token=7e6ed965a445faaa639275d16418264d',
              }
            ],
          },
        ],
        user: {
          email: 'this-is-not-a-valid-email',
          emailIsValidated: 42,
        },
        onboardingLink: '42*'
      })
    },
  },
  template: '<PsAccounts :context="context">' +
      '<template v-slot:body>- I am connected -</template>' +
      '<template v-slot:customBody>- Custom body, always present -</template>' +
      '</PsAccounts>',
});