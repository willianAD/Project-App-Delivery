const { User } = require('../models');

const findOneLogin = async ({ email }) => {
    const result = await User.findOne({
       where: { email } });
    return result;
  };

const findOneRole = async (role) => {
    const result = await User.findOne({ where: { role } });
    return result;
  };

const getAll = () => User.findAll();

const create = (user) => User.create(user);

const getById = (id) => User.findByPk(id);

module.exports = {
  getAll,
  create,
  getById,
  findOneRole,
  findOneLogin,
};
