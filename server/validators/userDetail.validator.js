const Joi = require("joi");

const createUserDetailSchema = Joi.object({
  headline: Joi.string().required(),

  city: Joi.string()
    .min(5)
    .pattern(/^([^0-9]*)$/)
    .lowercase()
    .required(),

  province: Joi.string()
    .valid(
      "NL",
      "PE",
      "NS",
      "NB",
      "QC",
      "ON",
      "MB",
      "SK",
      "AB",
      "BC",
      "YT",
      "NT",
      "NU"
    )
    .required(),

  phoneNumber: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required(),
});

module.exports = { createUserDetailSchema };
