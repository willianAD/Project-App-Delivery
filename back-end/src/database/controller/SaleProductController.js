const { saleProductService } = require('../services');

const create = async (req, res) => {
  const { id, products } = req.body;

  const test = products.map((product) => (
    saleProductService.create({ id, productId: product.id, quantity: product.quantity })
  ));

  Promise.all(test);

  return res.status(201).json();
};

module.exports = {
  create,
};
