const express = require('express');
const { product } = require('../controller');
const { validateInputs } = require('../middlewares/productValidateInputs');

const productRoutes = express();

productRoutes.get('/:id', product.getById);

productRoutes.get('/', product.getAll);

productRoutes.post('/', validateInputs, product.create);

productRoutes.put('/:id', product.update);

productRoutes.delete('/:id', product.remove);

module.exports = {
  productRoutes
};
