const Joi = require("joi");

const createProjectSchema = Joi.object({
  name: Joi.string().min(3),
  location: Joi.string().min(3),
  targetFund: Joi.number()
    .default(0)
    .precision(2)
    .greater(Joi.ref("minInvestment"))
    .error(() => {
      return Error("Target fund must be greater than minimum investment.");
    }),
  story: Joi.string().min(3),
  website: Joi.string()
    .uri()
    .default("http://")
    .pattern(
      new RegExp(
        /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/i
      )
    ),
  industry: Joi.string().lowercase(),
  deadline: Joi.date().greater(Date.now()),
  minInvestment: Joi.number().default(0).precision(2),
});

module.exports = { createProjectSchema };
