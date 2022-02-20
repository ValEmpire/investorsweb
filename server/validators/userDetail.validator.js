const Joi = require("joi");

const createUserDetailSchema = Joi.object({
  headline: Joi.string().required(),

  city: Joi.string()
    .min(5)
    .pattern(/^([^0-9]*)$/)
    .lowercase()
    .required()
    .error(() => {
      return Error("Invalid city");
    }),

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
    .required()
    .error(() => {
      return Error("Invalid phone number");
    }),
});

module.exports = { createUserDetailSchema };
