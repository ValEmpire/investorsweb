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
      "Quebec",
      "Ontario",
      "Manitoba",
      "Saskatchewan",
      "Alberta",
      "British Columbia",
      "Yukon",
      "Northwest Territories",
      "Newfoundland and Labrador",
      "Prince Edward Island",
      "Nova Scotia",
      "New Brunswick",
      "Nunavut"
    )
    .required(),

  phoneNumber: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required(),
});

module.exports = { createUserDetailSchema };
