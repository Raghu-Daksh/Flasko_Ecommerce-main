const Joi = require("joi");

const registerSchema = Joi.object({
  firstname:       Joi.string().trim().min(2).max(50).required(),
  lastname:        Joi.string().trim().min(2).max(50).required(),
  email:           Joi.string().email().lowercase().required(),
  age:             Joi.number().integer().min(1).max(120).required(),
  address:         Joi.string().trim().max(255).required(),
  dob:             Joi.date().iso().required(),
  gender:          Joi.string().valid("male", "female", "other").required(),
  phoneNo:         Joi.string().pattern(/^[0-9]{10,15}$/).required(),
  password:        Joi.string().min(8).required(),
  confirmPassword: Joi.any()
    .equal(Joi.ref("password"))
    .required()
    .messages({ "any.only": "Passwords do not match" }),
});

const loginSchema = Joi.object({
  email:    Joi.string().email().lowercase().required(),
  password: Joi.string().required(),
});

module.exports = { registerSchema, loginSchema };