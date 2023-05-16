const { Sale, Product, User } = require('../models');

const getDetailsById = (saleId) => Sale.findOne({
  where: { id: saleId },
  include: [
    { model: Product, as: 'products' },
    { model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: User, as: 'seller', attributes: { exclude: ['password'] } },
  ],
  attributes: { exclude: ['userId', 'sellerId'] },
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
    status: sale.status,
  },
);

const putDetails = ({
  id, userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, status,
}) => Sale.update(
  { userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, status },
  { where: { id } },
);

module.exports = {
  getAll,
  getAllById,
  create,
  getDetailsById,
  putDetails,
};
