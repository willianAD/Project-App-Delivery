const { Product } = require('../models');

const getAll = () => Product.findAll();

const create = ({name, price, urlImage}) => Product.create({name, price, urlImage});

const getById = (id) => Product.findByPk(id);

module.exports = {
  getAll,
  create,
  getById,
};
