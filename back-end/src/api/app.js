const express = require('express');
const cors = require('cors');
const { userRoutes, productRoutes, saleRoutes, saleProductRouter } = require('../database/routes');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

app.get('/coffee', (_req, res) => res.status(418).end());

app.use('/user', userRoutes);

app.use('/product', productRoutes);

app.use('/seller/orders', saleRoutes);

app.use('/seller', saleRoutes);

app.use('/sale', saleProductRouter);

module.exports = app;
