const express = require('express');
const { user } = require('../controller');
const { validateLogin } = require('../middleware/validateLogin');
const { validateRegister } = require('../middleware/validateRegister');
const validateToken = require('../middlewares/validateToken');

const userRoutes = express();

userRoutes.get('/', user.getAll);

userRoutes.get('/:id', user.getById);

userRoutes.post('/email', user.getUser);

userRoutes.post('/login', validateLogin, user.login);

userRoutes.post('/', validateRegister, user.create);

userRoutes.post('/admin', validateToken, validateRegister, user.create);

userRoutes.delete('/:id', validateToken, user.deleteUser);

module.exports = {
  userRoutes,
};