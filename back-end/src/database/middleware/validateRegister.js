const { validateLoginSchema } = require('../../validations/validations');
const { findOneLogin } = require('../services/UserService');

const validateRegister = async (req, res, next) => {
  const { name, email, password } = req.body;
  const validateResponse = validateLoginSchema({ name, email, password });

  if (validateResponse.error) return res.status(404)
      .json({ message: 'Some required fields are missing' });

  const user = await findOneLogin(email, name);

  if (user) return res.status(409).json({ message: 'Conflict' });

  req.data = user;
  return next();
};

module.exports = {
  validateRegister,
};
