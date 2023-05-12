const express = require('express');
const { sale } = require('../controller');

const saleRoutes = express();

saleRoutes.get('/orders/:id', sale.getAllById);

saleRoutes.get('/orders', sale.getAll);

saleRoutes.post('/orders', sale.create);

saleRoutes.get('/details', sale.getDetailsById);

module.exports = {
  saleRoutes,
};
