const { forEach } = require('p-iteration');
const { productModel, salesModel } = require('../models');
const errorMap = require('../utils/errorMap');
const { validateInputSale } = require('./validations.sales');

const getAllSalesService = async () => {
  const result = await salesModel.queryAllSalesModel();
  // return { type: null, message: result };
  return result;
};

const queryAllSalesWithProductsService = async () => {
  const result = await salesModel.queryAllSalesWithProductsModel();
  return result;
};

const getSalesByIdService = async (id) => {
  const result = await salesModel.queryAllSalesWithProductsModel();

  const product = result.filter((item) => item.saleId === Number(id));
  
  if (product.length === 0) {
    return { type: errorMap.mapError('PRODUCT_NOT_FOUND'), message: 'Sale not found' };
  }

  const productClone = JSON.parse(JSON.stringify(product));

  const productResponse = productClone.map((item) => {
    const { date, productId, quantity } = item;
    return { date, productId, quantity };
  });

  return { type: null, message: productResponse };
};

const newArrayOfProducts = (arrayOfProducts, totalSales) => {
  const newArray = arrayOfProducts.map((product) => {
    const newProduct = product;
    newProduct.salesId = totalSales[totalSales.length - 1].id + 1;
    return product;
  });
  return newArray;
};

const insertSalesService = async (arrayOfProducts) => {
  const allProducts = await productModel.queryAllProducts();
  const { type, message } = validateInputSale(arrayOfProducts, allProducts);
  if (type) return { type, message };

  const reqCopy = JSON.parse(JSON.stringify(arrayOfProducts)); // deep copy do array pra retornar pro controller

  const allSales = await salesModel.queryAllSalesModel();
  const productsWithSalesId = newArrayOfProducts(arrayOfProducts, allSales); // novo array com salesId

  await salesModel.insertDate(); // insere a data da venda na tabela de vendas

  await (async function insertLoop() {
    await forEach(productsWithSalesId, async (product) => {
      const { salesId, productId, quantity } = product;

      await salesModel.insertSales(salesId, productId, quantity);
    });
  }());

  const resolve = {
    id: allSales[allSales.length - 1].id + 1,
    itemsSold: reqCopy,
  };

  return { type, message: resolve };
};

const deleteSalesService = async (id) => {
  const result = await getSalesByIdService(id);
  if (result.type) {
    return { type: errorMap.mapError('PRODUCT_NOT_FOUND'), message: 'Sale not found' };
  }
  await salesModel.deleteSalesModel(id);
  return { type: null, message: '' };
};

module.exports = {
  insertSalesService,
  getAllSalesService,
  queryAllSalesWithProductsService,
  getSalesByIdService,
  deleteSalesService,
};
