const { salesModel } = require('../models');
// const errorMap = require('../utils/errorMap');
// const { validateInputProduct } = require('./validations');

const getAllSalesService = async () => {
  const result = await salesModel.queryAllSalesModel();
  // return { type: null, message: result };
  return result;
};

// const getProductById = async (id) => {
//   const result = await productModel.queryProductById(id);
//   if (result.length === 0) {
//     return { type: errorMap.mapError('PRODUCT_NOT_FOUND'), message: 'Product not found' };
//   }
//   return { type: null, message: result[0] };
// };

const insertSalesService = async (arrayOfProducts) => {
  // const { type, message } = validateInputProduct(obj);
  // if (type) return { type, message };
  await salesModel.insertSalesModel(arrayOfProducts);
  // const allProducts = await salesModel.queryAllProducts();
  // const lastProduct = allProducts[allProducts.length - 1];
  // return { type, message: lastProduct };
};

module.exports = {
  insertSalesService,
  getAllSalesService,
};