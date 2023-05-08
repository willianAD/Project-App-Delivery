const { validateLoginSchema } = require('../../validations/validations');
const { findOneLogin } = require('../services/UserService');

const validateRegister = async (req, res, next) => {
  const { name, email, password } = req.body;
  const validateResponse = validateLoginSchema({ name, email, password });

  if (validateResponse.error) return res.status(400)
      .json({ message: 'Some required fields are missing' });

  const user = await findOneLogin(email, name);

  console.log(user);

  if (user) return res.status(400).json({ message: 'Invalid fields' });

  req.data = user;
  return next();
};

module.exports = {
  validateRegister,
};
