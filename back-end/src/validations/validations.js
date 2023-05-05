const loginSchema = require('./schemas');
  
const validateLoginSchema = (login) => loginSchema.validate(login);

  module.exports = {
    validateLoginSchema,
  };
