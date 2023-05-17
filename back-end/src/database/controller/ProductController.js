const { productService } = require('../services');

const getAll = async (_req, res) => {
  const allProducts = await productService.getAll();

  return res.status(200).json(allProducts);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const productId = await productService.getById(id);

  if (!productId) return res.status(400).json({ message: 'ID does not exist!' });

  return res.status(200).json(productId);
};

const create = async (req, res) => {
  const { name, price, urlImage } = req.body;

  const newProduct = await productService.create({ name, price, urlImage });

  return res.status(201).json(newProduct);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, price, urlImage } = req.body;

  const productId = await productService.getById(id);

  if (!productId) return res.status(400).json({ message: 'Product does not exist!' });

  const updateProduct = await productService.update({ id, name, price, urlImage });

  if (+updateProduct === 0) return res.status(400).json({ message: 'Product cannot be changed!' });

  return res.status(200).json({ id, name, price, urlImage });
};

const remove = async (req, res) => {
  const { id } = req.params;
  const productId = await productService.remove(id);

  if (!productId) return res.status(400).json({ message: 'Product does not exist!' });

  return res.status(200).json({ message: 'Product deleted successfully!' });
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
