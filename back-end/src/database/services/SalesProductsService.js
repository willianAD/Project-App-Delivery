const { Sale, Product } = require('../models');

const getAllById = (saleId) => Sale.findAll({
  where: { id: saleId },
  include: [
    { model: Product, as: 'products' },
  ],
});

module.exports = {
  getAllById,
};
