const express = require('express');
const { userRoutes, productRoutes } = require('../database/routes');

const app = express();

app.get('/coffee', (_req, res) => res.status(418).end());

app.use('/user', userRoutes);

app.use('/product', productRoutes);

module.exports = app;
