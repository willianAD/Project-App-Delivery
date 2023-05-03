const { productService } = require('../services');

const getAll = async (_req, res) => {
  const allProducts = await productService.getAll();

  return res.status(200).json(allProducts);
};

module.exports = user = {
  getAll,
};
