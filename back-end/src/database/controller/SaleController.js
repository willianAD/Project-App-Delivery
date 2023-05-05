const { saleService } = require('../services');

const getDetailsById = async (req, res) => {
  const { id } = req.params;
  const salesDetails = await saleService.getDetailsById(id);
  return res.status(200).json(salesDetails);
};

module.exports = {
  getDetailsById,
};
