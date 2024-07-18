import { ShopContext } from './../types/context';
import type { Meta, StoryObj } from '@storybook/vue3';

import PsAccounts from './PsAccounts.vue';

const meta: Meta<typeof PsAccounts> = {
  title: 'Components/PsAccounts',
  component: PsAccounts
};

export default meta;
type Story = StoryObj<typeof PsAccounts>;

export const NotLinked: Story = {
  args: {
    context: {
      accountsUiUrl: 'https://accounts.distribution.prestashop.net/en',
      backendUser: {
        email: 'email@bo.com',
        isSuperAdmin: true,
        employeeId: 1
      },
      currentContext: {
        id: 1,
        type: ShopContext.Shop
      },
      psAccountsInstallLink: null,
      psAccountsEnableLink: null,
      psAccountsUpdateLink: null,
      psAccountsIsInstalled: true,
      psAccountsIsEnabled: true,
      psIs17: true,
      psxName: 'ps_accounts',
      shops: [
        {
          id: '1',
          name: 'Default',
          shops: [
            {
              domain: 'myshop.com',
              domainSsl: 'myshop.com',
              id: '1',
              name: 'PrestaShop',
              publicKey: 'publicKey',
              url: 'http://localhost:8082/admin-dev/index.php?controller=AdminModules&setShopContext=s-1&token=7e6ed965a445faaa639275d16418264d',
              employeeId: null,
              isLinkedV4: false,
              user: {
                email: null,
                uuid: null
              },
              uuid: null
            }
          ]
        }
      ],
      user: {
        email: null,
        emailIsValidated: false,
        isSuperAdmin: true
      },
      superAdminEmail: 'big.boss@my-shop.com',
      ssoResendVerificationEmail: 'http://perdu.com',
      dependencies: {
        ps_eventbus: {
          enableLink: 'http://localhost:80/admin-dev/index.php/improve/modules/manage/action/enable/ps_eventbus?_token=up_TmQFm66p9dwunsmfNzk2UfDD3a8tsxdW5a7KviKw',
          installLink: 'http://localhost:80/admin-dev/index.php/improve/modules/manage/action/install/ps_eventbus?_token=up_TmQFm66p9dwunsmfNzk2UfDD3a8tsxdW5a7KviKw',
          isEnabled: true,
          isInstalled: true
        }
      },
      onboardingLink: ''
    },
    default: '- Module settings part, disabled -'
  }
};

export const Linked: Story = {
  args: {
    context: {
      accountsUiUrl: 'https://accounts.distribution.prestashop.net/en',
      backendUser: {
        email: 'email@bo.com',
        isSuperAdmin: true,
        employeeId: 1
      },
      currentContext: {
        id: 1,
        type: ShopContext.Shop
      },
      psAccountsInstallLink: null,
      psAccountsEnableLink: null,
      psAccountsUpdateLink: null,
      psAccountsIsInstalled: true,
      psAccountsIsEnabled: true,
      psIs17: true,
      psxName: 'ps_accounts',
      shops: [
        {
          id: '1',
          name: 'Default',
          shops: [
            {
              domain: 'myshop.com',
              domainSsl: 'myshop.com',
              id: '1',
              name: 'PrestaShop',
              publicKey: 'publicKey',
              url: 'http://localhost:8082/admin-dev/index.php?controller=AdminModules&setShopContext=s-1&token=7e6ed965a445faaa639275d16418264d',
              employeeId: null,
              isLinkedV4: false,
              user: {
                email: 'user@example.com',
                emailIsValidated: true
              },
              uuid: '44b22bff-52e9-43f4-811f-9d9bd2f91cf0'
            }
          ]
        }
      ],
      user: {
        email: 'user@example.com',
        emailIsValidated: true,
        isSuperAdmin: true
      },
      superAdminEmail: 'admin@example.com',
      ssoResendVerificationEmail: 'http://perdu.com',
      dependencies: {
        ps_eventbus: {
          enableLink: 'http://localhost:80/admin-dev/index.php/improve/modules/manage/action/enable/ps_eventbus?_token=up_TmQFm66p9dwunsmfNzk2UfDD3a8tsxdW5a7KviKw',
          installLink: 'http://localhost:80/admin-dev/index.php/improve/modules/manage/action/install/ps_eventbus?_token=up_TmQFm66p9dwunsmfNzk2UfDD3a8tsxdW5a7KviKw',
          isEnabled: true,
          isInstalled: true
        }
      },
      onboardingLink: ''
    },
    default: '- Module settings part, disabled -'
  }
};

