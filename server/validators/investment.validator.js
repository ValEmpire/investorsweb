const Joi = require("joi");

/**
 * This function will create a constrains
 * @params Joi.object method has an object, the property name as a body of recieved json and the value is the constraints
 * please read Joi documentation at https://joi.dev/api/?v=17.6.0
 */
const investmentSchema = Joi.object({
  amount: Joi.number().default(0).precision(2).required(),
  projectId: Joi.number().integer().required(),
  paymentMethod: Joi.alternatives(Joi.string(), Joi.boolean()),
  projectOwner: Joi.string().required(),
});

module.exports = { investmentSchema };
