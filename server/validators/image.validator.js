const Joi = require("joi");

const imageUploadSchema = Joi.object({
  fileName: Joi.string().required(),
  projectId: Joi.number().integer(),
});
module.exports = { imageUploadSchema };
