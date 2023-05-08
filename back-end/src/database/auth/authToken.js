const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'secret';

 const generateToken = (payload) => jwt.sign({ payload }, secret, {
  algorithm: 'HS256',
  expiresIn: '7d',
});

 const verifyToken = (token) => jwt.verify(token, secret);

 module.exports = {
  generateToken,
  verifyToken,
 };
