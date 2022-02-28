const Joi = require("joi");

/**
 * This function will create a constrains
 * @params Joi.object method has an object, the property name as a body of recieved json and the value is the constraints
 * please read Joi documentation at https://joi.dev/api/?v=17.6.0
 */
const imageUploadSchema = Joi.object({
  fileName: Joi.string().required(),
  projectId: Joi.number().integer(),
});

module.exports = { imageUploadSchema };
