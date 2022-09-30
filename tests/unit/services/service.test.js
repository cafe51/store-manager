const { expect } = require('chai');
const sinon = require('sinon');

const { productModel } = require('../../../src/models/');
const { productService } = require('../../../src/services/');

const productsMock = require('../../mocks/products.model.mocks');


// queryAllProducts
// queryProductById

// getAllProducts
// getProductById


// const getAllProducts = async () => {
//   const result = await productModel.queryAllProducts();
//   return result;
// };

// const getProductById = async (id) => {
//   const result = await productModel.queryProductById(id);
//   if (result.length === 0) {
//     return { type: errorMap.mapError('PRODUCT_NOT_FOUND'), message: 'Product not found' };
//   }
//   return { type: null, message: result[0] };
// };


describe('testando a camada service', function () {
  afterEach(function () {
    sinon.restore();
  });
  // console.log(productsMock);
  it('retorna todos produtos', async function () {
    sinon.stub(productModel, 'queryAllProducts').resolves(productsMock);
    const result = await productService.getAllProducts();
    expect(result).to.equal(productsMock);
  });

  it('retorna produto por id', async function () {
    sinon.stub(productModel, 'queryProductById').resolves([productsMock[0]]);
    const result = await productService.getProductById(1);
    expect(result.type).to.be.equal(null);
    expect(result.message).to.be.deep.equal(productsMock[0]);

  });

  it('retorna erro caso id não exista', async function () {
    sinon.stub(productModel, 'queryProductById').resolves([]);
    const result = await productService.getProductById(1);
    expect(result.type).to.be.equal(404);
    expect(result.message).to.be.equal('Product not found');
  });

});