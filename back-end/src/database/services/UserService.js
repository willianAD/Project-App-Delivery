const { Op } = require('sequelize');
const { User } = require('../models');

const findOneLogin = async (email, name = '') => {
  const result = await User.findOne({
    where: {
      [Op.or]: [
        { email },
        { name },
      ],
    },
  });
  return result;
};

const findOneEmail = async (email) => {
  const result = await User.findOne({ where: { email } });
  return result;
};

const findOneRole = async (role) => {
  const result = await User.findOne({ where: { role } });
  return result;
};

const getAll = () => User.findAll();

const create = (user) => User.create(user);

const getById = (id) => User.findByPk(id);

const deleteId = (id) => User.destroy({ where: { id } });

module.exports = {
  getAll,
  create,
  getById,
  findOneRole,
  findOneLogin,
  findOneEmail,
  deleteId,
};