const Joi = require('joi');

const loginSchema = Joi.object({
    name: Joi.string().max(12).required(),
    email: Joi.string().email().required(),
    password: Joi.string().max(6).required(),
  });

module.exports = loginSchema;
