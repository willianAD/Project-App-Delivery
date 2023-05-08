const { Sale } = require('../models');

const getAll = () => Sale.findAll();

const getAllById = (id) => Sale.findAll({ where: { sellerId: id }});

const create = (sale) => Sale.create(
  { 
    userId: sale.userId,
    sellerId: sale.sellerId,
    totalPrice: sale.totalPrice,
    deliveryAddress: sale.deliveryAddress,
    deliveryNumber: sale.deliveryNumber,
    saleDate: (new Date().toLocaleString('pt-BR')).toString(),
    status: sale.status,
  },
);

module.exports = {
  getAll,
  getAllById,
  create,
};
