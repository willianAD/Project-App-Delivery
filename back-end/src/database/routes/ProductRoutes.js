const express = require('express');
const { product } = require('../controller');

const productRoutes = express();

productRoutes.get('/', product.getAll);

module.exports = {
  productRoutes
};
