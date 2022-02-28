const Joi = require("joi");

/**
 * This function will create a constrains
 * @params Joi.object method has an object, the property name as a body of recieved json and the value is the constraints
 * please read Joi documentation at https://joi.dev/api/?v=17.6.0
 */
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
