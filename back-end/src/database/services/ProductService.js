const { Product } = require('../models');

const getAll = () => Product.findAll();

const create = (product) => Product.create(product);

const getById = (id) => Product.findByPk(id);

module.exports = {
  getAll,
  create,
  getById,
};
