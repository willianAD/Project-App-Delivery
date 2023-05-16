const express = require('express');
const { saleProduct } = require('../controller');

const saleProductRouter = express();

saleProductRouter.post('/', saleProduct.create);

module.exports = {
  saleProductRouter,
};