export const IncorrectContext: Story = {
  args: {
    // @ts-expect-error
    context: {
      accountsUiUrl: 'https://accounts.distribution.prestashop.net/en',
      backendUser: {
        email: 'email@bo.com',
        isSuperAdmin: true,
        employeeId: 1
      },
      currentContext: {
        id: 1,
        type: ShopContext.Shop
      },
      psAccountsInstallLink: null,
      psAccountsEnableLink: null,
      psAccountsUpdateLink: null,
      psAccountsIsInstalled: true,
      psAccountsIsEnabled: true,
      psxName: 'ps_accounts',
      shops: [
        {
          id: '1',
          name: 'Default',
          shops: [
            {
              domain: 'myshop.com',
              domainSsl: 'myshop.com',
              id: '1',
              name: 'PrestaShop',
              publicKey: 'publicKey',
              url: 'http://localhost:8082/admin-dev/index.php?controller=AdminModules&setShopContext=s-1&token=7e6ed965a445faaa639275d16418264d',
              employeeId: null,
              isLinkedV4: false,
              user: {
                email: null,
                uuid: null
              },
              uuid: null
            }
          ]
        }
      ],
      user: {
        email: null,
        emailIsValidated: false,
        isSuperAdmin: true
      },
      superAdminEmail: 'admin@example.com',
      ssoResendVerificationEmail: 'http://perdu.com',
      dependencies: {
        ps_eventbus: {
          enableLink: 'http://localhost:80/admin-dev/index.php/improve/modules/manage/action/enable/ps_eventbus?_token=up_TmQFm66p9dwunsmfNzk2UfDD3a8tsxdW5a7KviKw',
          installLink: 'http://localhost:80/admin-dev/index.php/improve/modules/manage/action/install/ps_eventbus?_token=up_TmQFm66p9dwunsmfNzk2UfDD3a8tsxdW5a7KviKw',
          isEnabled: true,
          isInstalled: true
        }
      },
      onboardingLink: ''
    },
    default: '- Module settings part, disabled -'
  }
};

export const NotInstalled: Story = {
  args: {
    context: {
      accountsUiUrl: 'https://accounts.distribution.prestashop.net/en',
      backendUser: {
        email: 'email@bo.com',
        isSuperAdmin: true,
        employeeId: 1
      },
      currentContext: {
        id: 1,
        type: ShopContext.Shop
      },
      psAccountsInstallLink: null,
      psAccountsEnableLink: null,
      psAccountsUpdateLink: null,
      psAccountsIsInstalled: false,
      psAccountsIsEnabled: false,
      psIs17: true,
      psxName: 'ps_accounts',
      shops: [
        {
          id: '1',
          name: 'Default',
          shops: [
            {
              domain: 'myshop.com',
              domainSsl: 'myshop.com',
              id: '1',
              name: 'PrestaShop',
              publicKey: 'publicKey',
              url: 'http://localhost:8082/admin-dev/index.php?controller=AdminModules&setShopContext=s-1&token=7e6ed965a445faaa639275d16418264d',
              employeeId: null,
              isLinkedV4: false,
              user: {
                email: null,
                uuid: null
              },
              uuid: null
            }
          ]
        }
      ],
      user: {
        email: null,
        emailIsValidated: false,
        isSuperAdmin: true
      },
      superAdminEmail: 'admin@example.com',
      ssoResendVerificationEmail: 'http://perdu.com',
      dependencies: {
        ps_eventbus: {
          enableLink: 'http://localhost:80/admin-dev/index.php/improve/modules/manage/action/enable/ps_eventbus?_token=up_TmQFm66p9dwunsmfNzk2UfDD3a8tsxdW5a7KviKw',
          installLink: 'http://localhost:80/admin-dev/index.php/improve/modules/manage/action/install/ps_eventbus?_token=up_TmQFm66p9dwunsmfNzk2UfDD3a8tsxdW5a7KviKw',
          isEnabled: true,
          isInstalled: true
        }
      },
      onboardingLink: ''
    },
    default: '- Module settings part, disabled -'
  }
};

export const NotEnabled: Story = {
  args: {
    context: {
      accountsUiUrl: 'https://accounts.distribution.prestashop.net/en',
      backendUser: {
        email: 'email@bo.com',
        isSuperAdmin: true,
        employeeId: 1
      },
      currentContext: {
        id: 1,
        type: ShopContext.Shop
      },
      psAccountsInstallLink: null,
      psAccountsEnableLink: null,
      psAccountsUpdateLink: null,
      psAccountsIsInstalled: true,
      psAccountsIsEnabled: false,
      psIs17: true,
      psxName: 'ps_accounts',
      shops: [
        {
          id: '1',
          name: 'Default',
          shops: [
            {
              domain: 'myshop.com',
              domainSsl: 'myshop.com',
              id: '1',
              name: 'PrestaShop',
              publicKey: 'publicKey',
              url: 'http://localhost:8082/admin-dev/index.php?controller=AdminModules&setShopContext=s-1&token=7e6ed965a445faaa639275d16418264d',
              employeeId: null,
              isLinkedV4: false,
              user: {
                email: null,
                uuid: null
              },
              uuid: null
            }
          ]
        }
      ],
      user: {
        email: null,
        emailIsValidated: false,
        isSuperAdmin: true
      },
      superAdminEmail: 'admin@example.com',
      ssoResendVerificationEmail: 'http://perdu.com',
      dependencies: {
        ps_eventbus: {
          enableLink: 'http://localhost:80/admin-dev/index.php/improve/modules/manage/action/enable/ps_eventbus?_token=up_TmQFm66p9dwunsmfNzk2UfDD3a8tsxdW5a7KviKw',
          installLink: 'http://localhost:80/admin-dev/index.php/improve/modules/manage/action/install/ps_eventbus?_token=up_TmQFm66p9dwunsmfNzk2UfDD3a8tsxdW5a7KviKw',
          isEnabled: true,
          isInstalled: true
        }
      },
      onboardingLink: ''
    },
    default: '- Module settings part, disabled -'
  }
};

