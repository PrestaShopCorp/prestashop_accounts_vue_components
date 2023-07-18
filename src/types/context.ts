export enum ShopContext {
  Shop = 1,
  Group = 2,
  All = 4,
}

export interface BackendUser {
  email: string | null
  employeeId: number
  isSuperAdmin: boolean
}

export interface Context {
  accountsUiUrl: string
  backendUser: BackendUser
  currentContext: CurrentContext
  dependencies?: Dependencies
  onboardingLink: string
  psAccountsEnableLink: string | null
  psAccountsInstallLink: string | null
  psAccountsIsEnabled: boolean
  psAccountsIsInstalled: boolean
  psAccountsIsUptodate: boolean
  psAccountsUpdateLink: string | null
  psIs17: boolean
  psxName: string
  shops: ShopGroup[]
  ssoResendVerificationEmail: string
  superAdminEmail: string
  user: Partial<User>
  errors?: string[]
}

export type Dependencies = Record<
string,
{
  isInstalled?: boolean
  isEnabled?: boolean
  installLink?: string
  enableLink?: string
}
>;

export interface CurrentContext {
  id: number | null
  type: ShopContext
}

export interface Shop {
  domain: string | null
  domainSsl: string | null
  employeeId?: string | null
  frontUrl?: string | null
  id: string
  isLinkedV4?: boolean // ?
  moduleName?: string
  multishop?: boolean
  name: string
  physicalUri?: string | boolean | null
  psVersion?: string
  publicKey: string
  url: string
  user?: Partial<User>
  uuid?: string | null
  virtualUri?: string | boolean | null
}

export interface ShopGroup {
  id: string
  moduleName?: string
  multishop?: boolean
  name: string
  psVersion?: string
  shops: Shop[]
}

export interface User {
  email?: string | null
  emailIsValidated?: boolean
  isSuperAdmin: boolean
  uuid?: string | null
}
