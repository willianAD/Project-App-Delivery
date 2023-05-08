const { userService } = require('../services');
const bcrypt = require('bcrypt');
const { generateToken } = require('../auth/authToken');

const login = async (req, res) => {
    const { name, email, password } = req.body;

    const user = await userService.findOneLogin(email);
    
    const decryptPassword = bcrypt.compareSync(password, user.password);

    if (!decryptPassword) return res.status(400).json({ message: 'Invalid password.' });
 
    const token = generateToken({ name, email });
    return res.status(200).json({ token });
};

const getAll = async (_req, res) => {
  const allUsers = await userService.getAll();

  return res.status(200).json(allUsers);
};

const create = async (req, res) => {
  const { name, email, password } = req.body;

  const salt = bcrypt.genSaltSync(5);

  const passwordHash = bcrypt.hashSync(password, salt);

  await userService.create({ name, email, password: passwordHash, role: 'customer' });

  const token = generateToken({ name, email });

  return res.status(200).json({ token });
};

module.exports = {
  getAll,
  login,
  create,
};
