// const { forEach } = require('p-iteration');
const errorMap = require('../utils/errorMap');
// const { productService } = require('.');

const validateInputProduct = (obj) => {
  const errorMessage = '"name" is required';
  const errorLenght = '"name" length must be at least 5 characters long';
  const { name } = obj;
  if (!name) return { type: errorMap.mapError('BAD_REQUEST'), message: errorMessage };
  if (name.length < 5) return { type: errorMap.mapError('INVALID_DATA'), message: errorLenght };
  return { type: null, message: 'ok' };
};

const verifyMissingProperties = (arrayOfProducts) => {
  for (let i = 0; i < arrayOfProducts.length; i += 1) {
    const missingProductId = '"productId" is required';
    const missingQuantity = '"quantity" is required';
    const { productId, quantity } = arrayOfProducts[i];
    if (!productId) return { type: errorMap.mapError('BAD_REQUEST'), message: missingProductId };
    if (quantity === undefined) {
      return { type: errorMap.mapError('BAD_REQUEST'), message: missingQuantity };
    } 
  }
  return 'ok';
};

const verifyWrongQuantity = (arrayOfProducts) => {
  for (let i = 0; i < arrayOfProducts.length; i += 1) {
    const wrongQuantity = '"quantity" must be greater than or equal to 1';
    const { quantity } = arrayOfProducts[i];
    if (quantity < 1) return { type: errorMap.mapError('INVALID_DATA'), message: wrongQuantity };
  }
  return 'ok';
};
const verifyProductExists = (insertedProducts, allProducts) => {
  const verify = insertedProducts
    .every((product) => allProducts.some((item) => product.productId === item.id));
  if (verify === false) {
    return { type: errorMap.mapError('PRODUCT_NOT_FOUND'), message: 'Product not found' };
  }
  return 'ok';
};

const validateInputSale = (arrayOfProducts, allProducts) => {
  const missingPropertie = verifyMissingProperties(arrayOfProducts);
  if (missingPropertie.type) return missingPropertie;
  const wrongQuantity = verifyWrongQuantity(arrayOfProducts);
  if (wrongQuantity.type) return wrongQuantity;
  const doProductExist = verifyProductExists(arrayOfProducts, allProducts);
  if (doProductExist.type) return doProductExist;
  return { type: null, message: 'ok' };
};

module.exports = {
  validateInputProduct,
  validateInputSale,
};
