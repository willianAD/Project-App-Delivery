const { User } = require('../models');

const getAll = () => User.findAll();

const create = (user) => User.create(user);

const getById = (id) => User.findByPk(id);

module.exports = {
  getAll,
  create,
  getById,
};
