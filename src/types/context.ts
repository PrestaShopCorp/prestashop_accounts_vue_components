export enum ShopContext {
  Shop = 1,
  Group = 2,
  All = 4,
}

export interface BackendUser {
  email?: string | null;
  employeeId?: number;
  isSuperAdmin: boolean;
}

export type Context = {
  accountsUiUrl?: string | null;
  adminAjaxLink?: string | null;
  backendUser?: Partial<BackendUser>;
  currentContext?: Partial<CurrentContext>;
  currentShop?: Shop | null;
  dependencies?: Record<
    string,
    {
      isInstalled?: boolean;
      isEnabled?: boolean;
      installLink?: string;
      enableLink?: string;
    }
  >;
  isOnboardedV4?: boolean;
  isShopContext?: boolean;
  manageAccountLink?: string | null;
  onboardingLink?: string | null;
  psAccountsEnableLink?: string | null;
  psAccountsInstallLink?: string | null;
  psAccountsIsEnabled?: boolean;
  psAccountsIsInstalled?: boolean;
  psAccountsIsUptodate?: boolean;
  psAccountsUpdateLink?: string | null;
  psAccountsVersion?: string;
  psIs17: boolean;
  psxName?: string;
  segmentApiKey?: string | null;
  shops: ShopGroup[];
  ssoResendVerificationEmail?: string | null;
  superAdminEmail?: string | null;
  user?: Partial<User> | null;
  errors?: string[];
};

export interface CurrentContext {
  id?: number | null;
  type: ShopContext;
}

export interface Shop {
  domain: string | null;
  domainSsl: string | null;
  employeeId?: number | null; // string ?
  frontUrl?: string | null;
  id: string;
  isLinkedV4?: boolean; // ?
  moduleName?: string;
  multishop?: boolean;
  name: string;
  physicalUri?: string | boolean | null;
  psVersion?: string;
  publicKey: string;
  url: string;
  user?: Partial<User>;
  uuid?: string | null;
  virtualUri?: string | boolean | null;
}

export interface ShopGroup {
  id: string;
  moduleName?: string;
  multishop?: boolean;
  name: string;
  psVersion?: string;
  shops: Shop[];
}

export interface User {
  email?: string | null;
  emailIsValidated?: boolean;
  isSuperAdmin: boolean;
  uuid?: string | null;
}
