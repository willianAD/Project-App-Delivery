const { saleService } = require('../services');

const getDetailsById = async (req, res) => {
  const { id } = req.params;
  const salesDetails = await saleService.getDetailsById(id);
  return res.status(200).json(salesDetails);
};

const putDetails = async (req, res) => {
  const { id } = req.params;
  const updatedBody = req.body;
  const salesDetails = await saleService.putDetails({ id, ...updatedBody });
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

  if (sale.status !== 'Pendente' && sale.status !== 'Entregue' && sale.status !== 'Preparando'
  && sale.status !== 'Em Trânsito') return res.status(422).json({ message: 'Status is not valid' });

  const saleCreated = await saleService.create(sale);

  return res.status(201).json(saleCreated);
};

module.exports = {
  getAll,
  getAllById,
  create,
  getDetailsById,
  putDetails,
};
