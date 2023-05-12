const jwt = require('jsonwebtoken');
const fs = require('fs').promises;
const path = require('path');
// const key = require('../../../jwt.evaluation.key');

const caminhoArquivo = path.resolve(__dirname, '..', '..', '..', 'jwt.evaluation.key');

const data = async () => { 
  const result = await fs.readFile(caminhoArquivo, 'utf8');
  console.log(result);
  return result;
};

// const secret = process.env.JWT_SECRET || 'secret';

 const generateToken = async (payload) => jwt.sign({ payload }, await data(), {
  algorithm: 'HS256',
  expiresIn: '7d',
});

 const verifyToken = async (token) => jwt.verify(token, await data());

 module.exports = {
  generateToken,
  verifyToken,
 };
