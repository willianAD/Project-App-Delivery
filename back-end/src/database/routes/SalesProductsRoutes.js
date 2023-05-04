const express = require('express');
const { salesProducts } = require('../controller');

const salesProductsRoutes = express();

salesProductsRoutes.get('/:id', salesProducts.getAllById);

module.exports = {
  salesProductsRoutes,
}