const { saleService } = require('../services');

const getAll = async (_req, res) => {
  const allSales = await saleService.getAll();

  return res.status(200).json(allSales);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const saleId = await saleService.getById(id);

  return res.status(200).json(saleId);
};

const create = async (req, res) => {
  const sale = req.body;

  const saleCreated = await saleService.create(sale);
  console.log(new Date().toLocaleString('pt-BR'));

  return res.status(201).json(saleCreated);
};

module.exports = {
  getAll,
  getById,
  create,
};
