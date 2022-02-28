const Joi = require("joi");

/**
 * This function will create a constrains
 * @params Joi.object method has an object, the property name as a body of recieved json and the value is the constraints
 * please read Joi documentation at https://joi.dev/api/?v=17.6.0
 */
const createCommentSchema = Joi.object({
  body: Joi.string().required(),
  commentId: Joi.number().integer(),
});

module.exports = { createCommentSchema };
