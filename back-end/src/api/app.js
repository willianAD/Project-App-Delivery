const express = require('express');
const cors = require('cors');
const { userRoutes, productRoutes, saleRoutes } = require('../database/routes');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/coffee', (_req, res) => res.status(418).end());

app.use('/user', userRoutes);

app.use('/product', productRoutes);

app.use('/seller/orders/details', saleRoutes);

app.use('/seller', saleRoutes);

module.exports = app;
