const { salesProductsService } = require('../services');

const getAllById = async (req, res) => {
  const { id } = req.params;
  const salesDetails = await salesProductsService.getAllById(id);
  return res.status(200).json(salesDetails);
};

module.exports = {
  getAllById,
};
