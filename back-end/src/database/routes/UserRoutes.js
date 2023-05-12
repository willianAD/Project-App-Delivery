const express = require('express');
const { user } = require('../controller');
const { validateLogin } = require('../middleware/validateLogin');
const { validateRegister } = require('../middleware/validateRegister');

const userRoutes = express();

userRoutes.get('/', user.getAll);

userRoutes.post('/email', user.getUser);

userRoutes.post('/login', validateLogin, user.login);

userRoutes.post('/', validateRegister, user.create);

module.exports = {
  userRoutes,
};