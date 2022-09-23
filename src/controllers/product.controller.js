const { productService } = require('../services');

const showAllProducts = async (req, res) => {
  // try {
  //   const { type, message } = await productService.getAllProducts();
  //   if (type) {
  //     return res.status(500).json({ message });
  //   }
  //   return res.status(200).json(message);
  // } catch (error) {
  //   return res.status(500).json({ type: 'resultado no product.controler', message: error.message });
  // }

  const result = await productService.getAllProducts();
  // if (type) return res.status(500).json({ message });
  return res.status(200).json(result);
};

const showProductById = async (req, res) => {
  const { type, message } = await productService.getProductById(req.params.id);
  if (type) return res.status(type).json({ message });
  return res.status(200).json(message);
};

module.exports = {
  showAllProducts,
  showProductById,
};