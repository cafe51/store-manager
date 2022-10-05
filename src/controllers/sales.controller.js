const { salesService } = require('../services');

const getAllSalesController = async (req, res) => {
  const result = await salesService.getAllSalesService();
  // if (type) return res.status(500).json({ message });
  return res.status(200).json(result);
};

const queryAllSalesWithProductsController = async (req, res) => {
  const result = await salesService.queryAllSalesWithProductsService();
  return res.status(200).json(result);
};

const getSalesByIdController = async (req, res) => {
  const { type, message } = await salesService.getSalesByIdService(req.params.id);
  if (type) return res.status(type).json({ message });
  return res.status(200).json(message);
};

const insertSalesController = async (req, res) => {
  const array = req.body;
  const { type, message } = await salesService.insertSalesService(array);

  if (type) return res.status(type).json({ message });
  return res.status(201).json(message);
};

const deleteSalesController = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.deleteSalesService(id);
  if (type) return res.status(type).json({ message });
  return res.status(204).json('');
};

module.exports = {
  insertSalesController,
  getAllSalesController,
  queryAllSalesWithProductsController,
  getSalesByIdController,
  deleteSalesController,
};