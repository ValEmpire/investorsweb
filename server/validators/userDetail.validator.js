const Joi = require("joi");

/**
 * This function will create a constrains
 * @params Joi.object method has an object, the property name as a body of recieved json and the value is the constraints
 * please read Joi documentation at https://joi.dev/api/?v=17.6.0
 */
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
