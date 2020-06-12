import Joi from '@hapi/joi';

export const shopSchema = Joi.object().keys({
    id: Joi.number().integer().positive().required(),
    name: Joi.string().required().allow(''), // TODO required ? can be '' ?
    url: Joi.string().uri().required(),
});

export const shopGroupSchema = Joi.object().keys({
    id: Joi.number().integer().positive().required(),
    name: Joi.string().required().allow(''), // TODO required ? can be '' ?
    shops: Joi.array().items(shopSchema).min(1).max(128).required(),
});

export const userSchema = Joi.object().keys({
    email: Joi.string().email({ tlds: false }).allow(''), // TODO : valeur si pas la ?
    emailIsValidated: Joi.boolean().required(), // TODO : tjrs là ?
});

export const contextSchema = Joi.object().keys({
    psAccountsIsInstalled: Joi.boolean().required(),
    psAccountIsEnabled: Joi.boolean().required(),
    currentShop: shopSchema.optional().allow(null).default(null),
    shops: Joi.array().items(shopGroupSchema).required().min(1).max(128),
    user: userSchema.required(), // TODO : toujours là ?
    onboardingLink: Joi.string().uri().optional().allow(null).allow('').default(null),
});
