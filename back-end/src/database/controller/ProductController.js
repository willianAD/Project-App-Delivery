// const jwt = require('jsonwebtoken');
const { productService } = require('../services');

const getAll = async (_req, res) => {
  const allProducts = await productService.getAll();

  return res.status(200).json(allProducts);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const productId = await productService.getById(id);

  return res.status(200).json(productId);
};

const create = async (req, res) => {
  const { name, price, urlImage } = req.body;
  // const token = req.header('Authorization');

  // const secret = process.env.JWT_SECRET || 'segredo';
  // const { data } = jwt.verify(token, secret);

  const newProduct = await productService.create({name, price, urlImage});

  return res.status(200).json(newProduct);
};

module.exports = {
  getAll,
  getById,
  create,
};
