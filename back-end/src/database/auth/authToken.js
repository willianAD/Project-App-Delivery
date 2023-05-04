import * as jwt from 'jsonwebtoken';
import { ILogin } from '../intefaces/ILogin';

const secret = process.env.JWT_SECRET || 'secret';

export const generateToken = (payload: ILogin) => jwt.sign({ payload }, secret, {
  algorithm: 'HS256',
  expiresIn: '7d',
});

export const verifyToken = (token: string) => jwt.verify(token, secret);
