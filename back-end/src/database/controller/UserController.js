const md5 = require('md5');
const { userService } = require('../services');
const { generateToken } = require('../auth/authToken');

const login = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await userService.findOneLogin(email);

  const decryptPassword = md5(password) === user.password;

  if (!decryptPassword) return res.status(404).json({ message: 'Not found' });

  const token = await generateToken({ name, email });
  return res.status(200).json({ token });
};

const getAll = async (_req, res) => {
  const allUsers = await userService.getAll();

  return res.status(200).json(allUsers);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const user = await userService.getById(id);

  return res.status(200).json(user);
};

const getUser = async (req, res) => {
  const { email } = req.body;
  const user = await userService.findOneEmail(email);

  return res.status(200).json(user);
};

const create = async (req, res) => {
  const { name, email, password, role } = req.body;

  const passwordHash = md5(password);

  if (!role) {
    await userService.create({ name, email, password: passwordHash, role: 'customer' });
    const token = await generateToken({ name, email });
    return res.status(201).json({ token });
  } 

  await userService.create({ name, email, password: passwordHash, role });

  const token = await generateToken({ name, email });

  return res.status(201).json({ token });
<<<<<<< HEAD
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  const allUsers = await userService.deleteId(id);

  return res.status(200).json(allUsers);
=======
>>>>>>> bf77a0a (fix: details to make login possible)
};

module.exports = {
  getAll,
  login,
  getUser,
  create,
  deleteUser,
  getById,
};
