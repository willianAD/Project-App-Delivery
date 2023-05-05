const express = require('express');
const { user } = require('../controller');
const { validateLogin } = require('../middleware/validateLogin');

const userRoutes = express();

userRoutes.get('/', user.getAll);
userRoutes.post('/', validateLogin, user.login);

module.exports = {
  userRoutes,
};
