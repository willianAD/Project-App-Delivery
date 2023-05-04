const { SalesProduct } = require('../models');

const getAllById = (saleId) => SalesProduct.findAll({ where: { saleId }});

module.exports = {
  getAllById,
};