const express = require('express');
const { user } = require('../controller');
const { validadeLogin } = require('../middleware/validateLogin');

const userRoutes = express();

userRoutes.get('/', user.getAll);
userRoutes.post('/', validadeLogin, user.findOneLogin);

module.exports = {
  userRoutes,
};
