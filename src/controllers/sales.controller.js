const { salesService } = require('../services');

const getAllSalesController = async (req, res) => {
  const result = await salesService.getAllSalesService();
  // if (type) return res.status(500).json({ message });
  return res.status(200).json(result);
};

// const showProductById = async (req, res) => {
//   const { type, message } = await productService.getProductById(req.params.id);
//   if (type) return res.status(type).json({ message });
//   return res.status(200).json(message);
// };

const insertSalesController = async (req, res) => {
  const array = req.body;
  // const { type, message } = await salesService.insertSalesService(obj);
  const { type, message } = await salesService.insertSalesService(array);
  if (type) return res.status(type).json({ message });
  // const allProducts = await productService.getAllProducts();
  // const result = allProducts[allProducts.length - 1];
  return res.status(201).json(message);
};

module.exports = {
  insertSalesController,
  getAllSalesController,
};