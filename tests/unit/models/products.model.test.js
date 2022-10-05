const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const { productModel } = require('../../../src/models');

const { productsMock, newProductListMock } = require('../../mocks/products.model.mocks');

describe('testando o SELECT do model', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('retorna todos produtos', async function () {
    sinon.stub(connection, 'execute').resolves([productsMock]);

    const result = await productModel.queryAllProducts();
    
    expect(result).to.equal(productsMock);
  });

  it('retorna produto por id', async function () {
    sinon.stub(connection, 'execute').resolves([productsMock[0]]);

    const result = await productModel.queryProductById(1);

    expect(result).to.be.deep.equal(productsMock[0]);

  });

});


describe('testando o INSERT do model', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('insere um produto', async function () {
    sinon.stub(connection, 'execute').resolves([{ insert: 42 }]);

    const objeto = { name: 'teste' };
    const result = await productModel.insertProductModel(objeto);

    expect(result).to.equal(42);
  });
});

