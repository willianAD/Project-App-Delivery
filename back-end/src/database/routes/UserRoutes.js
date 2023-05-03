const express = require('express');
const { user } = require('../controller');

const userRoutes = express();

userRoutes.get('/', user.getAll);

module.exports = {
  userRoutes
};
