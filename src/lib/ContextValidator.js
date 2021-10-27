import Joi from '@hapi/joi';

export const backendUserSchema = Joi.object().keys({
  email: Joi.string().email({tlds: false}).allow(null).default(null),
  employeeId: Joi.number(),
  isSuperAdmin: Joi.boolean().required(),
}).unknown(true);

export const currentContextSchema = Joi.object().keys({
  type: Joi.number().required(),
  id: Joi.number().allow(null).default(null),
}).unknown(true);

export const shopUserSchema = Joi.object().keys({
  email: Joi.string().email({tlds: false}).allow(null).default(null),
  uuid: Joi.string().allow(null),
}).unknown(true);

export const shopSchema = Joi.object().keys({
  domain: Joi.string().pattern(/([a-z0-9]+(-[a-z0-9]+)*)+/i, 'domain').required(),
  domainSsl: Joi.string().pattern(/([a-z0-9]+(-[a-z0-9]+)*)+/i, 'domainSsl').required(),
  employeeId: Joi.number().allow(null),
  id: Joi.string().required(),
  moduleName: Joi.string(),
  multishop: Joi.boolean(),
  name: Joi.string().required().min(1).max(128),
  physicalUri: Joi.string(),
  psVersion: Joi.string(),
  publicKey: Joi.string(),
  url: Joi.string().uri().required(),
  user: shopUserSchema.optional().allow({}).default({}),
  uuid: Joi.string().allow(null),
}).unknown(true);

export const shopGroupSchema = Joi.object().keys({
  id: Joi.string().required(),
  moduleName: Joi.string(),
  multishop: Joi.boolean(),
  name: Joi.string().required().min(1).max(128),
  psVersion: Joi.string(),
  shops: Joi.array().items(shopSchema).min(1).max(128)
    .required(),
}).unknown(true);

export const userSchema = Joi.object().keys({
  email: Joi.string().email({tlds: false}).allow(null).default(null),
  emailIsValidated: Joi.boolean(),
  isSuperAdmin: Joi.boolean().required(),
  uuid: Joi.string().allow(null),
}).unknown(true);

export const contextSchema = Joi.object().keys({
  accountsUiUrl: Joi.string().allow(null).default(null),
  adminAjaxLink: Joi.string().allow(null).default(null),
  backendUser: backendUserSchema.optional().allow({}).default({}),
  currentContext: currentContextSchema.optional().allow({}).default({}),
  currentShop: shopSchema.optional().allow(null).default(null),
  // dependencies
  isOnboardedV4: Joi.boolean(),
  isShopContext: Joi.boolean(),
  manageAccountLink: Joi.string().uri().optional().allow(null)
    .allow('')
    .default(null),
  onboardingLink: Joi.string().uri().optional().allow(null)
    .allow('')
    .default(null),
  psAccountsEnableLink: Joi.string().uri().allow(null).default(null),
  psAccountsInstallLink: Joi.string().uri().allow(null).default(null),
  psAccountsIsEnabled: Joi.boolean().default(true),
  psAccountsIsInstalled: Joi.boolean().default(true),
  psAccountsUpdateLink: Joi.string().uri().allow(null).default(null),
  psAccountsIsUptodate: Joi.boolean().default(true),
  psIs17: Joi.boolean().required(),
  psxName: Joi.string(),
  segmentApiKey: Joi.string().allow(null).default(null),
  shops: Joi.array().items(shopGroupSchema).required().min(0)
    .max(128),
  ssoResendVerificationEmail: Joi.string().uri().optional().allow(null)
    .allow('')
    .default(null),
  superAdminEmail: Joi.string().email({tlds: false}).allow(null).default(null),
  user: userSchema.optional().allow({}).default({email: null}),

}).unknown(true);