export const NeedsAnUpdate: Story = {
  args: {
    context: {
      accountsUiUrl: 'https://accounts.distribution.prestashop.net/en',
      backendUser: {
        email: 'email@bo.com',
        isSuperAdmin: true,
        employeeId: 1
      },
      currentContext: {
        id: 1,
        type: ShopContext.Shop
      },
      psAccountsInstallLink: null,
      psAccountsEnableLink: null,
      psAccountsUpdateLink: null,
      psAccountsIsInstalled: true,
      psAccountsIsEnabled: true,
      psIs17: true,
      psxName: 'ps_accounts',
      shops: [
        {
          id: '1',
          name: 'Default',
          shops: [
            {
              domain: 'myshop.com',
              domainSsl: 'myshop.com',
              id: '1',
              name: 'PrestaShop',
              publicKey: 'publicKey',
              url: 'http://localhost:8082/admin-dev/index.php?controller=AdminModules&setShopContext=s-1&token=7e6ed965a445faaa639275d16418264d',
              employeeId: null,
              isLinkedV4: false,
              user: {
                email: null,
                uuid: null
              },
              uuid: null
            }
          ]
        }
      ],
      user: {
        email: null,
        emailIsValidated: false,
        isSuperAdmin: true
      },
      superAdminEmail: 'admin@example.com',
      ssoResendVerificationEmail: 'http://perdu.com',
      dependencies: {
        ps_eventbus: {
          enableLink: 'http://localhost:80/admin-dev/index.php/improve/modules/manage/action/enable/ps_eventbus?_token=up_TmQFm66p9dwunsmfNzk2UfDD3a8tsxdW5a7KviKw',
          installLink: 'http://localhost:80/admin-dev/index.php/improve/modules/manage/action/install/ps_eventbus?_token=up_TmQFm66p9dwunsmfNzk2UfDD3a8tsxdW5a7KviKw',
          isEnabled: true,
          isInstalled: true
        }
      },
      onboardingLink: ''
    },
    default: '- Module settings part, disabled -'
  }
};

export const NotSuperAdmin: Story = {
  args: {
    context: {
      accountsUiUrl: 'https://accounts.distribution.prestashop.net/en',
      backendUser: {
        email: 'email@bo.com',
        isSuperAdmin: false,
        employeeId: 1
      },
      currentContext: {
        id: 1,
        type: ShopContext.Shop
      },
      psAccountsInstallLink: null,
      psAccountsEnableLink: null,
      psAccountsUpdateLink: null,
      psAccountsIsInstalled: true,
      psAccountsIsEnabled: true,
      psIs17: true,
      psxName: 'ps_accounts',
      shops: [
        {
          id: '1',
          name: 'Default',
          shops: [
            {
              domain: 'myshop.com',
              domainSsl: 'myshop.com',
              id: '1',
              name: 'PrestaShop',
              publicKey: 'publicKey',
              url: 'http://localhost:8082/admin-dev/index.php?controller=AdminModules&setShopContext=s-1&token=7e6ed965a445faaa639275d16418264d',
              employeeId: null,
              isLinkedV4: false,
              user: {
                email: null,
                uuid: null
              },
              uuid: null
            }
          ]
        }
      ],
      user: {
        email: null,
        emailIsValidated: false,
        isSuperAdmin: false
      },
      superAdminEmail: 'admin@example.com',
      ssoResendVerificationEmail: 'http://perdu.com',
      dependencies: {
        ps_eventbus: {
          enableLink: 'http://localhost:80/admin-dev/index.php/improve/modules/manage/action/enable/ps_eventbus?_token=up_TmQFm66p9dwunsmfNzk2UfDD3a8tsxdW5a7KviKw',
          installLink: 'http://localhost:80/admin-dev/index.php/improve/modules/manage/action/install/ps_eventbus?_token=up_TmQFm66p9dwunsmfNzk2UfDD3a8tsxdW5a7KviKw',
          isEnabled: true,
          isInstalled: true
        }
      },
      onboardingLink: ''
    },
    default: '- Module settings part, disabled -'
  }
};
