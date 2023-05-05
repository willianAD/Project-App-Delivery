const { Sale, Product } = require('../models');

const getDetailsById = (saleId) => Sale.findAll({
  where: { id: saleId },
  include: [
    { model: Product, as: 'products' },
  ],
});

module.exports = {
  getDetailsById,
};
