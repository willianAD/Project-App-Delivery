const { verifyToken } = require('../auth/authToken');
const { saleService } = require('../services');

const getDetailsById = async (req, res) => {
  const token = req.header('Authorization');
  const { payload: { email }} = verifyToken(token);
  const salesDetails = await saleService.getDetailsById(email);
  return res.status(200).json(salesDetails);
};

const getAll = async (_req, res) => {
  const allSales = await saleService.getAll();

  return res.status(200).json(allSales);
};

const getAllById = async (req, res) => {
  const { id } = req.params;
  const allSales = await saleService.getAllById(id);

  return res.status(200).json(allSales);
};

const create = async (req, res) => {
  const sale = req.body;

  const saleCreated = await saleService.create(sale);
  console.log(new Date().toLocaleString('pt-BR'));

  return res.status(201).json(saleCreated);
};

module.exports = {
  getAll,
  getAllById,
  create,
  getDetailsById,
};
