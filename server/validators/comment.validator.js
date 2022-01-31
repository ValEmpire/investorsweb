const Joi = require("joi");

const createCommentSchema = Joi.object({
  body : Joi.string()
  .required(),
  commentId :Joi.number().integer()
});
module.exports = { createCommentSchema };
