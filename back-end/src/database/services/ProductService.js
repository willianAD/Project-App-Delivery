const { Product } = require('../models');

const getAll = () => Product.findAll();

const getById = (id) => Product.findByPk(id);

const create = ({ name, price, urlImage }) => Product.create({ name, price, urlImage });

const update = ({ id, name, price, urlImage }) => Product.update(
  { name, price, urlImage },
  { where: { id } },
);

const remove = (id) => Product.destroy({ where: { id } });

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
