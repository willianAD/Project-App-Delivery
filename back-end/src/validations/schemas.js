const Joi = require('joi');

const loginSchema = Joi.object({
    // name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    // role: Joi.string().required(),
  });

module.exports = loginSchema;
