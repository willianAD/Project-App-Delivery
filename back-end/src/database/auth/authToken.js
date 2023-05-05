import * as jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'secret';

export const generateToken = (payload) => jwt.sign({ payload }, secret, {
  algorithm: 'HS256',
  expiresIn: '7d',
});

export const verifyToken = (token) => jwt.verify(token, secret);
