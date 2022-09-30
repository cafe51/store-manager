const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const { productModel } = require('../../../src/models/');

const productsMock = require('../../mocks/products.model.mocks');

// queryAllProducts
// queryProductById

describe('testando o SELECT do model', function () {
  afterEach(function () {
    sinon.restore();
  });
  // console.log(productsMock);
  it('retorna todos produtos', async function () {
    sinon.stub(connection, 'execute').resolves([productsMock]);
    const result = await productModel.queryAllProducts();
    // console.log('RESULTADO DO TESTE', result);
    expect(result).to.equal(productsMock);
  });

  it('retorna produto por id', async function () {
    sinon.stub(connection, 'execute').resolves([productsMock[0]]);
    const result = await productModel.queryProductById(1);
    console.log('resultado queryProductById(1)', result);
    expect(result).to.be.deep.equal(productsMock[0]);

  });

});