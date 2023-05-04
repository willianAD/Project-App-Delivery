const express = require('express');
const { product } = require('../controller');
const { validateInputs } = require('../middlewares/productValidate');

const productRoutes = express();

productRoutes.get('/:id', product.getById);

productRoutes.get('/', product.getAll);

productRoutes.post('/', validateInputs, product.create);

productRoutes.delete('/:id', product.remove);

module.exports = {
  productRoutes
};
