const { Sale } = require('../models');

const getAll = () => Sale.findAll();

const getById = (id) => Sale.findByPk(id);

module.exports = {
  getAll,
  getById,
};
