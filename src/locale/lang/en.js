export default {
  psaccounts: {
    accountManager: {
      errorInstallEnable: 'Something went wrong. Please try again.',
    },
    alertAccountNotInstalled: {
      title: 'PrestaShop Account module needed',
      message: 'To enable this module you need to install the PrestaShop Account module on your shop',
      installButton: 'Install',
      loading: 'Installing PsAccounts ...',
    },
    alertAccountNotEnabled: {
      title: 'PrestaShop Account module needed',
      message: 'To enable this module you need to activate the PrestaShop Account module on your shop',
      enableButton: 'Activate',
      loading: 'Enabling PsAccounts ...',
    },
    multiShopSelector: {
      title: 'Multi-store mode activated',
      subtitle: 'You must configure your stores one by one for this service, but your will be able to use the same account',
      selectStore: 'Please select the first store to configure from the list below',
      tips: 'After you are done with the first shop, you can configure the others, by selecting them one by one in the shop selector, in the horizontal menu',
      configure: 'Configure',
      group: 'Group',
    },
    account: {
      title: 'Your PrestaShop account',
      authorize: "Authorize your account to manage your shop's services",
      authorized: "You authorize this account to manage shop's services",
      connectButton: 'Connect',
      disconnectButton: 'Use another account',
      emailValidationWarningLabel: 'Email validation needed',
      emailConfirmationAlert: 'A confirmation email has been sent. Check your inbox and click on the link to activate your account',
      noEmailReceived: 'No confirmation email',
      sendEmail: 'Send it again',
      needToBeAdmin: 'In order to proceed, you have to be administrator of the shop',
      pleaseContact: 'Please contact',
    },
  },
};
