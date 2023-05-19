const express = require('express');
const { sale } = require('../controller');

const saleRoutes = express();

saleRoutes.get('/orders/:id', sale.getAllById);

saleRoutes.get('/orders', sale.getAll);

saleRoutes.post('/orders', sale.create);

saleRoutes.get('/:id', sale.getDetailsById);

saleRoutes.put('/:id', sale.putDetails);

module.exports = {
  saleRoutes,
};
