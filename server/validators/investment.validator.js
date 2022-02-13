const Joi = require("joi");

const investmentSchema = Joi.object({
  amount: Joi.number().default(0).precision(2).required(),
  projectId: Joi.number().integer().required(),
  paymentMethod: Joi.alternatives(Joi.string(), Joi.boolean()),
  projectOwner: Joi.string().required(),
});

module.exports = { investmentSchema };
