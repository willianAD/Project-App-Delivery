const express = require('express');
const { user } = require('../controller');
const { validateLogin } = require('../middleware/validateLogin');
const { validateRegister } = require('../middleware/validateRegister');
const validateToken = require('../middlewares/validateToken');

const userRoutes = express();

userRoutes.get('/', user.getAll);

userRoutes.post('/email', user.getUser);

userRoutes.post('/login', validateLogin, user.login);

userRoutes.post('/', validateRegister, user.create);

userRoutes.post('/admin', validateToken, validateRegister, user.create);

module.exports = {
  userRoutes,
};
