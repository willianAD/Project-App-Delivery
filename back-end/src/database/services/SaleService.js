const { Sale, Product } = require('../models');

const getDetailsById = (saleId) => Sale.findAll({
  where: { id: saleId },
  include: [
    { model: Product, as: 'products' },
  ],
});

const getAll = () => Sale.findAll();

const getAllById = (id) => Sale.findAll({ where: { sellerId: id } });

const create = (sale) => Sale.create(
  { 
    userId: sale.userId,
    sellerId: sale.sellerId,
    totalPrice: sale.totalPrice,
    deliveryAddress: sale.deliveryAddress,
    deliveryNumber: sale.deliveryNumber,
    saleDate: (new Date()),
    status: sale.status,
  },
);

module.exports = {
  getAll,
  getAllById,
  create,
  getDetailsById,
};
