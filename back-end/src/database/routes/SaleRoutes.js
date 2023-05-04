const express = require('express');
const { sale } = require('../controller');

const saleRoutes = express();

saleRoutes.get('/orders/:id', sale.getById);

saleRoutes.get('/orders', sale.getAll);

module.exports = {
  saleRoutes,
};
