import Joi from '@hapi/joi';

export const priceSchema = Joi.object().keys({ // TODO !0: format
  taxIncluded: Joi.number().integer().positive().min(1)
    .max(9999999)
    .required(),
  currency: Joi.string().min(1).max(6).required(),
}).unknown(true);

export const planSchema = Joi.object().keys({
  id: Joi.any().required(), // TODO !0: format
  level: Joi.number().integer().positive().required(),
  name: Joi.string().required(), // TODO !0: format
  price: priceSchema.optional().allow(null).default(null), // null: no price means free
  periodicity: Joi.string().valid('monthly', 'yearly').required(),
  recommended: Joi.boolean().optional().default(false),
}).unknown(true);

export const currentPlanSchema = Joi.object().keys({
  id: Joi.any().required(), // TODO !0: format
  level: Joi.number().integer().positive().required(),
  name: Joi.string().max(256).min(1).required(),
  price: priceSchema.optional().allow(null).default(null), // null: no price means free
  periodicity: Joi.string().valid('monthly', 'yearly').required(),
  nextPeriodStartDate: Joi.date().timestamp('unix'), // seconds
}).unknown(true);

export const paymentMethodSchema = Joi.object().keys({
  cardType: Joi.string().valid('unknown', 'mastercard', 'amex', 'visa').optional().default('unknown'),
  lastFourNumbers: Joi.string().min(4).max(4).required(),
  expiry: Joi.string().min(5).max(9).required(),
}).unknown(true);

export const billingSchema = Joi.object().keys({
  currentPlan: currentPlanSchema.required().allow(null).default(null),
  plans: Joi.array().items(planSchema).required(),
  address: Joi.string().max(512).optional().allow('')
    .allow(null)
    .default(null),
  paymentMethod: paymentMethodSchema.optional().allow(null).default(null),
}).unknown(true);

const testPlan = {
  id: '1234567',
  level: 42,
  name: 'Mon super plan',
  price: null,
  periodicity: 'monthly',
  recommended: false,
};
const testPlan2 = {
  id: '1234568',
  level: 43,
  name: 'Mon mega super plan',
  price: {
    taxIncluded: 1499,
    currency: '€',
  },
  periodicity: 'monthly',
  recommended: true,
};
export const example = {
  currentPlan: {...testPlan, nextPeriodStartDate: '1593620101'},
  plans: [
    testPlan,
    testPlan2,
  ],
  address: '12 Rue d\'Amsterdam, 75019 Paris',
  paymentMethod: {
    cardType: 'mastercard',
    lastFourNumbers: '4567',
    expiry: '12/2026',
  },
};
