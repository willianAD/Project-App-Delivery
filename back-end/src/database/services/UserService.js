const { User } = require('../models');

const { Op } = require("sequelize");

const findOneLogin = async (email, name = '') => {
    const result = await User.findOne({
      where: {
        [Op.or]: [
          { email },
          { name }
        ]
      }
    });
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
