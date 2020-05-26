// const context = global.store_accounts;
const context = {
  psAccountsIsInstalled: true,
  psAccountIsEnabled: true,
  onboardingLink: 'https://google.com',
  user: {
    email: 'support@prestashop.com',
    emailIsValidated: false,
  },
  currentShop: 'tot',
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
    {
      id: 3,
      name: 'shop_group2',
      shops: [
        {
          id: 3,
          name: 'shop3',
          url: 'http://localhost:8082/admin-dev/index.php?controller=AdminModules&setShopContext=s-3&token=7e6ed965a445faaa639275d16418264d',
        },
      ],
    },
    {
      id: 2,
      name: 'test',
      shops: [
        {
          id: 4,
          name: 'shop4',
          url: 'http://localhost:8082/admin-dev/index.php?controller=AdminModules&setShopContext=s-4&token=7e6ed965a445faaa639275d16418264d',
        },
      ],
    },
  ],
};

export default context;
