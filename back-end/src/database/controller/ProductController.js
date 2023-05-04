const { productService } = require('../services');

const getAll = async (_req, res) => {
  const allProducts = await productService.getAll();

  return res.status(200).json(allProducts);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const productId = await productService.getById(id);

  if (!productId) return res.status(400).json({ message: 'ID does not exist' });

  return res.status(200).json(productId);
};

const create = async (req, res) => {
  const { name, price, urlImage } = req.body;

  const newProduct = await productService.create({name, price, urlImage});

  return res.status(201).json(newProduct);
};

const update = async (req, res) => {
  const { id } = req.params
  const { name, price, urlImage } = req.body;

  const newProduct = await productService.create({ id, name, price, urlImage});

  return res.status(200).json(newProduct);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const productId = await productService.remove(id);

  if (!productId) return res.status(400).json({ message: 'Product does not exist' });

  return res.status(200).json({ message: 'Product deleted successfully!' });
};

module.exports = user = {
  getAll,
  getById,
  create,
  remove,
};
