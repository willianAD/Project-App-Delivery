const { SalesProduct } = require('../models');

const create = (sale) => SalesProduct.create(
  { 
    saleId: sale.id,
    productId: sale.productId,
    quantity: sale.quantity,
  },
);

module.exports = {
  create,
};