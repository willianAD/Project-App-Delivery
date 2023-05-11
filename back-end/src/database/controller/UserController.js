const md5 = require('md5');
const { userService } = require('../services');
const { generateToken } = require('../auth/authToken');

const login = async (req, res) => {
    const { name, email, password } = req.body;

    const user = await userService.findOneLogin(email);
    
    const decryptPassword = md5.compareSync(password, user.password);

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

  const salt = md5.genSaltSync(5);

  const passwordHash = md5.hashSync(password, salt);

  await userService.create({ name, email, password: passwordHash, role: 'customer' });

  const token = generateToken({ name, email });

  return res.status(200).json({ token });
};

module.exports = {
  getAll,
  login,
  create,
};
