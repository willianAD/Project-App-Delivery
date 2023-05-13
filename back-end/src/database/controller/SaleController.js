const { saleService } = require('../services');

const getDetailsById = async (req, res) => {
  const { id } = req.params;
  const salesDetails = await saleService.getDetailsById(id);
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

  const date = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
  const splitedDate = date.split(/\D/);
  const isoDate = `${splitedDate[2]}-${splitedDate[1]}-
  ${splitedDate[0]} ${splitedDate[3]}:${splitedDate[4]}:${splitedDate[5]}`;

  const saleCreated = await saleService.create(sale, isoDate);

  return res.status(201).json(saleCreated);
};

module.exports = {
  getAll,
  getAllById,
  create,
  getDetailsById,
};
