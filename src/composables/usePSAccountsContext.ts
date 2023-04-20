import {computed, reactive, toRefs} from 'vue';
import {contextSchema} from '@/lib/ContextValidator';
import {Context, Shop, ShopContext} from '@/types/context';

const defaultContext = (): Partial<Context> => ({
  psAccountsInstallLink: null,
  psAccountsEnableLink: null,
  psAccountsUpdateLink: null,
  psAccountsIsInstalled: false,
  psAccountsIsEnabled: false,
  psAccountsIsUptodate: false,
  onboardingLink: null,
  user: {
    email: null,
    emailIsValidated: false,
    isSuperAdmin: false,
  },
  currentShop: null,
  shops: [],
  superAdminEmail: null,
  ssoResendVerificationEmail: null,
  manageAccountLink: null,
  errors: undefined,
});

interface State {
  context: Context | Partial<Context>,
}

const state = reactive<State>({
  context: {},
});

export default function usePSAccountsContext() {
  function setContext<T extends Context>(_context: T): void {
    const mergedContext = {
      ...defaultContext(),
      ...(window.contextPsAccounts || {}),
      ..._context,
    };

    // validates but also fix when possible.
    const {
      value,
      error,
    } = contextSchema.validate(
      mergedContext,
    );

    const validContext: Context = {
      ...value,
      errors: error
        ? error.details.map(
          (e) => e.message,
        )
        : [],
    };

    state.context = {...validContext};
  }

  const eventbusIsInstalled = computed(
    () => state.context.dependencies?.ps_eventbus?.isInstalled || false,
  );
  const eventbusIsEnabled = computed(
    () => state.context.dependencies?.ps_eventbus?.isEnabled || false,
  );
  const eventbusInstallLink = computed(
    () => state.context.dependencies?.ps_eventbus?.installLink || '',
  );
  const eventbusEnableLink = computed(
    () => state.context.dependencies?.ps_eventbus?.enableLink || '',
  );
  const eventbusShouldBeInstalled = computed(
    () => !eventbusIsInstalled.value && state.context.psIs17,
  );
  const eventbusShouldBeEnabled = computed(
      () => state.context.psIs17 && !eventbusIsEnabled.value,
  );

  const psAccountModuleState = computed(() => {
    if (!state.context.psAccountsIsUptodate) {
      return 'to_update';
    }

    if (!state.context.psAccountsIsEnabled) {
      return 'to_enable';
    }

    if (!state.context.psAccountsIsInstalled) {
      return 'to_install';
    }

    return 'installed';
  });

  const psEventBusModuleState = computed(() => {
    if (!eventbusIsEnabled.value) {
      return 'to_enable';
    }

    if (!eventbusIsInstalled.value) {
      return 'to_install';
    }

    return 'installed';
  });

  const shops = computed(() => state.context.shops?.reduce(
    (acc, shopGroup) => [...acc, ...shopGroup.shops],
      [] as Shop[],
  ),
  );

  const shopsInContext = computed(() => {
    if (!state.context.currentContext) {
      return [];
    }

    if (state.context.currentContext.type === ShopContext.All) {
      return shops.value;
    }

    if (state.context.currentContext.type === ShopContext.Group) {
      return [
        ...(state.context.shops?.find(
          (shopGroup) => parseInt(shopGroup.id, 10) === state.context.currentContext?.id,
        )?.shops || []),
      ];
    }

    // Shop
    const shop = state.context.shops
      ?.reduce((acc, shopGroup) => [...acc, ...shopGroup.shops], [] as Shop[])
      .find((shop2) => parseInt(shop2.id, 10) === state.context.currentContext?.id);

    return shop ? [shop] : [];
  });

  return {
    ...toRefs(state),
    eventbusIsEnabled,
    eventbusShouldBeEnabled,
    eventbusShouldBeInstalled,
    eventbusInstallLink,
    eventbusEnableLink,
    psAccountModuleState,
    psEventBusModuleState,
    setContext,
    shopsInContext,
  };
}
