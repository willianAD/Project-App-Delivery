const { verifyToken } = require('../auth/authToken');
const userServices = require('../services/UserService');

const validateToken = async (req, res, next) => {
  const token = req.header('Authorization');

  const { payload } = await verifyToken(token);
  const { role } = await userServices.findOneEmail(payload.email);

  if (role !== 'administrator') {
    return res.status(409).json({ message: 'Invalid Role Token!' });
  }

  if (!verifyToken(token)) {
    return res.status(409).json({ message: 'Invalid Token!' });
  }

  return next();
};

module.exports = validateToken;
