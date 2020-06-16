import Joi from '@hapi/joi';

export const shopSchema = Joi.object().keys({
  id: Joi.number().integer().positive().required(),
  name: Joi.string().required().min(1).max(128),
  url: Joi.string().uri().required(),
});

export const shopGroupSchema = Joi.object().keys({
  id: Joi.number().integer().positive().required(),
  name: Joi.string().required().min(1).max(128),
  shops: Joi.array().items(shopSchema).min(1).max(128)
    .required(),
});

export const userSchema = Joi.object().keys({
  email: Joi.string().email({tlds: false}).allow(null).default(null),
  emailIsValidated: Joi.boolean().default(false),
});

export const contextSchema = Joi.object().keys({
  psAccountsIsInstalled: Joi.boolean().required(),
  psAccountIsEnabled: Joi.boolean().required(),
  currentShop: shopSchema.optional().allow(null).default(null),
  shops: Joi.array().items(shopGroupSchema).required().min(1)
    .max(128),
  user: userSchema.optional().allow({}).default({email: null, emailIsValidated: false}),
  onboardingLink: Joi.string().uri().optional().allow(null)
    .allow('')
    .default(null),
});
