const { validateLoginSchema } = require('../../validations/validations');
const { findOneLogin } = require('../services/UserService');

const validateLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const validateResponse = validateLoginSchema({ email, password });

  console.log(validateResponse.error);
  if (validateResponse.error) {
    return res
      .status(400)
      .json({ message: 'Some required fields are missing' });
  }
  const user = await findOneLogin({ email });
  if (!user) {
    return res.status(400).json({ message: 'Invalid fields' });
  }
  req.data = user;
  return next();
};

module.exports = {
  validateLogin,
};
