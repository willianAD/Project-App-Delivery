const { Sale, Product, User } = require('../models');

const getDetailsById = async (email) => {
  const { dataValues: { id } } = await User.findOne({ where: { email } });
  const details = await Sale.findAll({
    where: { sellerId: id },
    include: [
      { model: Product, as: 'products' },
    ],
  });
  return details;
};

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
  getDetailsById,
};
