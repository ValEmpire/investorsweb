const Joi = require("joi");

const createProjectSchema = Joi.object({
  name: Joi.string().min(3).required(),
  location: Joi.string().min(3).required(),
  targetFund: Joi.number()
    .precision(2)
    .required()
    .greater(Joi.ref("minInvestment")),
  story: Joi.string().min(3).required(),
  website: Joi.string()
    .uri()
    .pattern(
      new RegExp(
        /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/i
      )
    )
    .required(),
  industry: Joi.string().lowercase().required(),
  deadline: Joi.date().required().greater(Date.now()),
  minInvestment: Joi.number().default(0).precision(2),
});

module.exports = { createProjectSchema };
