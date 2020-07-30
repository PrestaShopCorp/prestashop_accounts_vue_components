import Joi from '@hapi/joi';
import {billingSchema} from './BillingValidator';

export const shopSchema = Joi.object().keys({
  id: Joi.number().integer().positive().required(),
  name: Joi.string().required().min(1).max(128),
  url: Joi.string().uri().required(),
  domain: Joi.string().pattern(/([a-z0-9]+(-[a-z0-9]+)*)+/i, 'domain').required(),
  domainSsl: Joi.string().pattern(/([a-z0-9]+(-[a-z0-9]+)*)+/i, 'domainSsl').required(),
}).unknown(true);

export const shopGroupSchema = Joi.object().keys({
  id: Joi.number().integer().positive().required(),
  name: Joi.string().required().min(1).max(128),
  shops: Joi.array().items(shopSchema).min(1).max(128)
    .required(),
}).unknown(true);

export const userSchema = Joi.object().keys({
  email: Joi.string().email({tlds: false}).allow(null).default(null),
  emailIsValidated: Joi.boolean().default(false),
  isSuperAdmin: Joi.boolean().required(),
}).unknown(true);

export const contextSchema = Joi.object().keys({
  psIs17: Joi.boolean().required(),
  psAccountsInstallLink: Joi.string().uri().allow(null).default(null),
  psAccountsEnableLink: Joi.string().uri().allow(null).default(null),
  currentShop: shopSchema.optional().allow(null).default(null),
  shops: Joi.array().items(shopGroupSchema).required().min(0)
    .max(128),
  user: userSchema.optional().allow({}).default({email: null, emailIsValidated: false}),
  onboardingLink: Joi.string().uri().optional().allow(null)
    .allow('')
    .default(null),
  superAdminEmail: Joi.string().email({tlds: false}).allow(null).default(null),
  ssoResendVerificationEmail: Joi.string().uri().optional().allow(null)
    .allow('')
    .default(null),
  billing: billingSchema.optional().allow(null).default({currentPlan: null, plans: []}),
}).unknown(true);
