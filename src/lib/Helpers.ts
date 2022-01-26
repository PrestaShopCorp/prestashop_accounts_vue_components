const isOnboardingCompleted = () => {
  const user = window.contextPsAccounts ? window.contextPsAccounts.user : {};

  return !!((user.email && typeof user.email === 'string' && user.email.length > 0)
    && (user.isSuperAdmin === true));
};

const helpers = {isOnboardingCompleted};

export default helpers;

export {
  isOnboardingCompleted,
};
