const Joi = require("joi");

const userRegisterSchema = Joi.object({
  firstName: Joi.string().min(3).required().lowercase(),

  lastName: Joi.string().min(3).required().lowercase(),

  password: Joi.string().min(7).required(),

  email: Joi.string()
    .lowercase()
    .pattern(
      new RegExp(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    )
    .required(),
});

const updateUserSchema = Joi.object({
  email: Joi.string().required(),

  firstName: Joi.string().min(3).lowercase().required(),

  lastName: Joi.string().min(3).lowercase().required(),

  currentPassword: Joi.string(),

  password: Joi.string().min(7),
});

const userLoginSchema = Joi.object({
  password: Joi.string().required(),

  email: Joi.string().lowercase().required(),
});

module.exports = { userRegisterSchema, userLoginSchema, updateUserSchema };
