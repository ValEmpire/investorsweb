const Joi = require("joi");

const createProjectSchema = Joi.object({
  name: Joi.string().min(10).required().lowercase(),
  location: Joi.string().min(5).required().lowercase(),
  targetFund: Joi.number().precision(2).required(),
  story: Joi.string().min(10).required(),
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
  minInvestment: Joi.number().precision(2).required(),
});

module.exports = { createProjectSchema };
