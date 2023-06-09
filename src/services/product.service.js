const { productModel } = require('../models');
const errorMap = require('../utils/errorMap');
const { validateInputProduct } = require('./validations.product');

const getAllProducts = async () => {
  const result = await productModel.queryAllProducts();
  return result;
};

const getProductById = async (id) => {
  // const result = await productModel.queryProductById(id);
  const result = await productModel.queryAllProducts();
  const product = result.find((item) => item.id === Number(id));
  if (!product) {
    return { type: errorMap.mapError('PRODUCT_NOT_FOUND'), message: 'Product not found' };
  }
  return { type: null, message: product };
};

// const listaDeObjetosComId = [
//   { id: 1, name: 'teste1' },
//   { id: 2, name: 'teste2' },
//   { id: 3, name: 'teste3' },
//   { id: 4, name: 'teste4' },
// ];

// const product = listaDeObjetosComId.find((item) => item.id === Number(7));

// console.log(product);

const insertProductService = async (obj) => {
  const { type, message } = validateInputProduct(obj);
  if (type) return { type, message };
  await productModel.insertProductModel(obj);
  const allProducts = await productModel.queryAllProducts();
  const lastProduct = allProducts[allProducts.length - 1];
  return { type, message: lastProduct };
};

const updateProductService = async (id, obj) => {
  const objClone = JSON.parse(JSON.stringify(obj));
  objClone.id = id;
  const { type: type2, message: message2 } = await getProductById(id);
  if (type2) return { type: type2, message: message2 };

  const { type, message } = validateInputProduct(obj);
  if (type) return { type, message };
  
  await productModel.updateProductModel(id, obj);
  return { type, message: objClone };
};

const deleteProductService = async (id) => {
  const { type, message } = await getProductById(id);
  if (type) return { type, message };
  await productModel.deleteProductModel(id);
  return { type, message: { id } };
};

module.exports = {
  getAllProducts,
  getProductById,
  insertProductService,
  updateProductService,
  deleteProductService,
};