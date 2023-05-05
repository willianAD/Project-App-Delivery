const { userService } = require('../services');
const { generateToken } = require('../auth/authToken');

const login = async (req, res) => {
  const { email } = req.data;

    const token = generateToken({ email, role: 'user' });
    return res.status(200).json({ token });

  // try {
  //   const { email } = req.data;

  //   const token = generateToken({ email, role: 'user' });

  //   return res.status(200).json({ token });
  // } catch (error) {
  //   console.error(error);
  //   return res.status(500).json({ message: 'Internal server error' });
  // }
};

const getAll = async (_req, res) => {
  const allUsers = await userService.getAll();

  return res.status(200).json(allUsers);
};

module.exports = {
  getAll,
  login,
};
