const Joi = require("joi");

const investmentSchema = Joi.object({
  amount: Joi.number().default(0).precision(2),
  projectId: Joi.number().integer(),
});

module.exports = { investmentSchema };
