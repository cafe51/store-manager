const { productModel } = require('../models');
const errorMap = require('../utils/errorMap');

const getAllProducts = async () => {
  // try {
  //   const result = await productModel.getAllProducts();
  //   return { type: null, message: result };
  // } catch (error) {
  //   return { type: 'Erro no product.service', message: error.message };
  // }

  const result = await productModel.queryAllProducts();
  // return { type: null, message: result };
  return result;
};

const getProductById = async (id) => {
  const result = await productModel.queryProductById(id);
    if (result.length === 0) {
    return { type: errorMap.mapError('PRODUCT_NOT_FOUND'), message: 'Product not found' };
  }
  return { type: null, message: result[0] };
};

module.exports = {
  getAllProducts,
  getProductById,
};