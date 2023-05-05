const express = require('express');
const { sale } = require('../controller');

const saleRoutes = express();

saleRoutes.get('/:id', sale.getDetailsById);

module.exports = {
  saleRoutes,
}