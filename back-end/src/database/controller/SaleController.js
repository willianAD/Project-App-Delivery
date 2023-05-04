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

module.exports = {
  getAll,
  getById,
};
