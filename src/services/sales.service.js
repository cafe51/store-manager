const { productModel, salesModel } = require('../models');
// const { salesModel } = require('../models');
// const errorMap = require('../utils/errorMap');
const { validateInputSale } = require('./validations');

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
  const allSales = await salesModel.queryAllSalesModel();
  const allProducts = await productModel.queryAllProducts();
  const { type, message } = validateInputSale(arrayOfProducts, allProducts);
  if (type) return { type, message };
  const [reqCopy] = await salesModel.insertSalesModel(arrayOfProducts);
  // const allProducts = await salesModel.queryAllProducts();
  // const lastProduct = allProducts[allProducts.length - 1];
  const resolve = {
    id: allSales[allSales.length - 1].id + 1,
    itemsSold: reqCopy,
  };

  return { type, message: resolve };
};

module.exports = {
  insertSalesService,
  getAllSalesService,
};
