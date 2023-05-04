const express = require('express');
const { product } = require('../controller');

const productRoutes = express();

productRoutes.get('/:id', product.getById);

productRoutes.get('/', product.getAll);

productRoutes.post('/', product.create);

module.exports = {
  productRoutes,
};
