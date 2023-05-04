const express = require('express');
const { userRoutes, productRoutes, salesProductsRoutes } = require('../database/routes');

const app = express();

app.use(express.json());

app.get('/coffee', (_req, res) => res.status(418).end());

app.use('/user', userRoutes);

app.use('/product', productRoutes);

app.use('/seller/orders/details', salesProductsRoutes);

module.exports = app;
