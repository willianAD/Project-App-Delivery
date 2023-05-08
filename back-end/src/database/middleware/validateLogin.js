const { findOneLogin } = require('../services/UserService');

const validateLogin = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!email || !password) return res.status(400)
      .json({ message: 'Some required fields are missing' });

  const user = await findOneLogin(email, name);

  if (!user) return res.status(400).json({ message: 'Invalid fields' });

  req.data = user;
  return next();
};

module.exports = {
  validateLogin,
};
