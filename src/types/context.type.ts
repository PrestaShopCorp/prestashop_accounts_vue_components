import {Shop} from '@/models/shop';
import {BackendUser, User} from '@/models/user';

export enum ShopContext {
  Shop = 1,
  Group = 2,
  All = 4,
}

export interface CurrentContext {
  id?: number | null;
  type: ShopContext;
}

export interface ShopGroup {
  id: string;
  moduleName?: string;
  multishop?: boolean;
  name: string;
  psVersion?: string;
  shops: Shop[];
}

export interface Context {
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
}
